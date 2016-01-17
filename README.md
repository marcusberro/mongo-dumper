# mongo-dumper
> Dump and restore single MongoDB instance, Replica set and Sharded cluster in Node.js

Mongo-dumper provides ground for writing Node.js code focused on dumping and restoring Mongo Databases

## Features
* **single instance and replica set support** - make a hot backup on them
* **timestamp labeled backup files** - output files are saved with a timestamp reference
* **backup log files** - generate log files for each backup
* **compression** - options: ????
* **authentication** - dump secure MongoDbs

## Usage
It's a piece of cake:
```bash
npm install mongo-dumper --save
```
```javascript
var Dumper = require('mongo-dumper');
```

### Dumper objects
Dumper objects contain two main funtions: dump and restore. They receive some backup options when instanciated, each one validated accordingly Dumper type object

TODO example

#### CommandLineDumper
Build a shell to mongodump and mongorestore tools.

##### Options
 json options
 
##### Sample usage


## CLI tool and Docker

## License

TODO: support to delayed documemts
TODO: support to Sharded cluster
TODO: Db-to-stream dump