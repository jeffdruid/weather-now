// API call
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// SOLVED - CORS error
const apiUrl = 'https://cors-anywhere.herokuapp.com/https://weather-key-160275f00837.herokuapp.com/myapi?';
const searchBox = document.querySelector(".search input");
let lastUpdatedTime = '';

// Add the unlock CORS access button
const unlockButton = document.createElement("button");
unlockButton.textContent = "Unlock CORS Access";
unlockButton.addEventListener("click", () => {
    window.open("https://cors-anywhere.herokuapp.com/corsdemo", "_blank");
    unlockButton.style.display = "none";
});

document.body.appendChild(unlockButton);

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
            try {
                const response = await fetch(apiUrl + `lat=${latitude}&lon=${longitude}`, { mode: 'cors' });
                // console.log(apiUrl + `lat=${latitude}&lon=${longitude}`); // Log the apiUrl with latitude and longitude
                console.log(response);
                // console.log(apiUrl);
                const data = await response.json();
                displayWeatherData(data);
                document.getElementById("temperature-now").innerHTML = "Temp: " + Math.round(data.main.temp) + "°C";
                document.getElementById("current-location").innerHTML = data.name;
                document.getElementById("current-flag").src = `https://www.flagsapi.com/${data.sys.country}/flat/16.png`;
                document.getElementById("current-feels-like").innerHTML = "Feels like: " + Math.round(data.main.feels_like) + "°C";
                document.getElementById("current-max").innerHTML = "Maximum: " + Math.round(data.main.temp_max) + "°C";
                document.getElementById("current-min").innerHTML = "Minimum: " + Math.round(data.main.temp_min) + "°C";
                document.getElementById("current-sunrise").innerHTML = "Sunrise: " + new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                document.getElementById("current-sunset").innerHTML = "Sunset: " + new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                document.getElementById("current-desc").innerHTML = data.weather[0].description;
                document.getElementById("current-wind").innerHTML = "Wind Speed: " + data.wind.speed + " km/h";
                document.getElementById("current-humidity").innerHTML = "Humidity Level: " + data.main.humidity + "%";
            } catch (error) {
                console.error(error);
                // Display an error message on the UI
                document.getElementById("error-message-user-location").style.display = "flex";
                const errorMessage = document.getElementById('error-message-user-location');
                errorMessage.textContent = 'Failed to fetch weather data.';
            }
        }, (error) => {
            console.error(error);
            // Display an error message on the UI
            document.getElementById("error-message-user-location").style.display = "flex";
            const errorMessage = document.getElementById('error-message-user-location');
            errorMessage.textContent = 'Please allow location access and reload the page. ';
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
        // Display an error message on the UI
        document.getElementById("error-message-user-location").style.display = "flex";
        const errorMessage = document.getElementById('error-message-user-location');
        errorMessage.textContent = 'Geolocation is not supported by this browser.';
    }
}

// Hide error message when clicking anywhere on the screen
document.addEventListener("click", () => {
    document.getElementById("error-message-user-location").style.display = "none";
    document.getElementById("error-message-user-forecast").style.display = "none";
    document.getElementById("location404").style.display = "none";
    // document.getElementById("search-history").style.display = "none";
});

/**
 * Get the weather data from the API.
 */
