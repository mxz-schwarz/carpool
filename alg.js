function alg(route) {
    // conversion factor for units
    const mToMi = 1609;

    // dollars/mile
    const costPerMile = .7;

    // dollars/hour
    const minimumWage =  15;

    //for debugging purposes, mostly
    console.log(route);

    // this is being converted from meters
    const distance = route.routes[0].legs[0].distance.value/mToMi

    
    return "$"+Math.trunc(costPerMile*distance*100)/100;
}