# mongo-dumper
> Dump and restore single MongoDB instance and Replica set in Node.js

## **Under construction project**

Mongo-dumper provides ground for writing Node.js code focused on dumping and restoring Mongo Databases

## Features
* **single instance and replica set support** - make a hot backup on them
* **timestamp labeled backup files** - output files are saved with a moment.js timestamp reference
* **log files** - generate log files for each backup
* **compression** - tar.gz (TODO)
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
		"prefix" : "",
		"filepath" : "",
		"timestampLabel" : "",
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
   - prefix - file/folder prefix (default: dump)
   - filepath - where to drop backup files (default: source path)
   - timestampLabel - moment.js timestamp label (e.g. 'YYYY-MM-DD_HH-mm-ss' = 'prefix_2016-01-18_01-39-03')
   - compression - TODO - only tar.gz available

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
**TODO**

## CLI tool and Docker
**TODO**

## License

mongo-dumper is freely distributable under the terms of the [MIT license.](LICENSE)


TODO: support to delayed documemts
TODO: support to Sharded cluster
TODO: Db-to-stream dump