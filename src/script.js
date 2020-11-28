// Date and Hours

let now = new Date();
function formatDate(date) {
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
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dateday = date.getDate();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
}

  let formattedDate = `${day}, ${month} ${dateday}, ${year}, ${hour}h${minutes}`;
  return formattedDate;
}
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML =(formatDate(now));

// Temperature Vs City



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityResult);

function weatherConditions(response) {
  let citySentence = document.querySelector("h3");
citySentence.innerHTML = response.data.name;
let celsius = Math.round(response.data.main.temp);
let celsiusElement = document.querySelector("#temperature");
celsiusElement.innerHTML = `${celsius}`;
}

function cityResult(event) {
 event.preventDefault();
let apiKey = "470498c2d4e432b94c48ce9eb7ed132a";
let unit = "metric";
let city = document.querySelector("#city-search").value;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`; 
axios.get(apiUrl).then(weatherConditions);
}


// GetPosition

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(weatherConditions);
  
}

function startGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let position = document.querySelector("#current-position");
position.addEventListener("click", startGeolocation);