async function getWeather(location) {
    const response = await fetch(apiUrl + `location=` + location);
    let data = await response.json();

    // 404 error handling
    if (response.status === 400 || response.status === 404) {
        document.getElementById("location404").innerHTML = "Location not found.";
        document.getElementById("location404").style.display = "flex";
        document.getElementById("weather").style.display = "none";
        document.getElementById("favorite-weather").style.display = "none";
        document.getElementById("forecast").style.display = "none";
        document.getElementById("search-history").style.display = "none";
        return;
    } else {
        // Display the weather data on the UI with animation
        const weatherElement = document.getElementById("weather");
        weatherElement.style.display = "flex";

        document.getElementById("favorite-weather").style.display = "none";
        document.getElementById("forecast").style.display = "none";
        document.getElementById("chart_div").style.display = "none";
        document.getElementById("search-history").style.display = "none";
        document.getElementById("side-bar").style.left = "-25%";
        document.getElementById("side-bar-close-btn").style.transform = "rotate(360deg)";
        console.log("Close favorites, " + location + " selected.");
        isForecastOpen = false;
        isChartOpen = false;
        isCelsius = true;
        isSideBarOpen = false;
    }

    console.log(data);

    // Display the weather data on the UI with animation
    document.getElementById("weather").style.animation = "fadeIn .3s ease-in";

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

    // Add the searched location to the search history
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const locationName = document.getElementById("location").innerHTML;
    const locationCountry = document.getElementById("country").innerHTML;
    searchHistory.push(`${locationName}, ${locationCountry}`);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
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

const searchButton = document.querySelector("input");
searchButton.addEventListener("click", () => {
    document.getElementById("side-bar").style.left = "-25%";
    document.getElementById("side-bar-close-btn").style.transform = "rotate(360deg)";
    isSideBarOpen = false;
    console.log('Search button clicked, Side bar closed');
});

// Temperature unit toggle button
let isCelsius = true;

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
        document.getElementById("temperature-toggle-btn").style.color = "rgba(255, 255, 255, 1)";


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
        document.getElementById("temperature-toggle-btn").style.color = "rgba(0, 0, 0, 1)";
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

    // Display the weather data on the UI with animation
    const weatherFavorites = document.getElementById("favorite-weather");
    weatherFavorites.style.display = "flex";
    weatherFavorites.style.animation = "fadeIn .3s ease-in";

    // close searchHistory
    document.getElementById("search-history").style.display = "none";

    // Close the side bar
    document.getElementById("side-bar").style.left = "-25%";
    document.getElementById("side-bar-close-btn").style.transform = "rotate(360deg)";
    isSideBarOpen = false;
    console.log('Favorites button clicked, Side bar closed');

    // Close the history
    document.getElementById("search-history").style.display = "none";
    isHistoryOpen = false;

    // Check if there are favorite locations
    if (favoriteLocations && favoriteLocations.length > 0) {
        console.log(favoriteLocations);

        // Add the "Delete favorite" button
        const clearFavoritesBtn = document.createElement('div');
        clearFavoritesBtn.id = 'clear-favorites-btn';
        clearFavoritesBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        favoriteWeatherContainer.appendChild(clearFavoritesBtn);
        document.getElementById('clear-favorites-btn').style.display = "flex";
        document.getElementById('clear-favorites-btn').addEventListener('click', clearAllFavorites);

        // Add the "My Favorites" heading
        const favoritesHeading = document.createElement('h4');
        favoritesHeading.innerText = 'My Favorites';
        favoriteWeatherContainer.appendChild(favoritesHeading);

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
    /**
        * Clears all favorite locations.
        */
    function clearAllFavorites() {
        const confirmation = confirm("Are you sure you want to clear all favorites?");
        if (confirmation) {
            localStorage.removeItem('favoriteLocations');
            console.log("All favorites cleared.");
            document.getElementById("favorite-weather").innerHTML = "<span style='color: rgba(255, 0, 0, 0.7);'>No favorite locations found.</span>";
        }
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

// // Add the button click event listener to display weather for favorite locations
const favoritesBtn = document.getElementById('favorites-btn');
// favoritesBtn.addEventListener('click', displayWeatherForFavorites);

let isFavoritesOpen = false;

// Add the button click event listener to toggle favorites
favoritesBtn.addEventListener('click', () => {
    // Close the side bar
    document.getElementById("side-bar").style.left = "-25%";
    document.getElementById("side-bar-close-btn").style.transform = "rotate(360deg)";
    isSideBarOpen = false;
    console.log('History button clicked, Side bar closed');

    if (isFavoritesOpen && document.getElementById("favorite-weather").style.display === "flex") {
        console.log('Favorites closed');
        document.getElementById("favorite-weather").style.display = "none";
    } else {
        console.log('Favorites opened');
        document.getElementById("favorite-weather").style.display = "flex";
        document.getElementById("weather").style.display = "none";
        document.getElementById("forecast").style.display = "none";
        document.getElementById("chart_div").style.display = "none";
        displayWeatherForFavorites();
    }
    isFavoritesOpen = !isFavoritesOpen;
});

/*
    * 5 Day Forecast
    */
async function getFiveDayForecast(location) {
    // const apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&';
    const response = await fetch(`${apiUrl}location=${location}&endpoint=forecast`);
    console.log(response);
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
                console.log("Celsius " + isCelsius);
            } else {
                forecastData += `<span class="forecastC" style="display: none;">${temperatureCelsius}°C</span>`;
                forecastData += `<span class="forecastF" style="display: inline;">${temperatureFahrenheit}°F</span>`;
                console.log("Fahrenheit " + isCelsius);
            }
            forecastData += `${description}</div>`;
        }
        isCelsius = !isCelsius;
    }
    document.getElementById("forecast").innerHTML = forecastData;
    document.getElementById("forecast").classList.add('weather-container');
    document.getElementById("forecast").style.display = "flex";
}

