'use strict';

var Dumper = require('../').CommandLineDumper;

var settings = {
	hosts: 'localhost:27023,localhost:27024,localhost:27025',
	authentication : {
		database : 'admin',
		user : 'dbAdmin',
		password : 'dbAdmin'
	}
};

var mongoDumper = new Dumper(settings);

mongoDumper.dump();