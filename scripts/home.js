import key from "./_apikey.js";
window.addEventListener("load", async () => {
  const daysCountdown = await document.querySelector("#days");
  const hoursCountdown = await document.querySelector("#hours");
  const minsCountdown = await document.querySelector("#mins");
  const secsCountdown = await document.querySelector("#secs");
  const weddingDate = await new Date("July 31, 2021 14:30").getTime();
  const weatherIcon = await document.querySelector("#weather-type-icon");
  const weatherText = await document.querySelector("#weather-type-text");
  const weatherTemp = await document.querySelector("#weather-temp");

  //Countdown clock
  const x = setInterval(() => {
    let now = new Date().getTime();
    /*Sees how long is left*/
    let distance = weddingDate - now;
    /*Calc for days, hours, mintues*/
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
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

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=3034125&units=metric&appid=${key}`
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
      let weatherMain = jsonResponse["weather"][0]["main"];
      let temp = jsonResponse["main"]["temp"];
      let description = jsonResponse["weather"][0]["description"];
      switch (true) {
        case weatherMain == "Rain":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/10d@4x.png">';
          break;
        case weatherMain == "Clouds":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/03d@4x.png">';
          break;
        case weatherMain == "Clear":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/01d@4x.png">';
          break;
        case weatherMain == "Snow":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/13d@4x.png">';
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
          break;
        case weatherMain == "Drizzle":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/09d@2x.png">';
          break;
        case weatherMain == "Thunderstorm":
          weatherIcon.innerHTML =
            '<img src="http://openweathermap.org/img/wn/11d@2x.png">';
          break;
      }
      weatherTemp.innerHTML = Math.round(temp);
      weatherText.innerHTML =
        description.charAt(0).toUpperCase() +
        description.slice(1).toLowerCase();
    }, false);
});
//https://openweathermap.org/weather-conditions - use this to see what type of weather it can return

//Need to add the temperature in.
