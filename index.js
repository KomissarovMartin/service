var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile('/home/user/.work/projects/service/index.html');
});

var sockets = [];

io.on('connection', function(socket) {

    socket.on('typing', function(){
        socket.emit('typing');
    });

    socket.on('disconnect', function(){
        socket.emit('user:disconnect');
    });

    socket.on('message', function(msg){
        socket.emit('message', msg);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

