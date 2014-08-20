var Abstract = function ()
{
    var config = require('../config').database;
    this.mongoose = require('mongoose')
        .connect('mongodb://' + config.server + ':' + config.port + '/' + config.name);

    this.model = function (name, fields) {
        return self.mongoose.model(name, fields);
    }

    var self = this;
};

module.exports = new Abstract();