/**
 * Show the user's location.
 */
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);

    document.getElementById("location").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
}

/**
 * Get the user's location.
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

/**
 * Get the current time and display it.
 */
function showCurrentTime() {
    var currentTime = new Date();
    console.log("Current time: " + currentTime);
    document.getElementById("current-time").innerHTML = "Current time: " + currentTime;
}
showCurrentTime();

getLocation();

// TODO - Hide apiKeys in the .env file. Temp API key.
const apiKey = `API_KEY_HERE`;

// API call
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Brazil';

async function getWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    document.getElementById("location").innerHTML = data.name;
    document.getElementById("temperature").innerHTML = data.main.temp;
    document.getElementById("feels-like").innerHTML = data.main.feels_like;
    document.getElementById("max-temp").innerHTML = data.main.temp_max;
    document.getElementById("min-temp").innerHTML = data.main.temp_min;
    document.getElementById("sun-rise").innerHTML = data.sys.sunrise;
    document.getElementById("sun-set").innerHTML = data.sys.sunset;
    document.getElementById("weather-desc").innerHTML = data.weather[0].description;
    document.getElementById("wind").innerHTML = data.wind.speed;
    document.getElementById("humidity").innerHTML = data.main.humidity;

}

getWeather();