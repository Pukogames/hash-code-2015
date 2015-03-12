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
			//if first row does not contains 5 parameters, exits
			if (config.length < 5) {
				throw new Error('Bad input file. Line:', i);
			}

			datacenter = {
				rows: config[0],
				slots: config[1],
				unavailableCount: parseInt(config[2]),
				serversCount: parseInt(config[4]),
				pools: config[3],
				unavailables: [],
				servers: []
			};
			//console.log('Datacenter config:', datacenter);
		} else { //if not first line, we parse unavailable slots first then available slots
			var position = line.split(' ');
			if (position.length < 2) {
				throw new Error('Bad input file. Line:', i);
			}
			if (i <= datacenter.unavailableCount) {
				datacenter.unavailables.push({
					row: line[0],
					slot: line[1]
				});
			} else { //else we put server in list
				datacenter.servers.push({
					row: line[0],
					slot: line[1]
				});
			}
		} //end if first line

		++i; //increment current line index
	}).then(function() {
		console.log('Server count:', datacenter.servers.length + '/' + datacenter.serversCount);
		console.log('Unavailable slots count:', datacenter.unavailables.length + '/' + datacenter.unavailableCount);
		if (datacenter.servers.length === datacenter.serversCount && datacenter.unvailables.length === datacenter.unavailableCount) {
			console.log('Finished parsing, launching the awesome...');
			
		} else {
			throw new Error('Something gone wrong with config (well formed but data not consistant).');
		}
	});
}

main(process.argv[2], process.argv[3]);