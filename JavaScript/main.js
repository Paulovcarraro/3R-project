// Scrip para Menu Hamburguer apenas em Mobile
const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.getElementById("menu-icon");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuToggle.classList.toggle("active");

  // Troca suave de ícone
  setTimeout(() => {
    if (menuIcon.classList.contains("fa-bars")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  }, 150); // Tempo sincronizado com o CSS (180deg)
});

// === Popup WhatsApp 3R ===
const btnWhatsHero = document.querySelector(".btn-whatsapp");
const btnWhatsRodape = document.getElementById("btn-whatsapp-rodape"); // novo botão
const popupOverlay = document.getElementById("whatsapp-popup-overlay");
const popupClose = document.getElementById("whatsapp-popup-close");
const popupSend = document.getElementById("whatsapp-popup-btn");

// Função para abrir o popup
function abrirPopupWhatsApp(e) {
  e.preventDefault();
  popupOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Eventos para abrir o popup
btnWhatsHero.addEventListener("click", abrirPopupWhatsApp);
btnWhatsRodape.addEventListener("click", abrirPopupWhatsApp);

// Fechar popup
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

// Botão "Iniciar conversa"
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
