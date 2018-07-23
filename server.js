var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
	var q = url.parse(req.url, true);
	var way = './public', cont;

	switch (q.pathname[q.pathname.length - 1]) {
		case '/' : way += '/index.html'; cont = 'text/html'; break;
		case 's' : way += q.pathname; cont = 'text/css'; break;
		case 'g' : way += q.pathname; cont = 'image/svg+xml'; break;
		case 'o' : way += q.pathname; cont = 'image/ico'; break;
		case 'n' : way += q.pathname; cont = 'application/json'; break;
		default : return;
	}

	if (req.method == 'POST') {
		var body = [];
		req.on('error', (err) => {
			console.error(err);
		});
		req.on('data', (chunk) => {
			body.push(chunk);
		});
		req.on('end', () => {
			body = Buffer.concat(body).toString();
			console.log(body);
		});
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end('OK');
	} else {
		fs.readFile(way , function(err, data) {
			if (err) {
				res.writeHead(404, {'Content-Type' : 'text/html'});
				res.end('404 Not Found');
			} else {
				res.writeHead(200, {'Content-Type' : cont});
				res.write(data);
				res.end();
			}
		});
	}
}).listen(process.env.PORT || 8080);