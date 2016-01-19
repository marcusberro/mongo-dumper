# mongo-dumper
> Dump and restore single MongoDB instance and Replica set in Node.js

Mongo-dumper provides ground for writing Node.js code focused on dumping and restoring Mongo Databases. It is based on the concept of a Dumper, a vehicle designed for carrying bulk material. Considering that idea, we provide some kinds of Dumpers: 

- DatabaseToFileDumper
- FileToDatabaseDumper(TODO)
- DatabaseToDatabaseDumper(TODO)

In other words, load a Dumper with settings and call transport() to make it happen!

## Awesome features
* **single instance and replica set support** - make a hot backup on them
* **timestamp labeled backup files** - output files are saved with a moment.js timestamp reference
* **log files** - generate log files for each backup
* **compression** - tar.gz (Linux only)
* **authentication** - dump secure MongoDbs

## Usage
It's a piece of cake:
```bash
npm install mongo-dumper --save
```
```javascript
var Dumper = require('mongo-dumper').SomeDumper;

var settings = {
	hosts: 'localhost:27017,localhost:27018,localhost:27019',
	authentication : {
		database : 'admin',
		user : 'dbAdmin',
		password : 'dbAdmin'
	}
};

var mongoDumper = new Dumper(settings);

mongoDumper.transport();
```

### Dumpers
Dumper objects contain one main function: transport. They receive a settings object when instanciated, each one validated accordingly to Dumper type object:

```javascript
function SomeDumper(dumperSettings) {
	// validate dumper settings
};

SomeDumper.prototype.transport = function(){
	// dump, restore or both
}
```

#### DatabaseToFileDumper
Makes a backup of datatbase into the filesystem. It is built as a wrapper of mongodump tool.

##### Dumper settings
```javascript
 var dumperSettings = {
 	"hosts" : "",
	"authentication" : {
		"user" : "",			// if authentication exists, default admin
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
		"prefix" : "",			// default dump
		"filepath" : "",
		"timestampLabel" : "", 	// moment.js format e.g. 'YYYY-MM-DD_HH-mm-ss'
		"compression": "" 		// tar.gz available
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
   - compression - tar.gz available and **linux only supported**

##### Sample usage
```javascript
var Dumper = require('mongo-dumper').DatabaseToFileDumper;

var settings = {
	hosts: 'localhost:27023,localhost:27024,localhost:27025',
	authentication : {
		database : 'admin',
		user : 'dbAdmin',
		password : 'dbAdmin'
	},
	output: {
		timestampLabel : 'YYYY-MM-DD_HH-mm-ss',
		prefix : 'lambda'
	}
};

var mongoDumper = new Dumper(settings);

mongoDumper.transport();
```

#### FileToDatabaseDumper
**TODO**

#### DatabaseToDatabaseDumper
**TODO**

## CLI tool and Docker
**TODO**

## Dependencies
- npm
- mongodb or docker
- Compression works only in Linux (calling tar command)

## Futures releases
- support to delayed documemts
- support to Sharded cluster
- Db-to-stream dump
- checksum
- Docker Dumper (do not need mongo installed)

## License

mongo-dumper is freely distributable under the terms of the [MIT license.](LICENSE)