var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile('/home/user/.work/projects/service/index.html');
});

io.on('connection', function(socket) {

    socket.emit('user:connect');

    socket.on('disconnect', function(){
        io.emit('user:disconnect');
    });

    socket.on('message', function(msg){
        console.log('incoming message: ' + msg);
        io.emit('message', msg);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

