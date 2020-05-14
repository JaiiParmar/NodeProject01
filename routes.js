const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title> Enter Message </title></head>');
        res.write('<body>');
        res.write('<form action="/message" method="POST">');
        res.write('<input type="text" name="message"><button type="submit">SEND</button>');
        res.write('</form >')
        res.write('</body>');
        res.write('</html>')
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })

        req.on('end', () => {

            const parsedBody = Buffer.concat(body).toString();

            console.log(parsedBody);

            const message = parsedBody.split('=')[1];

            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.log('ERROR ' + err);
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        })
    }
    // console.log(req.url, req.method, req.headers);
    // res.send('All good');
    // process.exit();
    else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> my first page </title></head>');
        res.write('<body>');
        res.write('<h1 align="center" > Hello World </h1>')
        res.write('</body>');
        res.write('</html>')
        res.end();
    }
}

module.exports = requestHandler;