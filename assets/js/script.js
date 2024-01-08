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
