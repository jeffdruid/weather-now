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

const apiKey = '10b01580cf1723c01c311fb7cca8e196';

// API call
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Brazil';

async function getWeather() {
    const response = await fetch(apiUrl + '&appid=' + apiKey);
    var data = await response.json();
    console.log(data);
}

getWeather();