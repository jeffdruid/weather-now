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
        document.getElementById("weather").style.display = "none";
        document.getElementById("favorite-weather").style.display = "none";
        document.getElementById("forecast").style.display = "none";
        return;
    } else {
        document.getElementById("weather").style.display = "flex";
        document.getElementById("location404").style.display = "none";
        document.getElementById("favorite-weather").style.display = "none";
        console.log("Close favorites, " + location + " selected.");
        isFavoritesOpen = false;
        isCelsius = true;
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
    document.getElementById("country").innerHTML = data.sys.country;

    // Check if the location is a favorite 
    const favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations'));
    const locationString = data.name + ', ' + data.sys.country;
    if (favoriteLocations && favoriteLocations.includes(locationString)) {
        // Set the heart icon to red
        const favoriteIcon = document.querySelector('.fa-heart');
        favoriteIcon.style.color = 'rgba(255, 0, 0, 0.9)';
        console.log("Favorite icon set to red.");
        console.log("Location is a favorite: " + locationString);
    } else {
        // Set the heart icon to white
        const favoriteIcon = document.querySelector('.fa-heart');
        favoriteIcon.style.color = 'rgba(255, 255, 255, 0.7)';
        console.log("Favorite icon set to white.");
        console.log("Location is not a favorite: " + locationString);
    };

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
// End of getWeather function

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

        // Display the forecast temperatures in Fahrenheit
        document.querySelectorAll(".forecastC").forEach(forecast => {
            forecast.style.display = "none";
        });
        document.querySelectorAll(".forecastF").forEach(forecast => {
            forecast.style.display = "inline";
        });

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

        document.querySelectorAll(".forecastC").forEach(forecast => {
            forecast.style.display = "inline";
        });
        document.querySelectorAll(".forecastF").forEach(forecast => {
            forecast.style.display = "none";
        });

        document.getElementById("temperature-toggle-btn").innerHTML = "°F";
    }

    // Toggle the temperature unit
    isCelsius = !isCelsius;
    console.log("Temperature unit changed to " + (isCelsius ? "Celsius" : "Fahrenheit"));
}

// Add the button click event listener
const temperatureToggleBtn = document.getElementById("temperature-toggle-btn");
temperatureToggleBtn.addEventListener("click", toggleTemperatureUnit);

/**
 * Displays the weather for favorite locations.
 */
function displayWeatherForFavorites() {
    const favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations'));
    const favoriteWeatherContainer = document.getElementById('favorite-weather');
    favoriteWeatherContainer.innerHTML = '';
    favoriteWeatherContainer.classList.add('weather-container');

    if (favoriteLocations && favoriteLocations.length > 0) {
        console.log(favoriteLocations);

        // Display the temperature in Celsius or Fahrenheit
        favoriteLocations.forEach(location => {
            if (isCelsius === !isCelsius) {
                isCelsius = false;
                document.getElementById("temperature-toggle-btn").innerHTML = "°C";
            } else {
                isCelsius = true;
                document.getElementById("temperature-toggle-btn").innerHTML = "°F";
            }

            // Display the weather for each favorite location
            if (location.trim() !== '') {
                // Create a div for each favorite location
                const favoriteDiv = document.createElement('div');
                favoriteDiv.classList.add('favorite');

                // Create a link for each favorite location
                const favoriteLink = document.createElement('a');
                favoriteLink.href = '#';
                favoriteLink.innerText = location;
                favoriteLink.addEventListener('click', () => getWeather(location));
                favoriteDiv.appendChild(favoriteLink);
                favoriteWeatherContainer.appendChild(favoriteDiv);
            }
        });
    } else {
        // Display a message if no favorite locations are found
        console.log("No favorite locations found.");
        document.getElementById("favorite-weather").innerHTML = "<span style='color: rgba(255, 0, 0, 0.7);'>No favorite locations found.</span>";
    }
}

/**
 * Function to set a location as a favorite 
 */
function setFavoriteLocation(location) {
    // Avoid adding empty locations
    if (location.trim() === '') {
        console.log("Empty location cannot be set as a favorite.");
        return;
    } else {
        // Get the favorite locations from local storage
        let favoriteLocations = new Set(JSON.parse(localStorage.getItem('favoriteLocations')) || []);

        // Remove any empty locations from the favorite locations
        favoriteLocations = Array.from(favoriteLocations).filter(favoriteLocation => favoriteLocation.trim() !== '');

        // Check if the location is already a favorite
        if (favoriteLocations.includes(location)) {
            console.log("Location is already a favorite: " + location);
            return;
        } else {
            // Add the location to the favorite locations
            favoriteLocations.push(location);
            localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations));
            console.log("Location set as favorite: " + location);
        }
    }
}

