const websocketserver = require('websocket').server;
const EventEmitter = require('events');
const osc = require('node-osc');
const http = require('http');

const oscEmitter = new EventEmitter();

var oscServer = new osc.Server(8000, '0.0.0.0');
console.log("Servidor OSC ouvindo na porta 8000");
oscServer.on("message", function (msg, rinfo) {
  if(msg[0] == '/1/pauseplay'){
    if(msg[1]){
      oscEmitter.emit('pause');
    }else{
      oscEmitter.emit('play');
    }
  }
});

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(8080, function() {
    console.log('Servidor websocket ouvindo na porta 8080');
});

var wsServer = new websocketserver({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', function(request) {
    var connection = request.accept('netflix-osc-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');

    oscEmitter.on('pause', ()=>{
      console.log("Enviando PAUSE");
      connection.sendUTF(JSON.stringify({action: "pause"}));
    });

    oscEmitter.on('play', ()=>{
      console.log("Enviando PLAY");
      connection.sendUTF(JSON.stringify({action: "play"}));
    })

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
