'use strict';

var childProcess = require('child_process');
var moment = require('moment');
var fs = require('fs');


function DatabaseToFileDumper(dumperSettings) {
    
    this.hosts = dumperSettings.hosts;
    this.authentication = dumperSettings.authentication;
    this.db = dumperSettings.db;
    this.output = dumperSettings.output;
};

DatabaseToFileDumper.prototype.transport = function(){
    
    var dumperAssets = this.loadAssets();
    
    var mongodump = childProcess.exec(dumperAssets.command, function (error, stdout, stderr) {

        if (error)
            throw(error);
    
        var output = 
            'Child Process STDERR: \n'+stderr +'\n\n';
             + 'Child Process STDOUT: \n'+stdout;

        console.log(output);

        fs.writeFile(dumperAssets.fullPath + '.log', output, function(err) {
            
            if(err) 
                throw(err);

            console.log("LOG was saved!");
        }); 
    });

    mongodump.on('exit', function (code) {
       
       console.log('Child process exited with exit code '+code);
    });
};

DatabaseToFileDumper.prototype.loadAssets = function(){
    
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
};

module.exports = DatabaseToFileDumper;