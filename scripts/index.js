const menuButton = document.querySelector(".menu");
const navMenu = document.querySelector(".mobile-nav-links");
const h1 = document.querySelector("h1");
const daysCountdown = document.querySelector("#days");
const hoursCountdown = document.querySelector("#hours");
const minsCountdown = document.querySelector("#mins");
const secsCountdown = document.querySelector("#secs");
const weddingDate = new Date("July 31, 2021 14:30").getTime();
const weatherIcon = document.querySelector("#weather-type-icon");
const weatherText = document.querySelector("#weather-type-text");

if (menuButton) {
  //Added this if statement because the js wasn't loading because it said I was trying to add an event listener to something that didn't exist.
  menuButton.addEventListener("click", function () {
    menuButton.classList.toggle("opened");
    navMenu.classList.toggle("toggled");
    h1.classList.toggle("z-toggle"); //menu was appearing behind the heading because the heading has z-index 1.
  });
}

//Countdown clock
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

//Weather API
import key from "./_apikey.js";
window.addEventListener("load", () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=3034125&appid=${key}`
  )
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request failed!");
      },
      (networkError) => {
        console.log(networkError.message);
      }
    )
    .then((jsonResponse) => {
      console.log(jsonResponse);
      let weatherMain = jsonResponse["weather"][0]["main"];
      switch (true) {
        case weatherMain == "Rain":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/10d@2x.png">';
          weatherText.innerHTML = "raining";
          break;
        case weatherMain == "Clouds":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/03d@2x.png">';
          weatherText.innerHTML = "cloudy";
          break;
        case weatherMain == "Clear":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/01d@2x.png">';
          weatherText.innerHTML = "clear";
          break;
        case weatherMain == "Snow":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/13d@2x.png">';
          weatherText.innerHTML = "snowing";
          break;
        case weatherMain == "Mist" ||
          weatherMain == "Smoke" ||
          weatherMain == "Haze" ||
          weatherMain == "Dust" ||
          weatherMain == "Fog" ||
          weatherMain == "Sand" ||
          weatherMain == "Ash" ||
          weatherMain == "Squall" ||
          weatherMain == "Tornado":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/50d@2x.png">';
          weatherText.innerHTML = "difficult seeing conditions";
          break;
        case weatherMain == "Drizzle":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/09d@2x.png">';
          weatherText.innerHTML = "drizzling";
          break;
        case weatherMain == "Thunderstorm":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/11d@2x.png">';
          weatherText.innerHTML = "thunderstorm";
          break;
      }
    }, false);
});
//https://openweathermap.org/weather-conditions - use this to see what type of weather it can return

//Need to add the temperature in.
