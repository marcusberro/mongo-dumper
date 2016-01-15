'use strict';

var assert = require('assert');
var childProcess = require('child_process');

function Dumper(mongoSettings) {
    assert.notEqual(mongoSettings, null);
    this.mongoSettings = mongoSettings;
};

Dumper.prototype.dump = function(){
    var mongodump = childProcess.exec('mongodump --help', function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('Child Process STDOUT: '+stdout);
        console.log('Child Process STDERR: '+stderr);
    });

    mongodump.on('exit', function (code) {
       console.log('Child process exited with exit code '+code);
    });
}

module.exports = Dumper;