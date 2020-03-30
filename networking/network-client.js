const net = require('net');
const client = net.connect({port:60300});
const ldjClient = require('./lib/ldj.js').connect(client);

ldjClient.on('message', (message)=>{
    //const message = JSON.parse(data);
    
    if( message.type === 'watching' ){
        console.log( `Now watching ${message.file}`)
    }else if( message.type === 'change'){
        console.log( `File Changed ${new Date(message.timestamp)}` );
    }else{
        console.log( `Unrecognised message type ${message.type}`)
    }
    
})

// client.on('data', data =>{
//     const message = JSON.parse(data);
//     if( message.type === 'watching' ){
//         console.log( `Now watching ${message.file}`)
//     }else if( message.type === 'change'){
//         console.log( `File Changed ${new Date(message.timestamp)}` );
//     }else{
//         console.log( `Unrecognised message type ${message.type}`)
//     }
// })