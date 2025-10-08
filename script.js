window.addEventListener("load",init);
document.getElementById("go").addEventListener("click",run);
const failStr = "Google Maps API request failed. Please try again later.";
let directionsService;

function initMap() {
    directionsService = new google.maps.DirectionsService();
}

function run() {
    const res = document.getElementById("result");
    const route = buildRoute();
    let result;
    directionsService.route(route, (response, status) => {
        if (status === 'OK') {
            result = alg(response);
        } else {
            result = failStr;
            alert(failStr);
        }
        res.textContent = "Max cost to carpool: "+result;
    });
}

function buildRoute() {
    const route = {};
    route.origin = document.getElementById("start").value;
    route.destination = document.getElementById("end").value;
    route.travelMode = google.maps.TravelMode.DRIVING;
    route.drivingOptions = {
        departureTime : getTime(),
        trafficModel : google.maps.TrafficModel.BEST_GUESS
    };
    return route;
}

function getTime() {
    const amPM = document.getElementById("a/p");
    const hrs = document.getElementById("hrs");
    const mins = document.getElementById("mins");
    const date = nearestDay();

    //amPM.value stores 0 for AM and 12 for PM.
    //note that this is not the same as the text.
    date.setHours(parseInt(hrs.value)+parseInt(amPM.value));
    
    date.setMinutes(parseInt(mins.value));
    
    return date;
}

function nearestDay() {
    const d = parseInt(document.getElementById("day").value);
    const date = new Date();
    date.setDate(date.getDate()+(7+d-date.getDay())%7);
    return date;
}

function init() {
    setupDays();
    setupHrs();
    setupMins();
}

function setupDays() {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = document.getElementById("day");
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