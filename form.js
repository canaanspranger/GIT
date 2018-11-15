"use strict";
var waitForUser;
var sunriseReport;
var httpRequest = false;
function getRequestObject() {
try {
    httpRequest = new XMLHttpRequest();
}
    catch (requestError) {
        document.querySelector("p.error").innerHTML = "Sunrise / Sunset not supported by your browser.";
        document.querySelector("p.error").style.display = "block";
        return false;
    }
    return httpRequest;
}
function loadSunrise(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    
   document.getElementById("location").style.display = "block";
    if (typeof google !== 'object') {
        var script = document.createElement("script");
        script.src = "https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + "&callback=findSunrise";
        document.body.appendChild(script);
    }
}

window.addEventListener("load", geoTest, false);

function geoTest() {
    waitForUser = setTimeout(findSunrise, 10000);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(loadSunrise);
    } else {
        
    }
}

function findSunrise(sunriseReport) {
    if(httpRequest.readyState === 4 && httpRequest.status === 200){
        sunriseReport = JSON.parse(httpRequest.responseText)
    }
    var sunrise = document.getElementById("sunrise").innerHTML = sunriseReport.results.sunrise;
    var sunset = document.getElementById("sunset").innerHTML = sunriseReport.results.sunset;
}

function fail() {
    //console.log("Geolocation information not available or not authorized.");
    document.getElementById("error").innerHTML = "Unable to access your current location.";
}