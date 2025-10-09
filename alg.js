function alg(route) {
    //for debugging purposes, mostly
    console.log(route);

    // the actual route given by the API
    const path = route.routes[0].legs[0];

    //custom number formatter
    const format = n => "$" + Math.trunc(n * 100) / 100;

    // conversion factor for meters and miles
    const mToMi = 1609;

    // dollars/mile
    const costPerMile = .7;

    // in dollars/min (same as $15/hr) 
    const minimumWage =  15;
    
    // delay is originally in seconds
    // it's being converted into hours
    const delay = (path.duration_in_traffic.value - path.duration.value) / 3600;

    // this is being converted from meters
    const distance = path.distance.value / mToMi;

    const drivingCost = costPerMile * distance;

    const timeDelayCost = delay * minimumWage;
    
    const totalCost = drivingCost + timeDelayCost;

    return format(totalCost);
}