console.log('Pukogames - Google Hash Code 2015');

if (process.argv[2] === undefined) {
	console.log('Please provide at least one argument (file path, ie dc.in)');
	return;
} else {
	console.log('Use it using node index.js input-file.in output-file.out');
}

var lineReader = require('line-reader');
var fs = require('fs');

function writeOutputFile(data, outputFile) {
	if (fs.existsSync(outputFile)) {
		fs.truncateSync(outputFile, 0);
	}

	for (var j = 0; j < data.servers.length; j++) {
		for (var k = 0; k < data.servers.length; k++)  {
			if (data.servers[k].index > data.servers[j].index) {
				var tmp = data.servers[j];
				data.servers[j] = data.servers[k];
				data.servers[k] = tmp;
			}
		}
	}

	for (var i = 0; i < data.servers.length; i++) {
		var server = data.servers[i];
		fs.appendFileSync(outputFile, ((server.row === -1) ? 'x' : (server.row + ' ' + server.slot + ' ' + server.pool)) + '\n', encoding = 'utf8');
	}
}

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
				rows: [],
				rowsCount: config[0],
				slotsCount: config[1],
				unavailableCount: parseInt(config[2]),
				serversCount: parseInt(config[4]),
				pools: config[3],
				unavailables: [],
				servers: []
			};

			for (var rCounter = 0; rCounter < datacenter.rowsCount; rCounter++) {
				datacenter.rows.push([]);
				for (var sCounter = 0; sCounter < datacenter.slotsCount; sCounter++) {
					datacenter.rows[rCounter].push(0);
				}
			}
		} else { //if not first line, we parse unavailable slots first then available slots
			var position = line.split(' ');
			if (position.length < 2) {
				throw new Error('Bad input file. Line:', i);
			}
			if (i <= datacenter.unavailableCount) {
				datacenter.unavailables.push({
					row: parseInt(position[0]),
					slot: parseInt(position[1])
				});
				datacenter.rows[parseInt(position[0])][parseInt(position[1])] = -1;
			} else { //else we put server in list
				datacenter.servers.push({
					index: i - datacenter.unavailableCount - 1,
					slots: parseInt(position[0]),
					capacity: parseInt(position[1])
				});
			}
		} //end if first line

		++i; //increment current line index
	}).then(function() {
		console.log('Server count:', datacenter.servers.length + '/' + datacenter.serversCount);
		console.log('Unavailable slots count:', datacenter.unavailables.length + '/' + datacenter.unavailableCount);
		if (datacenter.servers.length === datacenter.serversCount && datacenter.unavailables.length === datacenter.unavailableCount) {
			console.log('Finished parsing, launching the awesome...');
			require('./where-magic-happen-2').compute(datacenter, function(res) {
				writeOutputFile(res, outputFile || inputFile + '.out');
			});
		} else {
			throw new Error('Something gone wrong with config (well formed but data not consistant).');
		}
	});
}

main(process.argv[2], process.argv[3]);