let isForecastOpen = false;

const forecastBtn = document.getElementById('forecast-btn');
forecastBtn.addEventListener('click', () => {
    console.log(isCelsius);
    const location = document.getElementById("location").innerHTML;
    isChartOpen = false;
    if (isForecastOpen && document.getElementById("forecast").style.display === "flex") {
        console.log('Forecast closed');
        document.getElementById("forecast").style.display = "none";
        // document.getElementById("forecast-btn").style.color = "rgba(0, 0, 0, .7) ";
    } else {
        console.log('Forecast opened');
        document.getElementById("forecast").style.display = "flex";
        document.getElementById("forecast").style.animation = "fadeIn .3s ease-in";
        document.getElementById("forecast-btn").style.color = "rgba(255, 0, 0, 1) ";
        document.getElementById("chart-btn").style.color = "rgba(255, 255, 255, .9) ";
        document.getElementById("chart_div").style.display = "none";

        // Add spinner while forecast is loading
        const spinner = document.createElement("div");
        spinner.classList.add("spinner");
        document.getElementById("forecast").appendChild(spinner);

        getFiveDayForecast(location).then(() => {
            // Remove spinner after forecast is loaded
            document.getElementById("forecast").removeChild(spinner);
        });
    }
    isForecastOpen = !isForecastOpen;
});

// Include the Google Charts library
google.charts.load('current', { 'packages': ['corechart'] });

// Function to draw the chart
async function drawChart() {

    const location = document.getElementById("location").innerHTML;
    // const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${location}`;
    // const response = await fetch(apiUrlForecast);
    const response = await fetch(`${apiUrl}location=${location}&endpoint=forecast`);
    console.log(response);
    const data = await response.json();
    console.log(data);

    // Make an API call to fetch the forecast data
    fetch(apiUrl + `location=` + location + `&endpoint=forecast`)
        .then(response => response.json())
        .then(data => {
            // Create the data table
            let dataTable = new google.visualization.DataTable();
            dataTable.addColumn('string', 'Day');
            dataTable.addColumn('number', 'Temperature');
            dataTable.addColumn('number', 'Humidity');

            // Extract the forecast data from the API response
            const forecastData = data.list;

            // Iterate over the forecast data and add rows to the data table
            forecastData.forEach(forecast => {
                const date = new Date(forecast.dt_txt);
                const day = date.toLocaleDateString('en-US', { day: 'numeric' });
                const month = date.toLocaleDateString('en-US', { month: 'long' });
                const year = date.toLocaleDateString('en-US', { year: 'numeric' });
                const temperature = forecast.main.temp;
                const humidity = forecast.main.humidity;
                dataTable.addRow([`${day} ${month} ${year}`, temperature, humidity]);
            });

            // Set chart options
            let options = {
                title: `Forecast - ${location}`,
                seriesType: 'bars',
                series: {
                    0: { targetAxisIndex: 0 },
                    1: { targetAxisIndex: 1, type: 'line' }
                },
                vAxes: {
                    0: { title: 'Temperature (°C)' },
                    1: { title: 'Humidity (%)' }
                },
                hAxis: { title: 'Day' },
                legend: { position: 'bottom' }
            };

            // Instantiate and draw the chart
            let chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
            chart.draw(dataTable, options);
        })
        .catch(error => {
            // Display an error message on the UI
            document.getElementById("error-message-user-forecast").style.display = "flex";
            const errorMessage = document.getElementById('error-message-user-forecast');
            errorMessage.textContent = 'Error fetching forecast data. Please try again.';
            console.error(location, error);
        });
}

