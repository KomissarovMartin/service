var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {

    console.log(socket.handshake.query);

    socket.on('typing', function(){
        console.log("typing");
        socket.emit('typing');
    });

    socket.on('disconnect', function(){
        console.log("disconnect");
        socket.emit('user:disconnect');
    });

    socket.on('message', function(msg){
        console.log("message");
        socket.emit('message', msg.message);
    });

});

http.listen(3001);