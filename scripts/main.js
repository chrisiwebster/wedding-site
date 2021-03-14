window.addEventListener("load", async () => {
  const menuButton = await document.querySelector(".menu");
  const navMenu = await document.querySelector(".mobile-nav-links");
  const h1 = await document.querySelector("h1");

  if (menuButton) {
    //Added this if statement because the js wasn't loading because it said I was trying to add an event listener to something that didn't exist.
    menuButton.addEventListener("click", function () {
      menuButton.classList.toggle("opened");
      navMenu.classList.toggle("toggled");
      h1.classList.toggle("z-toggle"); //menu was appearing behind the heading because the heading has z-index 1.
    });
  }
});