let isChartOpen = false;
const chartBtn = document.getElementById('chart-btn');
chartBtn.addEventListener('click', async () => {
    document.getElementById("chart_div").style.display = "flex";
    document.getElementById("chart_div").style.animation = "fadeIn .3s ease-in";
    document.getElementById("forecast").style.display = "none";
    isForecastOpen = false;
    if (isChartOpen && document.getElementById("chart_div").style.display === "flex") {
        console.log('Chart closed');
        document.getElementById("chart_div").style.display = "none";
    } else {
        console.log('Chart opened');
        document.getElementById("chart_div").style.display = "flex";
        document.getElementById("chart-btn").style.color = "rgba(255, 0, 0, 1) ";
        document.getElementById("forecast-btn").style.color = "rgba(255, 255, 255, 1) ";
        document.getElementById("forecast").style.display = "none";

        // Show spinner while chart is loading
        document.querySelector('.spinner').style.display = "flex";
        const spinner = document.querySelector('.spinner');
        document.getElementById("chart_div").appendChild(spinner);

        // Rotate spinner until display is set to none
        const rotateSpinner = () => {
            if (document.getElementById("chart_div").style.display !== "none") {
                spinner.style.transform = `rotate(${spinnerRotation}deg)`;
                spinnerRotation += 10;
                setTimeout(rotateSpinner, 100);
            }
        };

        let spinnerRotation = 0;
        rotateSpinner();

        await drawChart();

        // Remove spinner after chart is loaded
        document.getElementById("chart_div").removeChild(spinner);
    }
    isChartOpen = !isChartOpen;
});

// localStorage.removeItem('searchHistory');

// Add a button to show the search history
const showHistoryBtn = document.getElementById('show-history-btn');
// Function to display the search history
function displaySearchHistory() {
    // Close favorites
    document.getElementById("favorite-weather").style.display = "none";
    isFavoritesOpen = false;

    // Retrieve search history from local storage
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Check if search history is empty
    if (searchHistory.length === 0) {
        const historyContainer = document.getElementById('search-history');
        historyContainer.innerHTML = '';

        // Add the error message
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'No search history found.';
        historyContainer.appendChild(errorMessage);
        return;
    }

    // Remove duplicates from search history
    const uniqueSearchHistory = [...new Set(searchHistory)];

    // Update the UI with the search history
    const historyContainer = document.getElementById('search-history');
    historyContainer.innerHTML = '';

    // Add the "My History" heading
    const historyHeading = document.createElement('h4');
    historyHeading.textContent = 'My History';
    historyContainer.appendChild(historyHeading);

    // Iterate over the search history and display each item
    uniqueSearchHistory.forEach(item => {
        const historyItem = document.createElement('a');
        historyItem.textContent = item;
        historyItem.href = '#';
        historyItem.addEventListener('click', () => {
            getWeather(item);
        });
        historyContainer.appendChild(historyItem);
    });
}

