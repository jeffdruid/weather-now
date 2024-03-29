# [Weather Now](https://jeffdruid.github.io/weather-now/#/)

Weather Now is a web application that provides real-time weather information for any location worldwide.

![Animation-Intro](assets/media/ui-intro.gif)

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [User Stories](#user-stories)
4. [Wireframe](#wireframe)
5. [Features](#features)
   - [Header](#header)
   - [Animation Intro](#animation-intro)
   - [Weather Container](#weather-container)
   - [Current Weather](#current-weather)
   - [Search Functionality](#search-functionality)
   - [Temperature Units](#temperature-units)
   - [5-Day Forecast](#5-day-forecast)
   - [Favorites](#favorites)
   - [Dark Mode](#dark-mode)
   - [Search History](#search-history)
   - [Side Bar](#side-bar)
   - [Chart](#chart)
   - [GitHub](#github)
   - [Loading Screen](#loading-screen)
   - [Error Handling](#error-handling)
   - [Alerts](#alerts)
   - [Footer](#footer)
   - [APIs](#apis)
     - [OpenWeatherMap](#openweathermap)
     - [Flags API](#flags-api)
     - [Google Charts](#google-charts)
6. [Troubleshooting](#troubleshooting)
   - [CORS Error](#cors-error)
   - [API Key](#api-key)
   - [Remove User's Current Weather Information](#remove-users-current-weather-information)
7. [Testing](#testing)
   - [Validator Testing](#validator-testing)
     - [HTML](#html)
     - [CSS](#css)
     - [Javascript](#javascript)
   - [Accessibility](#accessibility)
   - [Lighthouse](#lighthouse)
   - [Responsiveness](#responsiveness)
   - [Manual Testing](#manual-testing)
     - [Cross-browser Compatibility](#cross-browser-compatibility)
     - [Responsiveness and Device Compatibility](#responsiveness-and-device-compatibility)
     - [Link Validation](#link-validation)
     - [Text and Font Readability](#text-and-font-readability)
     - [Acceptance Test](#acceptance-test)
     - [Desktop](#desktop)
     - [Tablet](#tablet)
     - [Mobile](#mobile)
8. [Bugs](#bugs)
   - [Fixed Bugs](#fixed-bugs)
9. [UI Improvements](#ui-improvements)
10. [Future Improvements](#future-improvements)
    - [Map Integration](#map-integration)
    - [Autocomplete](#autocomplete)
    - [User Interface](#user-interface)
    - [Cache Data](#cache-data)
    - [Color Code the Temperature](#color-code-the-temperature)
11. [Deployment](#deployment)
    - [Cloning & Forking](#cloning--forking)
    - [Local Deployment](#local-deployment)
    - [Remote Deployment](#remote-deployment)
12. [Credits](#credits)
    - [Source Code](#source-code)
    - [Icons](#icons)
    - [Images](#images)
    - [Useful links](#useful-links)

## Introduction

- Weather Now is an application that allows users to get the current weather and 5-day forecast for a specific location. The application provides information such as temperature, humidity, wind speed, sunrise, sunset, and weather description.

[<img src="assets/media/responsive-hero-update.png" alt="Weather Icon">](https://jeffdruid.github.io/weather-now/)

## Technologies Used

- HTML5
- CSS3
- Javascript
- OpenWeatherMap API
- Flags API
- Google Charts
- GSAP
- Python
- Flask
- Heroku
- Cors-Anywhere

## User Stories

| User Story                                                                                     | I Know I'm Done When...                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| As a user, I want to check the current weather for a specific city.                            | I can easily check the current weather for any city by entering the city name in the search box. The displayed information includes temperature, humidity, wind speed, and weather icons. |
| As a user, I want to view a 5-day weather forecast for a specific city.                        | I can explore a 5-day weather forecast for a selected city by clicking on the "Forecast" button. The application should display temperature and humidity trends for the specified city.   |
| As a user, I want to toggle between Celsius and Fahrenheit for temperature units.              | There is a temperature unit toggle button that allows me to switch between displaying temperatures in Celsius and Fahrenheit.                                                             |
| As a user, I want to view an interactive chart showing temperature and humidity trends.        | There is a "Chart" button that, when clicked, displays an interactive chart illustrating temperature and humidity trends for the 5-day forecast.                                          |
| As a user, I want to set a location as a favorite for quick access.                            | I can see a heart icon next to each location in the Weather App. Clicking the heart icon changes its color to red, indicating that the location has been set as a favorite.               |
| As a user, I want to view weather information for my favorite locations.                       | There is a "Favorites" button that, when clicked, displays weather information for all saved favorite locations.                                                                          |
| As a user, I want to toggle between light and dark mode for a personalized viewing experience. | There is a "Dark Mode" button that toggles between light and dark mode, providing a personalized viewing experience.                                                                      |
| As a user, I want to view my search history for quick reference.                               | There is a "Show History" button that, when clicked, displays a list of past searches for quick reference.                                                                                |
| As a user, I want to access the source code on GitHub.                                         | There is a GitHub icon or link that, when clicked, redirects me to the Weather App's source code on GitHub                                                                                |
| As a user, I want a visually appealing and responsive design.                                  | The application has a responsive layout that works well on different devices. The design is visually appealing, providing a seamless and enjoyable user experience.                       |

## Wireframe

![Wireframe Intro](assets/media/Wireframe-2.png)
|Mobile View|
|-|
|![Wireframe Mobile](assets/media/Wireframe-3.png)|

| Desktop View                                         |
| ---------------------------------------------------- |
| ![Wireframe Main Page](assets/media/Wireframe-1.png) |

## Features

### Header

|                                                 |                                                              |
| ----------------------------------------------- | ------------------------------------------------------------ |
| ![Header Section](assets/media/feat-header.png) | Displays the header section of the application and branding. |

### Animation Intro

|                                                      |                                                                                                     |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![Animation-Intro](assets/media/Animation-intro.gif) | A quick animation intro using the GSAP library to enhance the user experience upon loading he page. |
| ![GSAP code](assets/media/Animation-code.png)        | The animation was made by FLIP for GSAP - [CodePen](https://codepen.io/GreenSock/pen/eYdyVVe)       |

### Weather Container

|                                                               |                                                                                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ![Weather Container](assets/media/feat-weather-container.png) | Contains real-time Weather information, including temperature, humidity, wind speed and weather icons. |

|                                                          |                                                                                           |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| ![Heart Icon](assets/media/feat-favorite-icon.png)       | Allows users to add or remove locations from their favorites list. favorites              |
| ![Location Flag](assets/media/feat-flags-api.png)        | Flags API provides flags icons corresponding to the location's country..                  |
| ![Last Updated Time](assets/media/feat-last-updated.png) | Displays when the weather data was last updated.                                          |
| ![Refresh Button](assets/media/feat-refresh-btn.png)     | Allows user's to manually refresh weather information.                                    |
| ![Forecast Button](assets/media/btn-forecast-chart.png)  | Provides additional weather information, including a 5-day forecast and a forecast chart. |
| ![Temperature Toggle](assets/media/btn-temp-toggle.png)  | Enables user's to switch between Celsius and Fahrenheit temperature units.                |

### Current Weather:

- Displays real-time weather information such as current temperature, feels-like temperature, maximum and minimum temperatures, sunrise, sunset, wind speed and humidity. Requires location access to provide accurate data.

|                                                                   |                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Current Info](/assets/media/feat-current-info.gif)              | ~~Upon loading, the application will ask user to allow location in order to get your current location and display the weather.~~ _Now, it displays the weather information based on the user's last search. This change was made to prioritize user privacy and provide a seamless experience without requiring location access._                               |
| ![Error Location Access](/assets/media/error-location-access.png) | ~~Error Message displayed when the user's location is not available. But the user can still access the services of the website, and the footer displays the user's current time.~~ _This error message has been removed as the application no longer requires location access. Users can still access the website's services without providing their location._ |

### Search Functionality:

|                                                  |                                                                                            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| ![Search Feature](/assets/media/feat-search.png) | Enables users to search for weather information by entering a city name in the search box. |

### Temperature Units:

|                                                         |                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ![Temperature Toggle](assets/media/btn-temp-toggle.png) | Allows users to toggle between Celsius and Fahrenheit temperature units based on their preference. |

### 5-Day Forecast:

|                                                       |                                                                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| ![Forecast Container](assets/media/feat-forecast.png) | Provides a 5-day weather forecast, displaying temperature and humidity trends over the specific period. |

### Favorites:

|                                                                  |                                                                                                |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| ![Favorites Button](assets/media/feat-favorite-btn.png)          | Favorite Button                                                                                |
| ![Favorites Container](assets/media/feat-favorite-container.png) | Allow users to save favorite locations for quick access and easily check the weather for them. |
| ![Clear All Button](assets/media/btn-clear-favorites.png)        | Users can also clear all favorites from favorites container.                                   |

### Dark Mode:

|                                                                       |                                                                                                              |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| ![Dark Mode Button](assets/media/feat-dark-mode-btn.png)              | Dark Mode Button                                                                                             |
| ![Dark Mode - Main Page View](assets/media/feat-dark-mode-screen.png) | Allow users to toggle between light and dark mode for better visibility and personalized viewing experience. |

### Search History:

|                                                               |                                                                                          |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![History Button](assets/media/feat-history-btn.png)          | History Button                                                                           |
| ![History Container](assets/media/feat-history-container.png) | Displays user's search history, enabling quick reference to previous searched locations. |

### Side Bar:

|                                                                |                                                                                                                                   |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| ![Side Bar Button](assets/media/feat-side-bar-btn.png)         | Contains additional options such as Favorites, Dark Mode toggle, Search History and a Github link for easy navigation and access. |
| ![Side Bar on Desktop](assets/media/feat-side-bar-desktop.png) | Desktop View                                                                                                                      |
| ![Side Bar on Mobile](assets/media/feat-side-bar-mobile.png)   | Mobile View                                                                                                                       |

### Chart:

|                                                |                                                                                                                                                                                           |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Forecast Chart](assets/media/feat-chart.png) | Visualizes temperature and humidity trends with an interactive chart. Clicking on the "Chart" button displays a graphical representation of temperature and humidity for the next 5 days. |

### GitHub:

|                                                    |                                                                      |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| ![GitHub Button](assets/media/feat-github-btn.png) | Allows users to explore and contribute to the source code on GitHub. |

### Loading Screen

|                                                                                                                                       |                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Loading Spinner - Chart](assets/media/feat-loading-chart.gif) ![Loading Spinner - Forecast](assets/media/feat-loading-forecast.gif) | A loading spinner is displayed while the page loads content from the OpenWeatherMap API. |

### Error Handling

- Handles various error scenarios, including CORS issues, location access denial, and invalid or non-existent locations.
  - Displays informative error messages to guide users.

|                                                                             |                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Error 429 Message](assets/media/error-429.png)                            | Error Message displayed when user exceeds the request rate limit imposed by the server.                                                                                                                                                                                                                             |
| ![Unlock Server Access Button](assets/media/error-cors-access.png)          | Utilizes Cors-Anywhere to provide CORS access to the weatherKey flask app, where the API key is hidden.                                                                                                                                                                                                             |
| ![Error Message - Location Access](assets/media/error-location-access.png)  | ~~Error message displayed when user has not allowed location, user still able to use the functions of this website after this error.~~ _This error message has been removed as the application no longer requires location access. Users can still access the website's services without providing their location._ |
| ![Error Message - No Favorites Found ](assets/media/error-no-favorites.png) | Error message displayed when localStorage does not have any favorites saved.                                                                                                                                                                                                                                        |
| ![Error Message - No History Found](assets/media/error-no-history.png)      | Error message displayed when localStorage does not have any previously searched locations                                                                                                                                                                                                                           |
| ![Error Message - Invalid Location](assets/media/error-not-found.png)       | Error message displayed when a location is invalid or does not exist.                                                                                                                                                                                                                                               |

### Alerts

- Displays alerts for various scenarios such as attempting to refresh when already updated, clearing all favorites, accessing weather information without unlocking the server and sending too many requests in a short amount of time.

|                                                                        |                                                                                                   |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ![Alert - Already Updated](assets/media/alert-already-updated.png)     | Alert displayed if the user refreshes the page and the weather information is already up to date. |
| ![Alert - Clear All Favorites](assets/media/alert-clear-favorites.png) | Alert displayed when the user tries to clear all favorite locations.                              |
| ![Alert - Too Many Requests](assets/media/alert-too-many-requests.png) | Alert displayed if the user has sent too many requests in a short amount of time.                 |
| ![Alert - Unlock Server](assets/media/alert-unlock.png)                | Alert displayed when the user tries to access weather information without unlocking the server    |

### Footer

|                                         |                                                        |
| --------------------------------------- | ------------------------------------------------------ |
| ![Footer](assets/media/feat-footer.png) | The footer of the page displaying website information. |

### APIs

#### OpenWeatherMap

- The OpenWeatherMap API is utilized to fetch weather data for various locations.
  ![OpenWeatherMap - API Code](assets/media/feat-api-openweathermap.png)

- Fetching Weather Data: The function sends a fetch request to the OpenWeatherMap API endpoint (apiUrl) with the specified location.  
  ![Response - Fetch](assets/media/feat-api-fetch.png)

- Parsing Response Data: Once the response is received, it is parsed as JSON using response.json() to extract the weather data.
  ![Response - JSON](assets/media/feat-api-json.png)

#### Flags Api

- the Flags API is utilized to display the flag icon corresponding to the country code obtained from the weather data.
  - Constructing the Flag Icon URL:
    - The base URL for the Flags API is https://www.flagsapi.com/, followed by the country code obtained from the data.sys.country property in the weather data.
    - The URL also specifies the desired shape and size of the flag icon. In this case, the URL ends with /flat/32.png, which indicates a flat design with a size of 32x32 pixels.
  - Setting the Flag Icon Source:
    - The src attribute of the selected `<img>` element is set to the dynamically generated URL. This tells the browser where to fetch the flag icon image from.
      ![Flags - API Code](assets/media/feat-api-flags.png)

#### Google Charts

- Google Charts is used to visualize forecast data obtained from an API call.

  - Loading Google Charts Library:

    - The code dynamically creates a `<script>` element and sets its source attribute to load the Google Charts library from the URL https://www.gstatic.com/charts/loader.js.

    - Once the script is loaded, it triggers the onload event, which initializes the Google Charts library and specifies the packages to be loaded (corechart in this case) using `google.charts.load()`.

  - Fetching Forecast Data: - After the Google Charts library is loaded, it invokes the `google.charts.setOnLoadCallback()` function to execute the provided callback function.
    - Inside the callback function, it retrieves the location from the HTML element with the id location.
    - Then, it makes an API call to fetch the forecast data using the fetch() function with the specified API URL constructed based on the location.
      ![Google Charts - API Code](assets/media/feat-api-chart.png)

## Troubleshooting

### CORS Error
![Error - CORS](assets/media/error-cors.png)
- During the development of the application, CORS (Cross-Origin Resource Sharing) issues were encountered when making requests from the frontend to the backend.

  - Addressing CORS issues during the development of this JavaScript project proved to be a valuable learning experience. The use of CORS-anywhere as a workaround provided a practical solution to enable smooth communication between the frontend and backend during the initial stages of development.

- Cors-Anywhere Proxy Solution

  - To overcome these CORS challenges, a workaround using the CORS-anywhere proxy was implemented. CORS-anywhere is a simple HTTP proxy that allows cross-origin requests to be made from the frontend, bypassing the usual CORS restrictions.
    ![Server Access](assets/media/error-server-access.png)

### API Key

- This Flask application serves as a secure backend solution for handling API requests to OpenWeatherMap. By keeping the API key on the server side, we mitigate the risk of exposing sensitive information to the client-side.

  - During the early stages of development, the OpenWeatherMap API key was inadvertently exposed in the GitHub repository. Recognizing the security implications of such a practice, a decision was made to find an alternative solution. Inspired by Dan Hamilton's App on GitHub, a small Flask application was implemented to serve as a backend.

![Flak App](assets/media/FlaskApp.png)

- [WeatherKey - Source Code](https://github.com/jeffdruid/weatherKey)

### Remove User's Current Weather Information

- In consideration of user privacy and to optimize the application's performance by minimizing unnecessary API requests, the recent search feature has been enhanced to replace the user's current weather information with the most recent search.
  - ![Footer - Weather Information](assets/media/ui-footer.png)

## Testing

- A series of testing was made by using different online validators such as JigSaw, W3C, WAVE and JSLint.

### Validator Testing

#### HTML

- [W3C HTML Validator: No errors were found in the HTML.](https://validator.w3.org/nu/?doc=https%3A%2F%2Fjeffdruid.github.io%2Fweather-now%2F)
  ![Validator - HTML](assets/media/validator-html.png)

#### CSS

- [W3C CSS Validator: No errors were found in the CSS.](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fjeffdruid.github.io%2Fweather-now&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
  ![Validator - CSS](assets/media/validator-css.png)

#### JavaScript

- JSHint: No major issues were found in the JavaScript code.
  ![Validator - JavaScript](assets/media/validator-js.png)
  - Adding an Exception for Google Maps in JSLint
    - To prevent JSLint from flagging the `google` variable used in Google Maps code as an undeclared variable, the `/*global google*/` was used as directive.

-  JSHint: No major issues were found in the JavaScript code.
  ![Validator - JSHint](assets/media/validator-jshint.png)
    - Added `/*jshint esversion: 8*/`
      - This directive informs JSHint to recognize and allow ES8 syntax, preventing it from raising errors for features introduced in ES8.

#### Accessibility

- Tested accessibility using Lighthouse: Achieved a score of 100 for accessibility.
  ![LightHouse - Results](assets/media/validator-accessibility.png)
  - [Tested accessibility using WAVE tool with no errors detected.](https://wave.webaim.org/report#/https://jeffdruid.github.io/weather-now/)
    ![WAVE - Results](assets/media/validator-wave.png)

#### Lighthouse

- Lighthouse audits were performed to ensure performance, accessibility, best practices, and SEO optimization.
  ![LightHouse - Report](assets/media/validator-lighthouse.png)

### Responsiveness

- Tested responsiveness across various devices and screen sizes, including desktops, tablets, and mobile phones.
  ![Main Page in Different Screen Sizes](assets/media/responsive-hero.png)

### Manual Testing

- The manual testing conducted on the page includes the following aspects:

#### Cross-browser Compatibility

- Verified the functionality of the page across different web browsers to ensure it works properly and it is consistent.

#### Responsiveness and Device Compatibility

- Verified that the project displays correctly and functions appropriately across various device sizes, ensuring a good user experience.

#### Link Validation

- Verified all internal and external links to ensure they direct users to the intended destinations and open correctly without issues.

#### Text and Font Readability

- Verified that all text content and fonts used on the page are legible, clear, and easy to understand.

#### Acceptance Test

- Verified that the application meets the specified user stories and acceptance criteria.

The manual testing confirms that the page operates smoothly across multiple browsers, adapts well to different devices, ensures accurate link navigation, and maintains clear readability for users interacting with the content.

#### Desktop

| Edge - Version 121.0.2277.98                            | Chrome - Version 121.0.6167.140                             | Firefox - Version 120.0.1                                     |
| ------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| ![Desktop - Edge](assets/media/screen-desktop-edge.png) | ![Desktop - Chrome](assets/media/screen-desktop-chrome.png) | ![Desktop - Firefox](assets/media/screen-desktop-firefox.png) |

#### Tablet

| Edge - Version 120.0.2210.157                         | Chrome - Version 121.0.6167.101                           | Firefox - Version 122.0                                     |
| ----------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| ![Tablet - Edge](assets/media/screen-tablet-edge.jpg) | ![Tablet - Chrome](assets/media/screen-tablet-chrome.jpg) | ![Tablet - Firefox](assets/media/screen-tablet-firefox.jpg) |

#### Mobile

| Edge - Version 120.0.2210.157                        | Chrome - Version 121.0.6167.143                           | Firefox - Version 122.0.1                                   |
| ---------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| ![Mobile- Edge](assets/media/screen-mobile-edge.jpg) | ![Mobile - Chrome](assets/media/screen-mobile-chrome.jpg) | ![Mobile - Firefox](assets/media/screen-mobile-firefox.jpg) |

## Bugs

|                                                                                                                                                    |                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Temperature not displaying the correct unit when toggle is activated. Error occurs when temperature is F and the user searches for a new location. | ![Bug - Temperature units](assets/media/bug-temp-unit.png) |
|Previous chart being displayed while current chart is being load|![Bug - Chart Load](assets/media/bug-chart-load.gif)|

### Fixed Bugs

- Detailed various bugs encountered during development and their resolutions.

|                                            |                                                           |
| ------------------------------------------ | --------------------------------------------------------- |
| Dark Mode not toggling properly on mobile. | ![Side Bar - Blocked](assets/media/ui-side-bar-after.png) |

- Increased the `z-index: 9;` to ensure the Side Bar Button displays on top of the Side Bar.

|                                                       |                                                            |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| Animation not in full screen after page is refreshed. | ![Animation - Bug](assets/media/bug-animation-refresh.png) |

- Adjust the Header and Main container properties to default `display: none`, setting them to `display: flex` at the end of the animation.

  - Also, set Main container default `height: 0;` and adjusted it to `height: 100%` at the end of animation.

|                                                  |                                                                    |
| ------------------------------------------------ | ------------------------------------------------------------------ |
| Display CORS button only when status 403 occurs. | ![Unlock Server Access Button](assets/media/error-cors-access.png) |

- Moved the following code inside the getWeather function to check `if (response.status === 403)`.
  `unlockButton.addEventListener("click", function () {
  window.open("https://cors-anywhere.herokuapp.com/corsdemo", "_blank");
  unlockButton.style.display = "none";
});
document.body.appendChild(unlockButton);`

- Update the current time displayed in the footer to show the location's current time instead of the user's current time.
  - ![Location Current Time - Code](assets/media/bug-time.png)
    - Modified the code to display the location's current time instead of the user current location.

## UI Improvements

- Suggested enhancements to the user interface to improve usability, accessibility, and visual appeal:

- Fixed Padding on mobile screens for the CORS Button.
  ![Cors Button - Before](assets/media/ui-cors-btn-before.png)
- Added the `padding:1.5rem;` to the CORS button for mobile screens.
  ![Cors Button - After](assets/media/ui-cors-btn.png)

|                                           |                                                     |
| ----------------------------------------- | --------------------------------------------------- |
| Increased readability of footer elements. | ![Footer - Larger Text](assets/media/ui-footer.png) |

- Increased to `font-size: .75rem;`

|                                                                                                          |                                                           |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Fixed Header for better readability and contrast.                                                        | ![Header - Text Shadow](assets/media/ui-header-after.png) |
| Updated header with a modern banner design created using Canva AI for a refreshed and contemporary look. | ![Header - Update](assets/media/ui-header-update.png)     |

- Added `text-shadow: 4px 4px 4px var(--primary-color);`
- Added `box-shadow: 0 8px 10px rgba(0, 0, 0, 1);`
- Added `background-color: rgba(0, 0, 0, .5);`

|                                                                                          |                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| ~~Default Side Bar to open in order to fill white space when the page is first loaded.~~ | ![Side Bar - Mobile View](assets/media/feat-side-bar-mobile.png) |

- ~~Modified Side Bar to `display: none;` and after the animation intro `display:flex;`~~
  - This update was reverted to the original state as the instruction page was added.

|                                                           |                                                  |
| --------------------------------------------------------- | ------------------------------------------------ |
| Added padding to :hover elements in Favorites and History | ![Hover effect](assets/media/ui-hover-after.png) |

- Added `padding: 0.75rem` to both Favorites and History elements when hovered.

|                         |                                                        |
| ----------------------- | ------------------------------------------------------ |
| Shorter Animation intro | ![Animation Intro - Update](assets/media/ui-intro.gif) |

- Reduced the delay from `gsap.delayedCall(curLayout === 0 ? 3.5 : 1.5, nextState);` to `gsap.delayedCall(curLayout === 0 ? 0.25 : 0.9, nextState);`

|                                                                 |                                                                       |
| --------------------------------------------------------------- | --------------------------------------------------------------------- |
| Fixed toggle buttons                                            | ![Forecast/Chart - Button](assets/media/btn-forecast-chart.png)       |
| Updated buttons to improve the visual clarity of toggle buttons | ![Forecast/Chart - Button Update](assets/media/ui-buttons-update.png) |

|                                                                               |                                                             |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Added instructions to help the user understand how to start using the app.    | ![Tour Page](assets/media/feat-tour.png)                    |
| Also added a button for easy access in the side bar.                          | ![Tour Button](assets/media/btn-instructions.png)           |
| Added an Information section to help user to navigate the page - Desktop View | ![Information Page](assets/media/feat-tour-info.png)        |
| Added an Information section to help user to navigate the page - Mobile View  | ![Information Page](assets/media/feat-tour-info-mobile.png) |
| Also added a button for easy access in the side bar.                          | ![Information Button](assets/media/btn-info.png)            |

## Future Improvements

- Outlined potential future enhancements and features to be implemented in subsequent versions of the application:

### Map Integration:

- Plan to add a map feature that shows the location of the city.

### Autocomplete:

- Implement autocomplete functionality for the search box.

### User Interface:

- Enhance the user interface with animations and updated weather icons.

### Cache Data

- Use cache to store the weather data.
  - This cache feature aims to optimize data retrieval processes by locally storing previously fetched weather information.
    - By utilizing cache storage, the application can reduce reliance on external API calls and minimize response times.

### Color code the temperature.

- Color-coded temperature representation helps the user with a better data visualization and enhancing experience within the Weather Now application.

## Deployment

### Cloning & Forking

#### Forking a Repository

1. Visit [Weather Now](https://github.com/jeffdruid/weather-now).
2. Click on the "Fork" button located in the top-right corner of the page.
3. Optionally, you can provide a description for your fork.
4. Select "Create fork". You will be redirected to your newly created forked repository.

#### Cloning a Repository

1. Navigate to the repository on Github and click the "Code" button located above the list of files.
2. Click on thee "Code" button and copy the repository's URL.
3. Open your Terminal application on your computer and change the directory to where you want the cloned directory.
4. Enter the command "git clone" followed by the repository's URL. This downloads a copy of the repository into your local machine.

### Local Deployment

1. Sign up for [Gitpod](https://www.gitpod.io/) using your GitHub account.
2. Install the Gitpod browser extension to access Gitpod from GitHub. You can find the extension [here](https://www.gitpod.io/docs/browser-extension/).
3. Go to the [Weather Now](https://github.com/jeffdruid/weather-now).
4. Click on the "GitPod" button above the list of files in the repository on GitHub. This opens Gitpod workspace using the repository.

### Remote Deployment

To deploy the site on Github Pages after forking or cloning:

1. Go to your repository on GitHub.
2. Click on the "Settings" tab on the top of your repository.
3. In the left sidebar, click on the "Pages" tab.
4. Under the "Build and Deployment" section, select "main" from the source drop-down list and click on the "Save" button.
5. The page will display the link to the deployed website. You wil see a green success message indicating that your site is published at the specific URL.

You can access the live link here : [Weather Now](https://jeffdruid.github.io/weather-now/#/)

## Credits

### Source code

- [Google Charts](https://developers.google.com/chart)
- [Glass Effect](https://webdesign.tutsplus.com/how-to-create-a-frosted-glass-effect-in-css--cms-32535t)
- [Search Icon inside input box](https://nikitahl.com/search-icon-inside-input)
- [Openweather API, time always in my local time zone](https://stackoverflow.com/questions/60627245/openweather-api-time-always-in-my-local-time-zone)
- [localStorage](https://www.w3schools.com/jsref/prop_win_localstorage.asp)
- [Handle CORS Client-side](https://gist.github.com/jesperorb/6ca596217c8dfba237744966c2b5ab1e)
- [Flip for GSAP](https://codepen.io/GreenSock/pen/eYdyVVe)
- [Dan Hamilton](https://github.com/dlhamilton/weatherAPITest/blob/main/run.py)
- [Cors-Anywhere](https://github.com/Rob--W/cors-anywhere)
- [HTML Web Storage API](https://www.w3schools.com/html/html5_webstorage.asp)
- [Marquee feature](https://codepen.io/notkieran/pen/jVmWNY)

### Icons

- [Yusuf önaldı](https://freedesignresources.net/34-weather-icon-pack/)
- [Font Awesome](https://fontawesome.com)

### Images

- [Placeholder - image from pngtree.com](https://pngtree.com/element/down?id=NjM5ODI2Ng==&type=1&time=1706706114&token=MTZmZDg0ZWMzNzQ0NDYwNWI5ZmE0MGRkMmNkOWZjZjk=&t=0)
- [Banner2 - Canva AI](https://www.canva.com/)

### Useful Links

- [Open Weather Map](https://openweathermap.org/)
- [Country Flags](https://flagsapi.com/)
- [How to Convert Celsius to Fahrenheit (°C to °F)](https://www.thoughtco.com/celcius-to-farenheit-formula-609227)
- [Convert temperatures to and from celsius, fahrenheit](https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-11.php)
- [Hide API key](https://jessicawatts-95014.medium.com/hiding-api-keys-js-656290a1132c)
- [Dave Gray - Hiding API Keys in Javascript Netlify](https://www.youtube.com/watch?v=2J3xbMkH2K4)
- [Free Frontend](https://freefrontend.com/css-input-text/)
- [JavaScript Regular Expressions](https://www.w3schools.com/js/js_regexp.asp)
