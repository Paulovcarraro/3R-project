// Adicione fabricante nos objetos veiculos:
const veiculos = [
  {
    tipo: "onibus",
    modelo: "Ônibus Executivo G6 1050 ",
    fabricante: "Marcopolo/Scania",
    fotos: [
      "./Images/3R Logo.png",
      "./Images/3R Logo.png",
      "./Images/3R Logo.png",
    ],
    ano: "2007",
    capacidade: "46 passageiros",
    banheiro: true,
    arCondicionado: true,
    usb: true,
  },
  {
    tipo: "onibus",
    modelo: "Ônibus Executivo G6 1050 ",
    fabricante: "Marcopolo/Scania",
    fotos: [
      "./Images/3R Logo.png",
      "./Images/3R Logo.png",
      "./Images/3R Logo.png",
    ],
    ano: "2007",
    capacidade: "46 passageiros",
    banheiro: true,
    arCondicionado: true,
    usb: false,
  },

  // Vans

  {
    tipo: "van",
    modelo: "Van Master",
    fabricante: "Renault",
    fotos: [
      "./Images/3R Logo.png",
      "./Images/3R Logo.png",
      "./Images/3R Logo.png",
    ],
    ano: "2012",
    capacidade: "16 passageiros",
    banheiro: false,
    arCondicionado: true,
    usb: true,
  },
  {
    tipo: "van",
    modelo: " Van Ducato",
    fabricante: "Fiat",
    fotos: [
      "./Images/3R Logo.png",
      "./Images/3R Logo.png",
      "./Images/3R Logo.png",
    ],
    ano: "2008",
    capacidade: "15 passageiros",
    banheiro: false,
    arCondicionado: true,
    usb: true,
  },
];

const container = document.querySelector(".veiculos-container");
const filtroBotoes = document.querySelectorAll(".filtro-btn");
const verMaisBtn = document.getElementById("ver-mais");

let tipoAtual = "onibus";
let inicio = 0;
const porPagina = 3;

function criarCard(veiculo) {
  const card = document.createElement("div");
  card.className = "card-veiculo";
  card.innerHTML = `
    <img src="${veiculo.fotos[0]}" alt="${veiculo.modelo}">
    <h3>${veiculo.modelo}</h3>
    <button class="btn-saiba-mais">Saiba mais</button>
  `;
  card
    .querySelector(".btn-saiba-mais")
    .addEventListener("click", () => abrirModal(veiculo));
  return card;
}

function carregarVeiculos() {
  const filtrados = veiculos.filter((v) => v.tipo === tipoAtual);
  const fim = inicio + porPagina;
  const mostrar = filtrados.slice(inicio, fim);
  mostrar.forEach((v) => container.appendChild(criarCard(v)));
  inicio = fim;
  verMaisBtn.style.display = inicio >= filtrados.length ? "none" : "block";
}

filtroBotoes.forEach((btn) => {
  btn.addEventListener("click", () => {
    filtroBotoes.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    tipoAtual = btn.dataset.tipo;
    container.innerHTML = "";
    inicio = 0;
    carregarVeiculos();
  });
});

verMaisBtn.addEventListener("click", carregarVeiculos);

// Modal
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");
const modalImg = document.getElementById("modal-img-principal");
const modalTitle = document.getElementById("modal-title");
const modalThumbs = document.getElementById("modal-thumbs");
const modalInfo = document.getElementById("modal-info");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

let fotoAtualIndex = 0;
let fotosModal = [];

function abrirModal(veiculo) {
  modalTitle.textContent = veiculo.modelo;
  fotosModal = veiculo.fotos;
  fotoAtualIndex = 0;
  atualizarImagemModal();

  modalThumbs.innerHTML = "";
  veiculo.fotos.forEach((foto, i) => {
    const thumb = document.createElement("img");
    thumb.src = foto;
    if (i === 0) thumb.classList.add("active");
    thumb.addEventListener("click", () => {
      fotoAtualIndex = i;
      atualizarImagemModal();
    });
    modalThumbs.appendChild(thumb);
  });

  // Monta as informações, agora usando veiculo.fabricante separado do modelo
  let infoHTML = `
    <li><strong>Fabricante:</strong> ${veiculo.fabricante}</li>  <!-- fabricante acima do ano -->
    <li><strong>Ano:</strong> ${veiculo.ano}</li>
    <li><strong>Capacidade:</strong> ${veiculo.capacidade}</li>
  `;

  if (veiculo.tipo !== "van") {
    infoHTML += `<li><strong>Banheiro:</strong> ${
      veiculo.banheiro ? "Sim" : "Não"
    }</li>`;
  }

  infoHTML += `
    <li><strong>Ar-condicionado:</strong> ${
      veiculo.arCondicionado ? "Sim" : "Não"
    }</li>
    <li><strong>Carregador USB:</strong> ${veiculo.usb ? "Sim" : "Não"}</li>
  `;

  modalInfo.innerHTML = infoHTML;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function atualizarImagemModal() {
  modalImg.style.opacity = 0;
  setTimeout(() => {
    modalImg.src = fotosModal[fotoAtualIndex];
    modalImg.onload = () => {
      modalImg.style.opacity = 1;
    };

    document.querySelectorAll(".modal-thumbs img").forEach((thumb, i) => {
      thumb.classList.toggle("active", i === fotoAtualIndex);
    });
  }, 150);
}

btnPrev.addEventListener("click", () => {
  fotoAtualIndex = (fotoAtualIndex - 1 + fotosModal.length) % fotosModal.length;
  atualizarImagemModal();
});

btnNext.addEventListener("click", () => {
  fotoAtualIndex = (fotoAtualIndex + 1) % fotosModal.length;
  atualizarImagemModal();
});

modalClose.addEventListener("click", fecharModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

function fecharModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Inicial
carregarVeiculos();
