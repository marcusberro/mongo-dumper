'use strict';

var Dumper = require('../').DatabaseToFileDumper;

var settings = {
	hosts: 'localhost:27023,localhost:27024,localhost:27025',
	authentication : {
		database : 'admin',
		user : 'dbAdmin',
		password : 'dbAdmin'
	},
	output: {
		timestampLabel : 'YYYY-MM-DD_HH-mm-ss',
		prefix : 'lambda',
		compression : 'tar.gz'
	}
};

var mongoDumper = new Dumper(settings);

mongoDumper.transport();