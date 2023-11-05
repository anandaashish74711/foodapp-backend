const http = require('http');
const fs = require('fs');
const_=require('lodash');
const server = http.createServer((req, res) => {
    console.log("Request has been made from browser to server");

    let path = './views';

    switch (req.url) {
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/aboutus':
            path += '/aboutus.html';
            res.statusCode = 200;
            break;
        case '/about':
            res.statusCode = 301;
            res.setHeader('Location', '/aboutus');
            res.end();
            return; // Added return to prevent further execution
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, fileData) => {
        if (err) {
            console.log(err);
            res.end(); // Make sure to end the response even if there's an error
        } else {
            res.write(fileData);
            res.end();
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on port 3000');
});