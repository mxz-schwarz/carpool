function alg(route) {
    //for debugging purposes, mostly
    console.log(route);

    //custom number formatter
    const format = n => "$"+Math.trunc(n*100)/100;

    // conversion factor for meters and miles
    const mToMi = 1609;

    // dollars/mile
    const costPerMile = .7;

    // in dollars/min (same as $15/hr) 
    const minimumWage =  .25;

    /*
    * 0 will be replaced with
    * something sensible later
    * I'm assuming that delay
    * will be in minutes.
    */
   
    // delay refers to the delay 
    // relative to the normal time
    // (i.e. when there's no traffic)
    const delay = 0;

    // this is being converted from meters
    const distance = route.routes[0].legs[0].distance.value/mToMi;

    const drivingCost = costPerMile*distance;

    const timeDelayCost = delay*minimumWage;
    
    const totalCost = drivingCost + timeDelayCost;

    return format(totalCost);
}