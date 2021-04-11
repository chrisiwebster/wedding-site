window.addEventListener("load", () => {
  const daysCountdown = document.querySelector("#days");
  const hoursCountdown = document.querySelector("#hours");
  const minsCountdown = document.querySelector("#mins");
  const secsCountdown = document.querySelector("#secs");
  const weddingDate = new Date("July 31, 2022 14:30").getTime();
  const weatherIcon = document.querySelector("#weather-type-icon");
  const weatherText = document.querySelector("#weather-type-text");
  const weatherTemp = document.querySelector("#weather-temp");

  //Countdown clock
  const x = setInterval(() => {
    let now = new Date().getTime();
    //Sees how long is left
    let distance = weddingDate - now;
    //Calc for days, hours, minutes
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
    //This makes the seconds count down
    if (distance < 0) {
      clearInterval(x);
    }
  }, 1000);

  //Weather API
  const key = "51d943a45b5fb52aedcf73db62cd7b54";
  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=3034125&units=metric&appid=${key}`,
      { cache: "no-cache" }
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      //Weather main is saying what the weather will be like (i.e. cloudy)
      let weatherMain = await jsonResponse["weather"][0]["main"];
      //Getting the temperature
      let temp = await jsonResponse["main"]["temp"];
      //Description goes into more detail
      let description = await jsonResponse["weather"][0]["description"];
      //Checking what the weather will be like and inserting icon
      switch (true) {
        case weatherMain == "Rain":
          weatherIcon.innerHTML =
            '<img src="https://openweathermap.org/img/wn/10d@4x.png" alt="">';
          break;
        case weatherMain == "Clouds":
          weatherIcon.innerHTML =
            '<img src="https://openweathermap.org/img/wn/03d@4x.png" alt="">';
          break;
        case weatherMain == "Clear":
          weatherIcon.innerHTML =
            '<img src="https://openweathermap.org/img/wn/01d@4x.png" alt="">';
          break;
        case weatherMain == "Snow":
          weatherIcon.innerHTML =
            '<img src="https://openweathermap.org/img/wn/13d@4x.png"> alt=""';
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
            '<img src="https://openweathermap.org/img/wn/50d@2x.png" alt="">';
          break;
        case weatherMain == "Drizzle":
          weatherIcon.innerHTML =
            '<img src="https://openweathermap.org/img/wn/09d@2x.png" alt="">';
          break;
        case weatherMain == "Thunderstorm":
          weatherIcon.innerHTML =
            '<img src="https://openweathermap.org/img/wn/11d@2x.png" alt="">';
          break;
      }
      //Rounding up the temperature because it's provided in decimals.
      weatherTemp.innerHTML = Math.round(temp);
      //The description is provided all lower case, so making the first letter uppercase.
      weatherText.innerHTML =
        description.charAt(0).toUpperCase() +
        description.slice(1).toLowerCase();
    }
  };
  getWeather();
});
