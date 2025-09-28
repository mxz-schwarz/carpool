function alg(route) {
    const mToMi = 1609;
    console.log(route);
    return .7*Number(route.routes[0].legs[0].distance.value)/1609;
}