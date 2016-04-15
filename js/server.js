var http = require('http');

var PORT = 3000;

var server = http.createServer();

server.listen(PORT);

console.log('Server is running on port: ' + PORT);
