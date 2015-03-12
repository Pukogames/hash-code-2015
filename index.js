console.log('Pukogames - Google Hash Code 2015');

if (process.argv[2] === undefined) {
	console.log('Please provide at least one argument (file path, ie dc.in)');
	return;
} else {
	console.log('Use it using node index.js input-file.in output-file.out');
}

var lineReader = require('line-reader');

/**
var mock = {
 rows: 2,
 slots: 5,
 pools: 2,
 unvailables: [
   {
     row: 0,
     slot: 0
   }
 ],
 servers: [
   {
     slots: 3,
     capacity: 10
   },
   {
     slots: 3,
     capacity: 10
   },
   {
     slots: 2,
     capacity: 5
   },
   {
     slots: 1,
     capacity: 5
   },
   {
     slots: 1,
     capacity: 1
   }
 ]
};
*/

function main(inputFile, outputFile) {
	var datacenter = {};
	var i = 0;

	console.log('Processing input file', inputFile);

	lineReader.eachLine(inputFile, function(line) {
		if (i === 0) { //if i = 0, then this is the first line of the input file (datacenter configuration)
			var config = line.split(' ');
			datacenter = {
				rows: config[0],
				slots: config[1],
 				pools: config[3],
 				unavailables: [],
 				servers: []
			};
			console.log('Config:', datacenter);
		}

		++i;
	}).then(function() {
		console.log('Finished parsing, launching the awesome...');
	});
}

main(process.argv[2], process.argv[3]);