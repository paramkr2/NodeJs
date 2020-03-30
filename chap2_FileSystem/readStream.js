#!/usr/bin/env node
'use strict'
const fs = require('fs');


fs.createReadStream( process.argv[2]).on( 'data', (chunk) =>{
    process.stdout.write(chunk);
}).on('error', (err) =>{
    process.stderr.write( `Error Reading File ${err.message}\n`);
});
// above can be done since the return value of on is the same emitter object 
