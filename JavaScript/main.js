

// Script de animação da seção clientes e de funcionamento dos cards

document.addEventListener("DOMContentLoaded", function () {
  const clientesSection = document.querySelector(".clientes");
  const cards = document.querySelectorAll(".cliente-retangulo");

  // Animação de entrada
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animar");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(clientesSection);

  // Expansão individual
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const isOpen = card.classList.contains("expanded");
      cards.forEach((c) => c.classList.remove("expanded"));
      if (!isOpen) card.classList.add("expanded");
    });
  });
});
