# [Weather Now](https://jeffdruid.github.io/weather-now/#/)
Weather Now is a web application that provides real-time weather information for any location worldwide. 

![Animation-Intro](assets/media/Animation-intro.gif)

## Table of Contents
<!-- TODO - Update table -->
1. [Introduction](#introduction)
1. [Technologies Used](#technologies-used)
1. [User Stories](#user-stories)
1. [Wireframe](#wireframe)
1. [Features](#features)
    - [Index](#index)
1. [Testing](#testing)
    - [Validator Testing](#validator-testing)
        - [HTML](#html)
        - [CSS](#css)
        - [Javascript](#javascript)
    - [Accessibility](#accessibility)
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
    - [Bugs](#bugs)
        - [Fixed Bugs](#fixed-bugs)
    - [UI Improvements](#ui-improvements)
    - [Future Improvements](#future-improvements)
1. [Deployment](#deployment)
    - [Cloning & Forking](#cloning--forking)
    - [Local Deployment](#local-deployment)
    - [Remote Deployment](#remote-deployment)
1. [Credits](#credits)
    - [Source Code](#source-code)
    - [Icons](#icons)
    - [Videos](#videos)
    - [Images](#images)
    - [Useful links](#useful-links)

## Introduction
- Weather Now is an application that allows users to get the current weather and 5-day forecast for a specific location. The application provides information such as temperature, humidity, wind speed, sunrise, sunset, and weather description.

[<img src="assets/media/responsive-hero.png" alt="Weather Icon">](https://jeffdruid.github.io/weather-now/)

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
<!-- TODO - Create a table -->
| User Story | I Know I'm Done When... |
|------------|-------------------------|
| As a user, I want to check the current weather for a specific city. | I can easily check the current weather for any city by entering the city name in the search box. The displayed information includes temperature, humidity, wind speed, and weather icons.|
| As a user, I want to view a 5-day weather forecast for a specific city. | I can explore a 5-day weather forecast for a selected city by clicking on the "Forecast" button. The application should display temperature and humidity trends for the specified city.|
| As a user, I want to toggle between Celsius and Fahrenheit for temperature units. | There is a temperature unit toggle button that allows me to switch between displaying temperatures in Celsius and Fahrenheit.|
| As a user, I want to view an interactive chart showing temperature and humidity trends. | There is a "Chart" button that, when clicked, displays an interactive chart illustrating temperature and humidity trends for the 5-day forecast.|
| As a user, I want to set a location as a favorite for quick access. | I can see a heart icon next to each location in the Weather App. Clicking the heart icon changes its color to red, indicating that the location has been set as a favorite.|
| As a user, I want to view weather information for my favorite locations. | There is a "Favorites" button that, when clicked, displays weather information for all saved favorite locations.|
| As a user, I want to toggle between light and dark mode for a personalized viewing experience. | There is a "Dark Mode" button that toggles between light and dark mode, providing a personalized viewing experience.|
| As a user, I want to view my search history for quick reference. | There is a "Show History" button that, when clicked, displays a list of past searches for quick reference.|
| As a user, I want to access the source code on GitHub. | There is a GitHub icon or link that, when clicked, redirects me to the Weather App's source code on GitHub|
| As a user, I want a visually appealing and responsive design. | The application has a responsive layout that works well on different devices. The design is visually appealing, providing a seamless and enjoyable user experience.|

## Wireframe
<!-- TODO -->
![Alt text](assets/media/Wireframe-2.png)

![Alt text](assets/media/Wireframe-1.png)
### Features
- TODO create a table

| Feature | Description |
|---------|-------------|
| Header  | Displays the header section of the application. |
- TODO
![Alt text](assets/media/feat-header.png) 

### Animation Intro
![Animation-Intro](assets/media/Animation-intro.gif)
![Alt text](assets/media/Animation-code.png)

### Weather Container
- TODO
![Alt text](assets/media/feat-weather-container.png)

#### Buttons
![Alt text](assets/media/feat-favorite-icon.png) 
![Alt text](assets/media/feat-flags-api.png) 
![Alt text](assets/media/feat-last-updated.png) 
![Alt text](assets/media/feat-refresh-btn.png) 
![Alt text](assets/media/btn-forecast-chart.png) 

### Current Weather: 
- Get real-time weather information such asn current temperature, feels-like temperature, maximum and minimum temperatures, sunrise, sunset, wind speed, humidity, and more.
- Upon loading, the application will attempt to get your current location and display the weather.
![Current Info](/assets/media/feat-current-info.gif)

![Error Location Access](/assets/media/error-location-access.png)

### Search Functionality: 
- Enter a city name in the search box to retrieve weather details for any specific location.
![Search Feature](/assets/media/feat-search.png)

### Temperature Units: 
- Toggle between Celsius and Fahrenheit units to view temperature information according to your preference.
![Alt text](assets/media/btn-temp-toggle.png) 

### 5-Day Forecast:
- Plan ahead with a 5-day weather forecast, displaying temperature and humidity trends.
![Alt text](assets/media/feat-forecast.png) 

### Favorites:
- Save your favorite locations and easily check the weather for them.
![Alt text](assets/media/feat-favorite-btn.png) 
![Alt text](assets/media/feat-favorite-container.png) 
![Alt text](assets/media/btn-clear-favorites.png) 

### Dark Mode:
- Toggle between light and dark mode for better visibility.
![Alt text](assets/media/feat-dark-mode-btn.png) 
![Alt text](assets/media/feat-dark-mode-screen.png) 

### Search History:
- View your search history to quickly revisit previous locations.
![Alt text](assets/media/feat-history-btn.png) 
![Alt text](assets/media/feat-history-container.png) 

### Side Bar:
- The side bar contains additional options such as Favorites, Dark Mode toggle, Search History and Github link.
![Alt text](assets/media/feat-side-bar-btn.png) 
![Alt text](assets/media/feat-side-bar-desktop.png) 
![Alt text](assets/media/feat-side-bar-mobile.png) 

### Chart:
- Visualize temperature and humidity trends with an interactive chart. Click on the "Chart" button to view a graphical representation of temperature and humidity for the next 5 days.
![Alt text](assets/media/feat-chart.png) 


### GitHub:
- Explore and contribute to the source code on GitHub.
![Alt text](assets/media/feat-github-btn.png) 

### Loading Screen
- TODO
![Alt text](assets/media/feat-loading-chart.gif) 
![Alt text](assets/media/feat-loading-forecast.gif) 

### Error Handling
![Alt text](assets/media/error-429.png) 
![Alt text](assets/media/error-cors-access.png) 
![Alt text](assets/media/error-location-access.png) 
![Alt text](assets/media/error-no-favorites.png) 
![Alt text](assets/media/error-no-history.png) 
![Alt text](assets/media/error-not-found.png)

### Alerts
![Alt text](assets/media/alert-already-updated.png) 
![Alt text](assets/media/alert-clear-favorites.png) 
![Alt text](assets/media/alert-too-many-requests.png)

### Footer
- TODO
![Alt text](assets/media/feat-footer.png) 

### API Key
- TODO
![Alt text](assets/media/FlaskApp.png)
- [Source Code](https://github.com/jeffdruid/weatherKey)

## Testing
<!-- TODO -->
### Validator Testing
#### HTML
![Alt text](assets/media/validator-html.png) 
#### CSS
![Alt text](assets/media/validator-css.png)
#### JavaScript
![Alt text](assets/media/validator-js.png) 

#### Accessibility
![Alt text](assets/media/validator-accessibility.png)
#### Lighthouse
![Alt text](assets/media/validator-lighthouse.png)

### Responsiveness
![Alt text](assets/media/responsive-hero.png)

### Manual Testing
####

#### Desktop
#### Tablet
#### Mobile

## Bugs
<!-- TODO -->


### Fixed Bugs
<!-- TODO -->
- Dark Mode not toggling properly on mobile.
- Cors Access - Cors-Anywhere

## UI Improvements
<!-- TODO -->
- Color code the temperature.
- Fix Header

## Future Improvements

### Map Integration: 
- Plan to add a map feature that shows the location of the city.

### Autocomplete: 
- Implement autocomplete functionality for the search box.

### User Interface: 
- Enhance the user interface with animations and updated weather icons.

### Cache Data
- TODO
- Use cache to store the weather data. (Future feature)

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

<!-- ### Local Deployment
<!-- TODO -->
1. Sign up for [Gitpod](https://www.gitpod.io/) using your GitHub account.
2. Install the Gitpod browser extension to access Gitpod from GitHub. You can find the extension [here](https://www.gitpod.io/docs/browser-extension/).
3. Go to the [Weather Now](https://github.com/jeffdruid/weather-now).
4. Click on the "GitPod" button above the list of files in the repository on GitHub. This opens Gitpod workspace using the repository. -->

### Remote Deployment
<!-- TODO -->
To deploy the site on Github Pages ...

You can access the live link here : [Weather Now](https://jeffdruid.github.io/weather-now/#/)
## Credits

### Source code 
<!-- TODO - Categorize -->
- [Open Weather Map](https://openweathermap.org/)
- [Google Charts](https://developers.google.com/chart)
- [Free Frontend](https://freefrontend.com/css-input-text/)
- [Yusuf önaldı](https://freedesignresources.net/34-weather-icon-pack/)
- [Glass Effect](https://webdesign.tutsplus.com/how-to-create-a-frosted-glass-effect-in-css--cms-32535t)
- [Font Awesome](https://fontawesome.com)
- [search Icon inside input box](https://nikitahl.com/search-icon-inside-input)
- [How to Convert Celcius to Fahrenheit (°C to °F)](https://www.thoughtco.com/celcius-to-farenheit-formula-609227)
- [Convert temperatures to and from celsius, fahrenheit](https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-11.php)
- [Openweather API, time always in my local time zone](https://stackoverflow.com/questions/60627245/openweather-api-time-always-in-my-local-time-zone)
- [localStorage](https://www.w3schools.com/jsref/prop_win_localstorage.asp)
- [HTML Web Storage API](https://www.w3schools.com/html/html5_webstorage.asp)
- [Country Flags](https://flagsapi.com/)
- [JavaScript Regular Expressions](https://www.w3schools.com/js/js_regexp.asp)
- [Marquee feature](https://codepen.io/notkieran/pen/jVmWNY)
- [Hide API key](https://jessicawatts-95014.medium.com/hiding-api-keys-js-656290a1132c)
- [Dave Gray - Hiding API Keys in Javascript Netlify](https://www.youtube.com/watch?v=2J3xbMkH2K4)
- [Handle CORS Client-side](https://gist.github.com/jesperorb/6ca596217c8dfba237744966c2b5ab1e)
- [Flip for GSAP](https://codepen.io/GreenSock/pen/eYdyVVe)
- [Placeholder - image from pngtree.com](https://pngtree.com/element/down?id=NjM5ODI2Ng==&type=1&time=1706706114&token=MTZmZDg0ZWMzNzQ0NDYwNWI5ZmE0MGRkMmNkOWZjZjk=&t=0)