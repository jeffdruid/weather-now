function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    document.getElementById("location").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

getLocation();
