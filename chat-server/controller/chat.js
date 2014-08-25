module.exports = function(request, response)
{
    this.user = null;

    this.init(request, response, function (user) {
        self.user = user;

        console.log(user);

        response.send("Куку! епта");
    });

    var self = this;
};

module.exports.prototype = new (global._require('controller/permission.js'))();