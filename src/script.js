// Date and Hours
function formatDate(timestamp) {
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let date = new Date(timestamp);
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dateday = date.getDate();
  let year = date.getFullYear();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
}

return`${day}, ${month} ${dateday}, ${year}, ${hour}h${minutes}`;
}

// Search City

function weatherConditions(response) {
document.querySelector("h3").innerHTML = response.data.name;
document.querySelector("#date-time").innerHTML = formatDate(response.data.dt*1000);
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
celsiusTemperature = response.data.main.temp;
document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
}

function cityResult(city) {
let apiKey = "470498c2d4e432b94c48ce9eb7ed132a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
axios.get(apiUrl).then(weatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  cityResult(city);
}

// GetPosition

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(weatherConditions);
  
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

// Celsius Vs Fahrenheit

function convertToFahrenheit(event) {
event.preventDefault();
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
document.querySelector("#temperature").innerHTML = Math.round(fahrenheiTemperature);
}

function convertToCelsius(event) {
event.preventDefault();
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let position = document.querySelector("#current-position");
position.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

cityResult("Odivelas");