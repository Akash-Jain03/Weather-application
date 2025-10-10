const apiKey = "be6ce6c86f51086372f6d19652ce33b3"; // <-- Replace with your OpenWeatherMap API key

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");
const cityNameElem = document.getElementById("city-name");
const temperatureElem = document.getElementById("temperature");
const descriptionElem = document.getElementById("description");
const humidityElem = document.getElementById("humidity");
const windSpeedElem = document.getElementById("wind-speed");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  // Hide previous data and errors
  weatherResult.classList.add("hidden");
  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Fill data into UI
    cityNameElem.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElem.textContent = Math.round(data.main.temp);
    descriptionElem.textContent = data.weather[0].description
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
    humidityElem.textContent = data.main.humidity;
    windSpeedElem.textContent = data.wind.speed;

    weatherResult.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
}