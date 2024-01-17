/**
 * Get the current time and display it.
 */
function showCurrentTime() {
    setInterval(() => {
        var currentTime = new Date();
        var formattedTime = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        console.log("Current time: " + formattedTime);
        document.getElementById("current-time").innerHTML = "Time: " + formattedTime;
    }, 1000);
}

/**
 * Get the user's current location and display the weather.
 */
function displayWeatherData(data) {
    // Display weather data on the UI
    console.log(data);
    // Add code to display weather data on the UI
}

/**
 * Get the user's current location and display the weather.
 */
function getWeatherForCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const response = await fetch(apiUrl + `lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
            const data = await response.json();
            displayWeatherData(data);
            document.getElementById("temperature-now").innerHTML = "Temp: " + Math.round(data.main.temp) + "°C";
            document.getElementById("current-location").innerHTML = data.name;


        }, (error) => {
            console.error(error);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// TODO - Hide apiKeys in the .env file. Temp API key.
const apiKey = `10b01580cf1723c01c311fb7cca8e196`;

// API call
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&';
const searchBox = document.querySelector(".search input");
let lastUpdatedTime = '';

/**
 * Get the weather data from the API.
 */
async function getWeather(location) {
    const response = await fetch(apiUrl + `q=` + location + `&appid=${apiKey}`);
    var data = await response.json();

    if (data.cod === "404" || data.cod === "400") {
        document.getElementById("location").innerHTML = "Invalid city name";
        return;
    }

    console.log(data);

    document.getElementById("location").innerHTML = data.name;
    document.getElementById("temperature").innerHTML = "Temperature: " + Math.round(data.main.temp) + "°C";
    document.getElementById("feels-like").innerHTML = "Feels like: " + Math.round(data.main.feels_like) + "°C";
    document.getElementById("max-temp").innerHTML = "Maximum: " + Math.round(data.main.temp_max) + "°C";
    document.getElementById("min-temp").innerHTML = "Minimum: " + Math.round(data.main.temp_min) + "°C";
    document.getElementById("sun-rise").innerHTML = "Sunrise: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("sun-set").innerHTML = "Sunset: " + new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("weather-desc").innerHTML = "Description: " + data.weather[0].description;;
    document.getElementById("wind").innerHTML = "Wind Speed: " + data.wind.speed + " km/h";
    document.getElementById("humidity").innerHTML = "Humidity Level: " + data.main.humidity + "%";
    // document.getElementById("country").innerHTML = "Country: " + data.sys.country;
    lastUpdatedTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("last-updated").innerHTML = "Last Updated: " + lastUpdatedTime;
    // Weather icons.
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].description;
    console.log(weatherIcon);

    // Refresh Button
    const refreshButton = document.getElementById("refresh-button");
    refreshButton.addEventListener("click", () => {
        getWeather(location);
    });
}

if (searchBox) {
    searchBox.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            document.querySelector(".weather-container").style.display = "flex";
            getWeather(searchBox.value);
            searchBox.value = '';
        }
    });
}

showCurrentTime();
getWeatherForCurrentLocation();

// TODO - Add a button that changes the temperature from Celsius to Fahrenheit.
// TODO - Add a background image that changes depending on the weather.
// TODO - Add a map that shows the location of the city.
// TODO - Add autocomplete for the search box.
// TODO - Add a 5 day forecast.
// TODO - Add a button that displays the weather for the user's favorite locations.(Local storage???
// TODO - Handle duplicate city names.
// TODO - shake Animation when the search box is invalid.
// TODO - Add carrousel animation displaying the user's current weather information.

// DONE
// TODO - Displays the weather for the user's current location.
// TODO - Add last updated time.
// TODO - Add a refresh button.
// TODO - Void the search if the search box is empty.
// TODO - Void the search if the search box contains invalid characters.
// TODO - Void the search if the search box contains a number.
// TODO - Void the search if the search box contains a special character.
// TODO - Add error handling for invalid city names.
// TODO - Add weather icons.
// TODO - Clear the search box after the search is complete.
// TODO - Update the UI.
// TODO - Void holding the enter key.
// TODO - Update current time every second.