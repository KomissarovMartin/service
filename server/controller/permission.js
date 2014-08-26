module.exports = function () {

    this.init = function (request, response, callback)
    {
        var permissions = new (global._require('core/response/permission.js'))(response);
        var credentials = request.param('x-auth', new String()).split(':');

        if (credentials.length != 2) {
            permissions.failed(permissions.statuses.wrongXAuth);
            return;
        }

        var user = new (global._require('service/user'))();

        user.signInWithToken({
            token: credentials[0],
            userId: credentials[1]
        }, function (error, user) {

            if (user) {
                if (callback) {
                    callback(user);
                }
            }
            else {
                permissions.failed(permissions.statuses.wrongToken);
                return;
            }
        });
    }

    var self = this;
}