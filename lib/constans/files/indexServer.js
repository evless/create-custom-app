const indexServer = `const http = require('http');
const config = require('config');

http.createServer(function(req, res) {
    switch (req.url) {
        case '/':
            res.statusCode = 200;
            res.end('Hellow World!');
            break;
        default:
            res.statusCode = 404;
            res.end('Not Found');
    }
}).listen(config.port);`;

export default indexServer;