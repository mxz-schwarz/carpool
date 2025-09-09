window.addEventListener("load",init);
document.getElementById("go").addEventListener("click",run);
const failStr = "Google Maps API request failed. Please try again later.";
let directionsService;

function initMap() {
    directionsService = new google.maps.DirectionsService();
}

function run() {
    const res = document.getElementById(result);
    const route = buildRoute();
    let result;
    directionsService.route(route, (response, status) => {
        if (status === 'OK') {
            result = alg(response);
        } else {
            alert(failStr);
            result = failStr;
        }
    });
    res.textContent = "Max cost to carpool: "+result;
}

function buildRoute() {
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    const route = {};
    route.origin = start.value;
    route.destination = end.value;
    route.travelMode = google.maps.TravelMode.DRIVING;
    const dOptions = {};
    route.drivingOptions = dOptions;
    dOptions.departureTime = getTime();
    return route;
}

function getTime() {
    const amPM = document.getElementById("a/p");
    const hrs = document.getElementById("hrs");
    const mins = document.getElementById("mins");
    const date = nearestDay();
    date.setHours(parseInt(hrs.value)-1+parseInt(amPM.value));
    date.setMinutes(parseInt(mins.value));
    return date;
}

function nearestDay() {
    const day = document.getElementById("day");
    const d = parseInt(day.value);
    const date = new Date();
    const dayDif = d-date.getDay();
    date.setDate(date.getDate()+dayDif);
}

function init() {
    setupDays();
    setupHrs();
    setupMins();
}

function setupDays() {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    for (const d of days) {
        const option = document.createElement("option");
        option.innerText = d;
        option.value = days.indexOf(d);
        day.appendChild(option);
    }
}

function setupHrs() {
    const hrs = document.getElementById("hrs");
    for (let i=1; i<=12; i++) {
        const option = document.createElement("option");
        option.innerText = String(i).padStart(2,"0");
        option.value = i;
        hrs.appendChild(option);
    }
}

function setupMins() {
    const mins = document.getElementById("mins");
    for (let i=0; i<60; i+=5) {
        const option = document.createElement("option");
        option.innerText = String(i).padStart(2,"0");
        option.value = i;
        mins.appendChild(option);
    }
}