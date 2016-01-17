'use strict';

var assert = require('assert');
var childProcess = require('child_process');

function CommandLineDumper(dumpSettings) {
    this.hosts = dumpSettings.hosts;
    this.authentication = dumpSettings.authentication;
    this.db = dumpSettings.db;
    this.output = dumpSettings.output;
};

CommandLineDumper.prototype.dump = function(){
    var mongodump = childProcess.exec(this.buildCommand(), function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('Child Process STDOUT: \n'+stdout);
        console.log('Child Process STDERR: \n'+stderr);

    });

    mongodump.on('exit', function (code) {
       console.log('Child process exited with exit code '+code);
    });
}

CommandLineDumper.prototype.restore = function(){
    var mongorestore = childProcess.exec("ls -l", function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('Child Process STDOUT: \n'+stdout);
        console.log('Child Process STDERR: \n'+stderr);

    });

    mongorestore.on('exit', function (code) {
       console.log('Child process exited with exit code '+code);
    });
}

CommandLineDumper.prototype.buildCommand = function(){
    var command = 'mongodump';

    if(this.hosts) {
        command += ' --host ' + this.hosts;
    }

    if(this.authentication){
        command += ' --authenticationDatabase ' + this.authentication.database || 'admin';
        command += ' --username ' + this.authentication.user;

        if(this.authentication.password){
            command += ' --password ' + this.authentication.password;
        }
    }

    if(this.db){
        command += ' --db ' + this.db.name;
     
        if(this.db.collection){
            command += ' --collection ' + this.db.collection.name;

            if(this.db.collection.query){
                command += ' --query ' + this.db.collection.query;
            }
        }
    }

    command += ' --oplog ';

    if(this.output){
        command += ' --out ' + this.output.filepath || 'dump';
    }    

    return command;
}

module.exports = CommandLineDumper;