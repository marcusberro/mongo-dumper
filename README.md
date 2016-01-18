# mongo-dumper
> Dump and restore single MongoDB instance and Replica set in Node.js

## **Under construction project**

Mongo-dumper provides ground for writing Node.js code focused on dumping and restoring Mongo Databases

## Features
* **single instance and replica set support** - make a hot backup on them
* **timestamp labeled backup files** - output files are saved with a timestamp reference
* **backup log files** - generate log files for each backup
* **compression** - tar.gz
* **authentication** - dump secure MongoDbs

## Usage
It's a piece of cake:
```bash
npm install mongo-dumper --save
```
```javascript
var Dumper = require('mongo-dumper').SomeDumper;
```

### Dumper objects
Dumper objects contain two main functions: dump and restore. They receive some backup options when instanciated, each one validated accordingly to Dumper type object:

```javascript
function SomeDumper(dumpSettings) {
	// validate dump settings
};

SomeDumper.prototype.dump = function(){
	// dump process
}

SomeDumper.prototype.restore = function(){
	// restore process
}
```

#### CommandLineDumper
Build a shell to mongodump and mongorestore tools.

##### Dump settings
```javascript
 var dumpSettings = {
 	"hosts" : "",
	"authentication" : {
		"user" : "",
		"password" : "",
		"database" : ""
	},
	"db" : {
		"name" : "",
		"collection" : {
			"name" : "",
			"query" : ""
		}
	},
	"output" : {
		"filepath" : "",
		"compression": ""
	}
 }
```
- **hosts** - in case of replica set it is a comma separated list of hosts. Otherwise, a single host (default:localhost: 27017)
- **authentication** - Secure database authentication
   - user - username
   - password - password
   - database - authentication database (default: admin)
- **db** - specific database
   - name - db name
   - collection - specific collection
      - name - collection name
      - query - backup a slice of data
- **output** - output backup files
   - filepath - where to drop backup files (default: dump)
   - compression - only tar.gz available so far

##### Sample usage
```javascript
var Dumper = require('mongo-dumper').CommandLineDumper;

var settings = {
	hosts: 'localhost:27017,localhost:27018,localhost:27019',
	authentication : {
		database : 'admin',
		user : 'dbAdmin',
		password : 'dbAdmin'
	}
};

var mongoDumper = new Dumper(settings);

mongoDumper.dump();
```

##### Restore options
**TODO**

##### Sample usage
**TODO

## CLI tool and Docker
**TODO**

## License

The MIT License (MIT)

Copyright (c) 2016 Marcus Berro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


TODO: support to delayed documemts
TODO: support to Sharded cluster
TODO: Db-to-stream dump