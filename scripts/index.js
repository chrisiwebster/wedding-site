const menuButton = document.querySelector(".menu");
const navMenu = document.querySelector(".mobile-nav-wrapper");
const h1 = document.querySelector("h1");
const daysCountdown = document.querySelector("#days");
const hoursCountdown = document.querySelector("#hours");
const minsCountdown = document.querySelector("#mins");
const secsCountdown = document.querySelector("#secs");
const weddingDate = new Date("July 31, 2021 14:30").getTime();

menuButton.addEventListener("click", function () {
  menuButton.classList.toggle("opened");
  navMenu.classList.toggle("toggled");
  h1.classList.toggle("z-toggle"); //menu was appearing behind the heading because the heading has zindex 1.
});

const x = setInterval(() => {
  let now = new Date().getTime();
  /*Sees how long is left*/
  let distance = weddingDate - now;
  /*Calc for days, hours, mintues*/
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysCountdown.innerHTML = days;
  hoursCountdown.innerHTML = hours;
  minsCountdown.innerHTML = minutes;
  secsCountdown.innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
  }
}, 1000);
