// Script de funcionamento dos cards dos clientes
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".cliente-retangulo");

  // Expansão individual
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const isOpen = card.classList.contains("expanded");
      cards.forEach((c) => c.classList.remove("expanded"));
      if (!isOpen) card.classList.add("expanded");
    });
  });
});

// Animação fade-slide-up da página

const fadeElements = document.querySelectorAll(".fade-slide-up");

const fadeInOnScroll = () => {
  fadeElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 50) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// Animação underline dos botões de filtro de veiculos

document.querySelectorAll(".filtro-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filtro-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
