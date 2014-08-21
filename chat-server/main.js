global._require = function (module, global) {
    if (!global)
        return require(__dirname+'/'+module);
    return require(module);
};
global.settings = global._require('config');

var express = global._require('express', true);
var app = express();

app.get('/login', function (req, res) {
    var login = new (global._require('controller/auth'))(req, res);
    login.main();
});

app.get('/logout', function (req, res) {
    var login = new (global._require('controller/auth'))(req, res);
    login.out();
});

app.listen(global.settings.server.listen);