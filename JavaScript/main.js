// Menu Mobile
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// === Popup WhatsApp 3R ===
const btnWhatsHero = document.querySelector(".btn-whatsapp");
const popupOverlay = document.getElementById("whatsapp-popup-overlay");
const popupClose = document.getElementById("whatsapp-popup-close");
const popupSend = document.getElementById("whatsapp-popup-btn");

btnWhatsHero.addEventListener("click", function (e) {
  e.preventDefault();
  popupOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

popupClose.addEventListener("click", function () {
  popupOverlay.classList.remove("active");
  document.body.style.overflow = "";
});

popupOverlay.addEventListener("click", function (e) {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

popupSend.addEventListener("click", function () {
  const phoneNumber = "5543996048760";
  const message = encodeURIComponent(
    "Olá! Gostaria de saber mais sobre os serviços da 3R Turismo."
  );
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
  popupOverlay.classList.remove("active");
  document.body.style.overflow = "";
});

// JavaScript para gerenciamento de veículos

const veiculos = [
  {
    tipo: "onibus",
    modelo: "Ônibus Executivo Marcopolo",
    fotos: ["img/onibus1.jpg", "img/onibus1-2.jpg", "img/onibus1-3.jpg"],
    ano: "2020",
    capacidade: "46 passageiros",
    banheiro: true,
    arCondicionado: true,
    usb: true,
  },
  {
    tipo: "onibus",
    modelo: "Ônibus Turismo G7",
    fotos: ["img/onibus2.jpg", "img/onibus2-2.jpg"],
    ano: "2018",
    capacidade: "42 passageiros",
    banheiro: true,
    arCondicionado: true,
    usb: false,
  },
  {
    tipo: "van",
    modelo: "Van Sprinter Mercedes",
    fotos: ["img/van1.jpg", "img/van1-2.jpg"],
    ano: "2021",
    capacidade: "15 passageiros",
    banheiro: false,
    arCondicionado: true,
    usb: true,
  },
  {
    tipo: "van",
    modelo: "Renault Master",
    fotos: ["img/van2.jpg", "img/van2-2.jpg"],
    ano: "2019",
    capacidade: "17 passageiros",
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
  if (inicio >= filtrados.length) verMaisBtn.style.display = "none";
  else verMaisBtn.style.display = "display: block";
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

function abrirModal(veiculo) {
  modalTitle.textContent = veiculo.modelo;
  modalImg.src = veiculo.fotos[0];
  modalThumbs.innerHTML = "";
  veiculo.fotos.forEach((foto, i) => {
    const thumb = document.createElement("img");
    thumb.src = foto;
    if (i === 0) thumb.classList.add("active");
    thumb.addEventListener("click", () => {
      modalImg.src = foto;
      document
        .querySelectorAll(".modal-thumbs img")
        .forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
    modalThumbs.appendChild(thumb);
  });
  modalInfo.innerHTML = `
    <li><strong>Ano:</strong> ${veiculo.ano}</li>
    <li><strong>Capacidade:</strong> ${veiculo.capacidade}</li>
    <li><strong>Banheiro:</strong> ${veiculo.banheiro ? "Sim" : "Não"}</li>
    <li><strong>Ar-condicionado:</strong> ${
      veiculo.arCondicionado ? "Sim" : "Não"
    }</li>
    <li><strong>Carregador USB:</strong> ${veiculo.usb ? "Sim" : "Não"}</li>
  `;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

modalClose.addEventListener("click", fecharModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

function fecharModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Carregar inicialmente
carregarVeiculos();
