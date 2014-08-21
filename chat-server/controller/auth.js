module.exports = function()
{
    this.main = function (req, res) {

        var auth = new (global._require('service/auth'))();
        var response = new (global._require('core/response/auth'))(res);

        var error = auth.signIn(
            req.param('login', false),
            req.param('password', false)
        );

        if (error) {
            response.failed(error);
        }

        response.success(auth.getUser());
    };
};