/**
 * Get the current time and display it.
 */
function showCurrentTime() {
    setInterval(() => {
        let currentTime = new Date();
        let formattedTime = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        document.getElementById("current-time").innerHTML = "Time: " + formattedTime;
    }, 1000);
}

/**
 * Get the user's current location and display the weather.
 */
function displayWeatherData(data) {
    // Display weather data on the UI
    console.log(data);
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
    let data = await response.json();

    // 404 error handling
    if (data.cod === "404" || data.cod === "400") {
        document.getElementById("location404").style.display = "flex";
        document.querySelector(".weather-container").style.display = "none";
        return;
    } else {
        document.querySelector(".weather-container").style.display = "flex";
        document.getElementById("location404").style.display = "none";
    }

    console.log(data);

    // Weather Description
    document.getElementById("location").innerHTML = data.name;
    document.getElementById("temperature").innerHTML = "Temperature: " + Math.round(data.main.temp) + "°C";
    document.getElementById("feels-like").innerHTML = "Feels like: " + Math.round(data.main.feels_like) + "°C";
    document.getElementById("max-temp").innerHTML = "Maximum: " + Math.round(data.main.temp_max) + "°C";
    document.getElementById("min-temp").innerHTML = "Minimum: " + Math.round(data.main.temp_min) + "°C";
    document.getElementById("sun-rise").innerHTML = "Sunrise: " + new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("sun-set").innerHTML = "Sunset: " + new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("weather-desc").innerHTML = data.weather[0].description;;
    document.getElementById("wind").innerHTML = "Wind Speed: " + data.wind.speed + " km/h";
    document.getElementById("humidity").innerHTML = "Humidity Level: " + data.main.humidity + "%";

    //Last updated time
    lastUpdatedTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("last-updated").innerHTML = "Last Updated: " + lastUpdatedTime;

    // Weather icons.
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].description;

    // Flag icons.
    const flagIcon = document.getElementById("flag-icon");
    flagIcon.src = `https://www.flagsapi.com/${data.sys.country}/flat/32.png`;
    flagIcon.alt = data.sys.country;
}

// Refresh Button
const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", () => {
    const location = document.getElementById("location").innerHTML;
    getWeather(location);
    console.log("Weather data refreshed for location:", location);
});

// Search box event listener
if (searchBox) {
    searchBox.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            document.querySelector(".weather-container").style.display = "flex";
            if (isCelsius === !isCelsius) {
                isCelsius = false;
                document.getElementById("temperature-toggle-btn").innerHTML = "°C";
            } else {
                isCelsius = true;
                document.getElementById("temperature-toggle-btn").innerHTML = "°F";
            }
            getWeather(searchBox.value);
            searchBox.value = '';
        }
    });
}

// Temperature unit toggle button
let isCelsius = true; // Variable to track the temperature unit

/**
 * Toggle between Celsius and Fahrenheit temperature units.
 */
function toggleTemperatureUnit() {
    const temperatureElement = document.getElementById("temperature");
    const feelsLikeElement = document.getElementById("feels-like");
    const maxTempElement = document.getElementById("max-temp");
    const minTempElement = document.getElementById("min-temp");

    if (isCelsius) {
        // Convert to Fahrenheit
        const temperatureFahrenheit = parseFloat(temperatureElement.innerText.replace("Temperature: ", "").replace("°C", "").replace("°F", "") * 9) / 5 + 32;
        const feelsLikeFahrenheit = parseFloat(feelsLikeElement.innerText.replace("Feels like: ", "").replace("°C", "").replace("°F", "") * 9) / 5 + 32;
        const maxTempFahrenheit = parseFloat(maxTempElement.innerText.replace("Maximum: ", "").replace("°C", "").replace("°F", "") * 9) / 5 + 32;
        const minTempFahrenheit = parseFloat(minTempElement.innerText.replace("Minimum: ", "").replace("°C", "").replace("°F", "") * 9) / 5 + 32;

        temperatureElement.innerHTML = "Temperature: " + Math.round(temperatureFahrenheit) + "°F";
        feelsLikeElement.innerHTML = "Feels like: " + Math.round(feelsLikeFahrenheit) + "°F";
        maxTempElement.innerHTML = "Maximum: " + Math.round(maxTempFahrenheit) + "°F";
        minTempElement.innerHTML = "Minimum: " + Math.round(minTempFahrenheit) + "°F";

        document.getElementById("temperature-toggle-btn").innerHTML = "°C";

    } else {
        // Convert to Celsius
        const temperatureCelsius = ((parseFloat(temperatureElement.innerText.replace("Temperature: ", "").replace("°C", "").replace("°F", "")) - 32) * 5) / 9;
        const feelsLikeCelsius = ((parseFloat(feelsLikeElement.innerText.replace("Feels like: ", "").replace("°C", "").replace("°F", "")) - 32) * 5) / 9;
        const maxTempCelsius = ((parseFloat(maxTempElement.innerText.replace("Maximum: ", "").replace("°C", "").replace("°F", "")) - 32) * 5) / 9;
        const minTempCelsius = ((parseFloat(minTempElement.innerText.replace("Minimum: ", "").replace("°C", "").replace("°F", "")) - 32) * 5) / 9;

        temperatureElement.innerHTML = "Temperature: " + Math.round(temperatureCelsius) + "°C";
        feelsLikeElement.innerHTML = "Feels like: " + Math.round(feelsLikeCelsius) + "°C";
        maxTempElement.innerHTML = "Maximum: " + Math.round(maxTempCelsius) + "°C";
        minTempElement.innerHTML = "Minimum: " + Math.round(minTempCelsius) + "°C";

        document.getElementById("temperature-toggle-btn").innerHTML = "°F";
    }

    // Toggle the temperature unit
    isCelsius = !isCelsius;
    console.log("Temperature unit changed to " + (isCelsius ? "Celsius" : "Fahrenheit"));
}

// Add the button click event listener
const temperatureToggleBtn = document.getElementById("temperature-toggle-btn");
temperatureToggleBtn.addEventListener("click", toggleTemperatureUnit);

// Function to display weather for favorite locations
function displayWeatherForFavorites() {
    const favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations'));
    console.log(localStorage.getItem('favoriteLocations'));
    console.log("Favorite locations: " + favoriteLocations);
    // Display weather for each favorite location
    if (favoriteLocations) {
        favoriteLocations.forEach(location => {
            console.log("Display weather for favorite location: " + location);
        });
    } else {
        console.log("No favorite locations found.");
    }
}

// Function to set a location as a favorite
function setFavoriteLocation(location) {
    // TODO - check if the location is already a favorite
    // TODO - void empty locations
    let favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations')) || [];
    favoriteLocations.push(location);
    localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations));
    console.log("Location set as favorite: " + location);
}

// Add the button click event listener to set a location as a favorite
const setFavoriteBtn = document.getElementById('set-favorite-btn');
setFavoriteBtn.addEventListener('click', function () {
    const location = document.getElementById("location").innerHTML;
    setFavoriteLocation(location);
});

// Add the button click event listener
const favoritesBtn = document.getElementById('favorites-btn');
favoritesBtn.addEventListener('click', displayWeatherForFavorites);

showCurrentTime();
getWeatherForCurrentLocation();

// TODO - Add a map that shows the location of the city.
// TODO - Add autocomplete for the search box.
// TODO - Add a 5 day forecast.
// TODO - Add a button that displays the weather for the user's favorite locations.(Local storage???)
// TODO - Handle duplicate city names.
// TODO - Add scroll animation displaying the user's current weather information.