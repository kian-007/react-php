const Request = (path) => {
    // path = JSON.stringify(path);
    const requestapi = async (path) => {
        let response = await fetch(path)
        response = await response.json()
        return response;
    }
    return requestapi(path)
}


const RestFulApi = (path) => {
    let finalResponse = Request(path);
    let thenProm = finalResponse.then(function (value) {
        console.log("sucsessfull respnse: ", JSON.stringify(value));
        // return JSON.stringify(value);
        return value
    });

    finalResponse.catch(function (reason) {
        // console.log("rejected response ", reason);
        console.log("rejected response ", JSON.stringify(reason));
    });

    return thenProm;
}


export { Request, RestFulApi };