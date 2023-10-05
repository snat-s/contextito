const http = require('http');
const fs = require('fs');
const wordSimilarity = require('./word_similarity');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req,res) => {
	if (req.url === '/similarities' && req.method === 'GET') {
		const [current, similarities] = await wordSimilarity.create_random_word();
		console.log(current);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify([current, similarities]));
	} else if (req.url === '/' && req.method === 'GET')  {
		const indexHTML = await fs.readFileSync('index.html', 'utf8');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(indexHTML);
	} else {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Not found');
	}
});

server.listen(port, hostname, () => {
	console.log('server running at port 3000');
});
