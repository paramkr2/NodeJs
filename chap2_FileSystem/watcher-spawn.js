const fs = require('fs');
const spawn = require('child_process').spawn;
const filename = process.argv[2];

if( !filename ){
    throw Error('A file to watch must be specified');
}
// Is it better to take notes on computer rather than on piece of a paper?
// But you have issues with your eyes, so you should better take notes on paper for now. Maybe in
// future when you feel better, then you should consider taking notes on the computer.


fs.watch( filename , () => {
    const ls = spawn('ls',['-l','-h',filename]);
    let output = '';
    ls.stdout.on('data', chunk => output += chunk);
    ls.on('close',() =>{
        const parts = output.split(/\s+/);
        console.log([parts[0], parts[4], parts[8]]);
    })
    ls.stdout.pipe(process.stdout);
})
console.log(`Now watching ${filename} for changes...`);