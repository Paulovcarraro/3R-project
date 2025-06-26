// Menu Mobile
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Carrossel
const carousel = document.querySelector(".carousel-container");
const images = document.querySelectorAll(".carousel-img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;

function showImage(i) {
  const width = images[0].clientWidth;
  carousel.style.transform = `translateX(-${i * width}px)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % images.length;
  showImage(index);
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
});

window.addEventListener("resize", () => {
  showImage(index);
});

// Ajusta carrossel ao carregar
window.addEventListener("load", () => {
  showImage(index);
});

// === Popup WhatsApp 3R ===
const btnWhatsHero = document.querySelector(".btn-whatsapp");
const popupOverlay = document.getElementById("whatsapp-popup-overlay");
const popupClose = document.getElementById("whatsapp-popup-close");
const popupSend = document.getElementById("whatsapp-popup-btn");

btnWhatsHero.addEventListener("click", function (e) {
  e.preventDefault(); // evita abrir link
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
  const phoneNumber = "5543996048760"; // troque pelo número real
  const message = encodeURIComponent(
    "Olá! Gostaria de saber mais sobre os serviços da 3R Turismo."
  );
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
  popupOverlay.classList.remove("active");
  document.body.style.overflow = "";
});
