module.exports = function ()
{
    var config = global.settings.database;
    this.mongoose = global._require('mongoose', true)
        .connect('mongodb://' + config.server + ':' + config.port + '/' + config.name);

    this.model = function (name, fields) {
        return self.mongoose.model(name, fields);
    }

    var self = this;
};