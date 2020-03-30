#! /usr/bin/env node
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if( !filename ){
    throw Error('Now File Specified');
}

net.createServer( connection =>{
    console.log( 'Subscriber connected');
    connection.write(JSON.stringify( {type:'watching',file:filename }) + '\n');
    const watcher = fs.watch( filename, () => {
        connection.write(JSON.stringify({type:'change', timestamp: Date.now() }) + '\n' );
        //console.log( 'stuff');
    });
    connection.on( 'close', () =>{
        console.log( 'Subscriber Disconnected');
        watcher.close();
    })

}).listen(60300, () =>{ 
    console.log( 'Listening on port 60300')
});