window.addEventListener("load", () => {
  const nav = document.querySelector("nav");
  const menuButton = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");
  const windowSize = window.screen.width;
  //Checking the width that we have set in CSS for screen sizes
  if (windowSize <= 720) {
    nav.classList.toggle("mobile-nav-wrapper");
  } else {
    nav.classList.toggle("desktop-nav-wrapper");
  }
  if (menuButton) {
    //Added this if statement because the js wasn't loading because it said I was trying to add an event listener to something that didn't exist.
    menuButton.addEventListener("click", function () {
      menuButton.classList.toggle("opened");
      navLinks.classList.toggle("toggled");
    });
  }
});
