global._require = function (module, global) {
    if (!global)
        return require([__dirname, module].join('/'));
    return require(module);
};
global.settings = global._require('config');

var express = global._require('express', true);
var app = express();

app.get('/login', function (request, response) {

    var auth = new (global._require('controller/auth'))(
        request,
        response
    );

    auth.login();
});

app.get('/chat', function (request, response) {

    var chat = new (global._require('controller/chat'))(
        request,
        response
    );

    chat.init();
});

app.listen(global.settings.server.listen);