// Clear the local storage
// localStorage.clear();

// Add the button click event listener to set a location as a favorite
const setFavoriteBtn = document.getElementById('set-favorite-btn');
setFavoriteBtn.addEventListener('click', function () {
    // Get the location name and country
    const locationName = document.getElementById("location").innerHTML;
    const locationCountry = document.getElementById("country").innerHTML;
    const location = `${locationName}, ${locationCountry}`;
    // Set the location as a favorite
    const favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations'));
    if (favoriteLocations && favoriteLocations.includes(location)) {
        // Remove the location from favoriteLocations array
        const updatedFavoriteLocations = favoriteLocations.filter(favoriteLocation => favoriteLocation !== location);
        localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavoriteLocations));
        console.log("Location removed from favorites: " + location);

        // Set the heart icon to white
        const favoriteIcon = document.querySelector('.fa-heart');
        favoriteIcon.style.color = 'rgba(255, 255, 255, 0.7)';
    } else {
        setFavoriteLocation(location);

        // Set the heart icon to red
        const favoriteIcon = document.querySelector('.fa-heart');
        favoriteIcon.style.color = 'rgba(255, 0, 0, 0.9)';
    };
});

// Add the button click event listener to display weather for favorite locations
const favoritesBtn = document.getElementById('favorites-btn');
favoritesBtn.addEventListener('click', displayWeatherForFavorites);

// Variable to track if favorites are open or closed
let isFavoritesOpen = false;

// Add the button click event listener to toggle favorites
favoritesBtn.addEventListener('click', () => {
    if (isFavoritesOpen) {
        console.log('Favorites closed');
        document.getElementById("favorite-weather").style.display = "none";
    } else {
        console.log('Favorites opened');
        document.getElementById("weather").style.display = "none";
        document.getElementById("favorite-weather").style.display = "flex";
        document.getElementById("location404").style.display = "none";
        document.getElementById("forecast").style.display = "none";
    }
    // Toggle the value of isFavoritesOpen
    isFavoritesOpen = !isFavoritesOpen;
});

/*
    * 5 Day Forecast
    */
async function getFiveDayForecast(location) {
    const apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&';
    const response = await fetch(`${apiUrlForecast}q=${location}&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    let forecastData = '';
    forecastData = `<h4>5 day Forecast</h4>` + forecastData;
    for (let i = 0; i < data.list.length; i++) {
        const temperatureCelsius = Math.round(data.list[i].main.temp);
        const temperatureFahrenheit = Math.round((temperatureCelsius * 9 / 5) + 32);
        const description = data.list[i].weather[0].description;
        const dateTime = new Date(data.list[i].dt_txt);
        if (dateTime.getHours() === 0) {
            const dayOfWeek = dateTime.toLocaleDateString(undefined, { weekday: 'long' });
            forecastData += `<div>${dayOfWeek}`;
            // Display the forecast's initial temperature in Celsius or Fahrenheit
            if (isCelsius) {
                forecastData += `<span class="forecastC" style="display: inline;">${temperatureCelsius}°C</span>`;
                forecastData += `<span class="forecastF" style="display: none;">${temperatureFahrenheit}°F</span>`;
                isCelsius = true;
            } else {
                isCelsius = false;
                forecastData += `<span class="forecastC" style="display: none;">${temperatureCelsius}°C</span>`;
                forecastData += `<span class="forecastF" style="display: inline;">${temperatureFahrenheit}°F</span>`;
            }
            forecastData += `${description}</div>`;
        }
        isCelsius = !isCelsius;
    }

    document.getElementById("forecast").innerHTML = forecastData;
    document.getElementById("forecast").classList.add('weather-container');
    document.getElementById("forecast").style.display = "flex";
}

isForecastOpen = false;

const forecastBtn = document.getElementById('forecast-btn');
forecastBtn.addEventListener('click', () => {
    const location = document.getElementById("location").innerHTML;
    if (isForecastOpen) {
        console.log('Forecast closed');
        document.getElementById("forecast").style.display = "none";
    } else {
        console.log('Forecast opened');
        document.getElementById("forecast").style.display = "flex";
        getFiveDayForecast(location);
    }
    isForecastOpen = !isForecastOpen;
});

showCurrentTime();
getWeatherForCurrentLocation();

// TODO - Add a map that shows the location of the city.
// TODO - Add autocomplete for the search box.
// TODO - Add a 5 day forecast.
// TODO - Handle duplicate city names.
// TODO - Add scroll animation displaying the user's current weather information.