const fs = require('fs');

function dotProduct(a, b) {
	let dotProduct = 0;
	for (let i = 0; i < a.length; i++) {
		dotProduct += a[i] * b[i];
	}
	return dotProduct;
}

function magnitude(x) {
	let sumOfSquares = 0;

	for (let i = 0; i < x.length; i++) {
		sumOfSquares += x[i] * x[i];
	}
	return Math.sqrt(sumOfSquares);
}

function cosineSimilarity(a, b) {
	const dotProd = dotProduct(a, b);	

	const magA = magnitude(a);
	const magB = magnitude(b);

	if (magA === 0 || magB === 0) {
		return 0;
	} else {
		return dotProd / (magA*magB);
	}
}

async function create_random_word() {

	const filePath = './embeddings.json'
	const data = await fs.readFileSync(filePath, 'utf8'); 
	const jsonData = JSON.parse(data);
	const current = jsonData[Math.floor(Math.random()*jsonData.length)];
	let similarities = [];

	for (let i = 0; i < jsonData.length; i++) {
		const distance = cosineSimilarity(current[1], jsonData[i][1])
		similarities.push([distance, jsonData[i][0]]);
	}

	similarities.sort();
	similarities.reverse();
	return [current, similarities];
}

module.exports = {
	create_random_word,
};
