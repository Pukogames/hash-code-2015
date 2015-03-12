console.log('Pukogames - Google Hash Code 2015');

if (process.argv[2] === undefined) {
	console.log('Please provide at least one argument (file path, ie dc.in)');
	return;
} else {
	console.log('Use it using node index.js input-file.in output-file.out');
}

var lineReader = require('line-reader');

function main(inputFile, outputFile) {
	var Datacenter = {};
	var Servers = [];

	console.log('Processing input file', inputFile);
	lineReader.eachLine(inputFile, function(line) {
		console.log(line);
	}).then(function() {
		console.log('Finished parsing, launching the awesome...');
	});
}

main(process.argv[2], process.argv[3]);