'use strict';

var Dumper = require('../').Dumper;

var settings = {
	hosts: 'localhost'
};

var mongoDumper = new Dumper(settings);

mongoDumper.dump(function(err, info){
    console.log(err, info);
});
