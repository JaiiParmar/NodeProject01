const http = require('http');

const routes = require('./routes')

// function rqlistener(req, res) {

// }
// http.createServer(rqlistener);

//Anonymous Function.
const server = http.createServer(routes);


server.listen(3000);
