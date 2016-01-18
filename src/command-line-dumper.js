'use strict';

var childProcess = require('child_process');
var moment = require('moment');
var fs = require('fs');


function CommandLineDumper(dumpSettings) {
    
    this.hosts = dumpSettings.hosts;
    this.authentication = dumpSettings.authentication;
    this.db = dumpSettings.db;
    this.output = dumpSettings.output;
};

CommandLineDumper.prototype.dump = function(){
    
    var commandLineDumpAssets = this.buildAssets();
    
    var mongodump = childProcess.exec(commandLineDumpAssets.command, function (error, stdout, stderr) {

        if (error)
            throw(error);
    
        var output = 
            'Child Process STDERR: \n'+stderr +'\n\n';
             + 'Child Process STDOUT: \n'+stdout;

        console.log(output);

        fs.writeFile(commandLineDumpAssets.fullPath + '.log', output, function(err) {
            
            if(err) 
                throw(err);

            console.log("LOG was saved!");
        }); 
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

CommandLineDumper.prototype.buildAssets = function(timestampLabel){
    
    var dumpAssets = { command : 'mongodump' };

    if(this.hosts) {

        dumpAssets.command += ' --host ' + this.hosts;
    }

    if(this.authentication){

        dumpAssets.command += ' --authenticationDatabase ' + this.authentication.database || 'admin';
        dumpAssets.command += ' --username ' + this.authentication.user;

        if(this.authentication.password){

            dumpAssets.command += ' --password ' + this.authentication.password;
        }
    }

    if(this.db){

        dumpAssets.command += ' --db ' + this.db.name;
     
        if(this.db.collection){

            dumpAssets.command += ' --collection ' + this.db.collection.name;

            if(this.db.collection.query){

                dumpAssets.command += ' --query ' + this.db.collection.query;
            }
        }
    }

    dumpAssets.command += ' --oplog ';

    if(this.output){
        dumpAssets.fullPath = '';
        
        if(this.output.filepath) {

            dumpAssets.fullPath = this.output.filepath + '/';
        }

        if(this.output.prefix) {

            dumpAssets.fullPath += this.output.prefix;

        } else {

            dumpAssets.fullPath += 'dump';
        }

        if(this.output.timestampLabel){

            dumpAssets.fullPath += '_' + moment().format(this.output.timestampLabel);
        } 

        dumpAssets.command += ' --out ' + dumpAssets.fullPath;
    } 

    return dumpAssets;
}

module.exports = CommandLineDumper;