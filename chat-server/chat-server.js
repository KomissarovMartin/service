var ChatServer = function ()
{
    this.options = require('./config.js').socket;

    this.io = require('socket.io');

    this.init = function() {
        self
            .io.listen(this.options.port)
            .on('connection', function (socket) {
                console.log('on:connection');
            });

        return self;
    };

    var self = this;
};

module.exports = new ChatServer();