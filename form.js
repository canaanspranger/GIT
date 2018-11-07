"use strict";
var zIndexCounter;
var pos = [];
var origin;
var waitForUser;

// configure page to display Setup content


// configure page to display Directions content
function loadDirections(string) {
   document.getElementById("location").style.display = "block";
    if (typeof google !== 'object') {
        var script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCmAcxFzK_EAS0soIFLHIU5IwiInD-8UsE&callback=geoTest";
        document.body.appendChild(script);
    }
}

// run setUpPage() function when page finishes loading
window.addEventListener("load", loadDirections, false);

function geoTest() {
    waitForUser = setTimeout(fail, 10000);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(createDirections, fail, {timeout: 10000});
    } else {
        fail();
    }
}

function createDirections(position) {
    clearTimeout(waitForUser);
    document.getElementById("lng").innerHTML = ("Longitude: " + position.coords.longitude);
    document.getElementById("lat").innerHTML = ("Latitude: " + position.coords.latitude);
    var currPosLat = position.coords.latitude;
    var currPosLng = position.coords.longitude;
    var mapOptions = {
        center: new google.maps.LatLng(currPosLat, currPosLng), 
        zoom: 12
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
function fail() {
    //console.log("Geolocation information not available or not authorized.");
    document.getElementById("map").innerHTML = "Unable to access your current location.";
}