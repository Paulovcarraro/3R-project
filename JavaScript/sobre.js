// Scrip para Menu Hamburguer apenas em Mobile

const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.getElementById("menu-icon");
const nav = document.getElementById("nav-menu");
const overlay = document.getElementById("menu-overlay");

function openMenu() {
  nav.classList.add("active");
  menuToggle.classList.add("active");
  overlay.classList.add("active");

  menuIcon.classList.remove("fa-bars");
  menuIcon.classList.add("fa-times");
}

function closeMenu() {
  nav.classList.remove("active");
  menuToggle.classList.remove("active");
  overlay.classList.remove("active");

  menuIcon.classList.remove("fa-times");
  menuIcon.classList.add("fa-bars");
}

menuToggle.addEventListener("click", () => {
  if (nav.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Fecha ao clicar fora (overlay)
overlay.addEventListener("click", closeMenu);

// Animação Underline mobile das Seções do Menu Hamburguer

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    // Remove .active de todos
    document
      .querySelectorAll(".nav a")
      .forEach((l) => l.classList.remove("active"));
    // Adiciona .active no link clicado
    link.classList.add("active");
    // Não colocamos e.preventDefault() pra não bloquear a navegação
  });
});

// Script para funcionamento do carousel de imagens

document.querySelectorAll(".carousel").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector(".seta.prev");
  const nextBtn = carousel.querySelector(".seta.next");
  const caption = carousel.querySelector(".carousel-caption");
  const hint = carousel.querySelector(".carousel-hint");

  let currentIndex = 0;
  let autoPlayInterval;
  let hideArrowsTimeout;
  const autoPlayTime = 10000; // 10s
  const hideArrowsTime = 5000; // 5s

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    const currentSlide = slides[currentIndex];
    caption.textContent = currentSlide.dataset.caption || "";
  }

  function showArrows() {
    if (slides.length <= 1) return;
    prevBtn.classList.add("show");
    nextBtn.classList.add("show");
    clearTimeout(hideArrowsTimeout);
    hideArrowsTimeout = setTimeout(() => {
      prevBtn.classList.remove("show");
      nextBtn.classList.remove("show");
    }, hideArrowsTime);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAutoPlay() {
    if (slides.length <= 1) return;
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, autoPlayTime);
  }

  // Eventos desktop
  if (slides.length > 1 && prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoPlay();
      showArrows();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoPlay();
      showArrows();
    });

    carousel.addEventListener("mousemove", showArrows);
    carousel.addEventListener("mouseenter", showArrows);
  }

  // Swipe no mobile
  let startX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const moveX = e.touches[0].clientX - startX;
    if (moveX > 50) {
      prevSlide();
      startAutoPlay();
      isDragging = false;
    } else if (moveX < -50) {
      nextSlide();
      startAutoPlay();
      isDragging = false;
    }
  });

  track.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Ocultar dica de arrastar após interação ou 5s
  if (hint) {
    setTimeout(() => (hint.style.display = "none"), 5000);
    carousel.addEventListener(
      "touchstart",
      () => (hint.style.display = "none")
    );
    carousel.addEventListener("click", () => (hint.style.display = "none"));
  }

  // Inicializa
  updateCarousel();
  startAutoPlay();
});
