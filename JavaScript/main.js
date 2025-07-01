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

