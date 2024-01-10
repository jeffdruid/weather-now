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
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
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
    var formattedTime = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    console.log("Current time: " + formattedTime);
    document.getElementById("current-time").innerHTML = "Current time: " + formattedTime;
}

// TODO - Hide apiKeys in the .env file. Temp API key.
const apiKey = `your-api-key-here`;

// API call
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Brazil';

/**
 * Get the weather data from the API.
 */
async function getWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    document.getElementById("location").innerHTML = data.name;
    document.getElementById("temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.getElementById("feels-like").innerHTML = Math.round(data.main.feels_like) + "°C";
    document.getElementById("max-temp").innerHTML = Math.round(data.main.temp_max) + "°C";
    document.getElementById("min-temp").innerHTML = Math.round(data.main.temp_min) + "°C";
    document.getElementById("sun-rise").innerHTML = data.sys.sunrise + " UTC";
    document.getElementById("sun-set").innerHTML = data.sys.sunset + " UTC";
    document.getElementById("weather-icon").src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    document.getElementById("weather-desc").innerHTML = data.weather[0].description;;
    document.getElementById("wind").innerHTML = data.wind.speed + " km/h";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";

}

getWeather();
showCurrentTime();
getLocation(); 