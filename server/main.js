global._require = function (module, global) {
    if (!global)
        return require([__dirname, module].join('/'));
    return require(module);
};
global.settings = global._require('config');

var app = global._require('express', true)();
var http = global._require('http', true).Server(app);
var io = require('socket.io')(http);

app.get('/login', function (request, response) {

    var auth = new (global._require('controller/auth'))(
        request,
        response
    );

    auth.login();
});

io.on('connection', function(socket) {

    socket.on('typing', function(){
        socket.emit('typing');
    });

    socket.on('disconnect', function(){
        socket.emit('user:disconnect');
    });

    socket.on('message', function(msg){
        socket.emit('message', msg.message);
    });

});


http.listen(global.settings.server.listen);

