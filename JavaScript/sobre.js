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

// Scrip de funcionamento do modal de fotos

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const caption = carousel.querySelector(".carousel-caption");
    const expandBtn = carousel.querySelector(".expand-btn");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const lightboxClose = lightbox.querySelector(".lightbox-close");
    const lightboxPrev = lightbox.querySelector(".lightbox-prev");
    const lightboxNext = lightbox.querySelector(".lightbox-next");

    let currentIndex = 0;

    function updateLightbox(index) {
      const slide = slides[index];
      const img = slide.querySelector("img");
      lightboxImg.src = img.src;
      lightboxCaption.textContent = slide.dataset.caption || "";
      currentIndex = index;
    }

    if (expandBtn) {
      expandBtn.addEventListener("click", () => {
        updateLightbox(currentIndex);
        lightbox.style.display = "flex";
      });
    }

    if (lightboxClose) {
      lightboxClose.addEventListener("click", () => {
        lightbox.style.display = "none";
      });
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateLightbox(currentIndex);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateLightbox(currentIndex);
      });
    }

    // Fechar clicando fora da imagem
    if (lightbox) {
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.style.display = "none";
      });
    }

    // Suporte a arrastar no mobile

    let startX = 0;
    let endX = 0;

    lightboxImg.addEventListener("touchstart", (e) => {
      startX = e.changedTouches[0].clientX;
    });

    lightboxImg.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const diff = endX - startX;

      if (Math.abs(diff) > 50) {
        // só considera se o movimento foi maior que 50px
        if (diff > 0) {
          // swipe para a direita → imagem anterior
          currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        } else {
          // swipe para a esquerda → próxima imagem
          currentIndex = (currentIndex + 1) % slides.length;
        }
        updateLightbox(currentIndex);
      }
    }
  });
});