let isHistoryOpen = false;

// Add a button click event listener to show the search history
showHistoryBtn.addEventListener('click', () => {
    // Close the side bar
    document.getElementById("side-bar").style.left = "-25%";
    document.getElementById("side-bar-close-btn").style.transform = "rotate(360deg)";
    isSideBarOpen = false;
    console.log('History button clicked, Side bar closed');

    // Display the search history
    document.getElementById("search-history").style.display = "flex";
    document.getElementById("search-history").style.animation = "fadeIn .3s ease-in";
    displaySearchHistory();

    if (isHistoryOpen && document.getElementById("search-history").style.display === "flex") {

        console.log('History closed');
        isHistoryOpen = !isHistoryOpen;
        document.getElementById("search-history").style.display = "none";
    } else {
        console.log('History opened');
        isHistoryOpen = !isHistoryOpen;
        document.getElementById("search-history").style.display = "flex";
    }
});

// Function to toggle dark mode
function toggleDarkMode() {
    // Toggle the dark mode
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');

    // Change variable colors in :root
    const root = document.documentElement;
    if (body.classList.contains('dark-mode')) {
        root.style.setProperty('--primary-color', 'white');
        root.style.setProperty('--secondary-color', 'black');
        root.style.setProperty('--gradient-start-color', 'slategray');
        root.style.setProperty('--gradient-end-color', 'black');
        root.style.setProperty('--text-color', 'lightgray');

        body.style.removeClassName('dark-mode');

    } else {
        root.style.setProperty('--primary-color', 'rgba(22, 0, 0, 1)');
        root.style.setProperty('--secondary-color', 'rgba(255, 255, 255, 0.7)');
        root.style.setProperty('--gradient-start-color', 'rgba(238, 174, 202, 1)');
        root.style.setProperty('--gradient-end-color', 'rgba(148, 187, 233, 1)');
        root.style.setProperty('--text-color', 'rgba(0, 0, 0, 0.8');

        body.style.addClassName('dark-mode');
    }
}

// Add the button click event listener to toggle dark mode
const darkModeBtn = document.getElementById('dark-mode-btn');
darkModeBtn.addEventListener('click', toggleDarkMode);

let isSideBarOpen = false;

// Add the button click event listener to toggle the side bar
const sideBarBtn = document.getElementById('side-bar-close-btn');
sideBarBtn.addEventListener('click', () => {
    if (isSideBarOpen) {
        console.log('Side bar closed');
        document.getElementById("side-bar").style.left = "-25%";
        document.getElementById("side-bar-close-btn").style.transform = "rotate(360deg)";
        document.getElementById("side-bar-close-btn").style.transition = "0.5s";
        document.getElementById("side-bar").style.transition = "0.75s";
        document.getElementById("side-bar").style.background = "rgba(0, 0, 0, 0)";
        document.getElementById("side-bar").style.backdropFilter = "blur(0px)";
    } else {
        console.log('Side bar opened');
        document.getElementById("side-bar").style.left = "0%";
        document.getElementById("side-bar-close-btn").style.transform = "rotate(180deg)";
        document.getElementById("side-bar-close-btn").style.transition = "0.5s";
        document.getElementById("side-bar").style.transition = "0.75s";
        document.getElementById("side-bar").style.background = "rgba(0, 0, 0, 0.1)";
        document.getElementById("side-bar").style.backdropFilter = "blur(2px)";
    }
    isSideBarOpen = !isSideBarOpen;
});

showCurrentTime();
// TODO - Comment out the following line to avoid making too many API call for the user's current location
// getWeatherForCurrentLocation();

// TODO - Add a map that shows the location of the city. (Future feature)
// TODO - Update weather icons. (Future feature)
// TODO - Add autocomplete for the search box. (Future feature)
// TODO - Handle duplicate city names. (BUG - API)
// TODO - Double check error handling.
// TODO - Remove console logs. ???
// TODO - Remove unused code.