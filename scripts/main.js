const menuButton = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("opened");
  navLinks.classList.toggle("toggled");
});
