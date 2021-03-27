// const nav = document.querySelector("nav");
const menuButton = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");

const handleWebsiteScript = () => {
  //Added this statement because the js wasn't loading because it said I was trying to add an event listener to something that didn't exist.
  if (menuButton) {
    menuButton.addEventListener("click", () => {
      menuButton.classList.toggle("opened");
      navLinks.classList.toggle("toggled");
    });
  }
};

window.addEventListener("load", handleWebsiteScript);
