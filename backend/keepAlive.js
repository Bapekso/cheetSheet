const http = require('http');

function keepAlive() {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
    });

    req.on('error', (error) => {
        console.error('Błąd podczas wysyłania żądania:', error);
    });

    req.end();
}

module.exports = keepAlive;
