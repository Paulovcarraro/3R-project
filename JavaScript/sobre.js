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
