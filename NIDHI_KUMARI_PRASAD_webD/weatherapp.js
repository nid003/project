
let temp = document.querySelector('#temp');
let wind = document.querySelector('.wind');
let pressure = document.querySelector('.pressure');
let vs = document.querySelector('.vs');
let hd = document.querySelector('.hd');
let lati = document.querySelector('.lati');
let long = document.querySelector('.long');
let rain = document.querySelector('.rain');
let button = document.querySelector('.search1');
let searchInput = document.querySelector('.search');


let fetchWeatherByCoords = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4ec5d175e759501e052ad4eae0720ca&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Unable to fetch weather data');
      }
      return response.json();
    })
    .then(displayData)
    .catch((err) => alert(err.message));
};


let displayData = (weather) => {
  temp.innerText = `Temperature: ${weather.main.temp}°C`;
  wind.innerText = `Wind Speed: ${weather.wind.speed} m/s`;
  pressure.innerText = `Pressure: ${weather.main.pressure} hPa`;
  vs.innerText = `Visibility: ${weather.visibility} m`;
  hd.innerText = `Humidity: ${weather.main.humidity}%`;
  lati.innerText = `Latitude: ${weather.coord.lat}`;
  long.innerText = `Longitude: ${weather.coord.lon}`;

  rain.innerText = `Rain Prediction: ${
    weather.rain ? weather.rain['1h'] + ' mm' : 'No rain'
  }`;

  document.querySelector('.description').innerText = `Description: ${
    weather.weather[0].description
  }`;
};


let getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      },
      (error) => {
        alert('Unable to fetch location. Please allow location access.');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
};


button.addEventListener('click', function () {
  let city = searchInput.value;

  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4ec5d175e759501e052ad4eae0720ca&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(displayData)
    .catch((err) => alert(err.message));
});


window.onload = getUserLocation;

