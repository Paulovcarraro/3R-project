// script.js

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
