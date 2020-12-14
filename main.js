function makeRequest(location) {
    return new Promise((accept, decline) => {
        console.log(`Making request to ${location}`);
        if (location === 'Google') {
            accept('Google Say Hi!')
        } else {
            decline('We can only talk to Google')
        }
    })
}

function processRequest(response) {
    return new Promise((accept, decline) => {
        console.log('Processing Request');
        accept(`Extra information ${response}`)
    })
}

// makeRequest('Google').then(response => {
//     console.log(`Response recieved`);
//     return processRequest(response);
// }).then(processingRequest => {
//     console.log(processingRequest);
// }).catch( err => {
//     console.log(err);
// })

async function doWork() {
    try {
        const response = await makeRequest('Facebook')
        console.log('Response recieved');
        const processedRequest = await processRequest(response)
        console.log(processedRequest);
    } catch (err) {
        console.log(err);
    }
}

doWork()