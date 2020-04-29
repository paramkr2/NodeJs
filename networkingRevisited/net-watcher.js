'use strict'
const fs = require('fs');
const net = require('net');
const filename = process.argv[2]; // getting the filename from the command line arguments

if( !filename ){
    throw Error('Error: No filename specified');
}

// the callback function will be called one the client connects to the server 
// connection below is a socket object that we can use to recieve or send data  
net.createServer( connection =>{
    //Reporting
    console.log( 'Subscriber connected' );
    connection.write(`Now watching ${filename} for changes \n`);

    //watcher setup 
    // whenever the file with the filename specified changes , the callback function will be called 
    const watcher = fs.watch( filename , () => { return connection.write( `File changed: ${ new Date() } \n`)});

    // listener, also means that conneciton object inherits EventEmmiter class, listening for 'close' event 
    connection.on( 'close' , ()=>{
        console.log( 'Subscriber disconnected' );
        watcher.close() ;
    })


}).listen( 60300, ()=> console.log( 'Listening for subscribers ' ));

// now above we could have first declare a server variable then called the listen method afterwards
// but the above stuff works 