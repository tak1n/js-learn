const net = require('net');

const port = 8080;


// server
net.createServer((socket) => {
    console.log("connected");
    socket.on('data', (data)  => { console.log(data.toString()); });
}).listen(port);
  
// client
const socket = require('net').Socket();
socket.connect(port);
socket.write('Hello');
socket.end();