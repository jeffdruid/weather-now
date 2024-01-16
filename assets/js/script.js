
/**
 * Get the current time and display it.
 */
function showCurrentTime() {
    setInterval(() => {
        var currentTime = new Date();
        var formattedTime = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        console.log("Current time: " + formattedTime);
        document.getElementById("current-time").innerHTML = "Current time: " + formattedTime;
    }, 1000);
}

// TODO - Hide apiKeys in the .env file. Temp API key.
const apiKey = `10b01580cf1723c01c311fb7cca8e196`;

// API call
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

/**
 * Get the weather data from the API.
 */
async function getWeather(location) {
    const response = await fetch(apiUrl + location + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.getElementById("location").innerHTML = data.name;
    document.getElementById("temperature").innerHTML = "Temperature: " + Math.round(data.main.temp) + "°C";
    document.getElementById("feels-like").innerHTML = "Feels like: " + Math.round(data.main.feels_like) + "°C";
    document.getElementById("max-temp").innerHTML = "Maximum Temperature: " + Math.round(data.main.temp_max) + "°C";
    document.getElementById("min-temp").innerHTML = "Minimum Temperature: " + Math.round(data.main.temp_min) + "°C";
    document.getElementById("sun-rise").innerHTML = "Sunrise Time: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("sun-set").innerHTML = "Sunset Time: " + new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("weather-desc").innerHTML = "Description: " + data.weather[0].description;;
    document.getElementById("wind").innerHTML = "Wind Speed: " + data.wind.speed + " km/h";
    document.getElementById("humidity").innerHTML = "Humidity Level: " + data.main.humidity + "%";

    // TODO - Add weather icons.
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].description;
    console.log(weatherIcon);
    console.log(weatherIcon.src);
    console.log(weatherIcon.alt);
}

if (searchBox) {
    searchBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            getWeather(searchBox.value);
            searchBox.value = '';
        }
    });
}

showCurrentTime();

// TODO - Add error handling for invalid city names.
// TODO - Add weather icons.
// TODO - Add a background image that changes depending on the weather.
// TODO - Add a 5 day forecast.
// TODO - Add a map that shows the location of the city.
// TODO - Add a button that changes the temperature from Celsius to Fahrenheit.
// TODO - Update the UI.
// TODO - Add a loading spinner.
// TODO - Update current time every second.
// TODO - Add autocomplete for the search box.
// TODO - Hide the search input, display search icon instead. When the icon is clicked, the search input is displayed.
// TODO - Clear the search box after the search is complete.