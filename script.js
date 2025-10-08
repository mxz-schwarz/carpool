window.addEventListener('load',init);
document.getElementById('go').addEventListener('click',run);
document.getElementById('useNow').addEventListener('click',()=>{useNow=true});
const failStr = 'Google Maps API request failed. Please try again later.';
let directionsService;
let useNow = false;

function initMap() {
    directionsService = new google.maps.DirectionsService();
}

function run() {
    const res = document.getElementById('result');
    const route = buildRoute();
    let result;
    directionsService.route(route, (response, status) => {
        if (status === 'OK') {
            result = alg(response);
        } else {
            result = failStr;
            alert(failStr);
        }
        res.textContent = 'Max cost to carpool: ' + result;
    });
}

function buildRoute() {
    const route = {};
    route.origin = document.getElementById('start').value;
    route.destination = document.getElementById('end').value;
    route.travelMode = google.maps.TravelMode.DRIVING;
    route.drivingOptions = {
        departureTime : useNow ? new Date() : getTime(),
        trafficModel : google.maps.TrafficModel.BEST_GUESS
    };

    // useNow is being reassigned for the next request
    useNow = false;

    return route;
}

function getTime() {
    const amPM = document.getElementById('a/p');
    const hrs = document.getElementById('hrs');
    const mins = document.getElementById('mins');

    const d = parseInt(document.getElementById('day').value);
    const date = new Date();
    // setDate and getDate aren't being used because 
    // they don't behave very nicely when the month changes.
    date.setTime(date.getTime() + (d - date.getDay())*24*60*60*1000 );

    // amPM.value stores 0 for AM and 12 for PM.
    // note that this is not the same as the text.
    date.setHours(parseInt(hrs.value)+parseInt(amPM.value));
    date.setMinutes(parseInt(mins.value));

    if (date.getTime()<Date.now())
        date.setTime(date.getTime()+7*24*60*60*1000);
    
    return date;
}

function init() {
    setupDays();
    setupHrs();
    setupMins();
}

function setupDays() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const day = document.getElementById('day');
    for (const d of days) {
        const option = document.createElement('option');
        option.innerText = d;
        option.value = days.indexOf(d);
        day.appendChild(option);
    }
}

function setupHrs() {
    const hrs = document.getElementById('hrs');
    for (let i=1; i<=12; i++) {
        const option = document.createElement('option');
        option.innerText = String(i).padStart(2,'0');
        option.value = i;
        hrs.appendChild(option);
    }
}

function setupMins() {
    const mins = document.getElementById('mins');
    for (let i=0; i<60; i+=5) {
        const option = document.createElement('option');
        option.innerText = String(i).padStart(2,'0');
        option.value = i;
        mins.appendChild(option);
    }
}