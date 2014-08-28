module.exports = function(request, response)
{
    this.user = null;

    this.init(request, response, function (user) {

        self.user = user;

        response.sendFile(global.settings.common.root + '/view/chat.html');
    });

    var self = this;
};

module.exports.prototype = new (global._require('controller/permission.js'))();