module.exports = function()
{
    this.main = function (req, res) {

        var auth = new (global._require('service/auth'))();
        var response = new (global._require('core/response/auth'))(res);

        auth.setCredentials(
                req.param('login', false),
                req.param('password', false)
            )
            .success(function(user) {
                response.success(user);
            })
            .failed( function (err) {
                auth.signUp(
                    req.param('login', false),
                    req.param('password', false)
                );
            })
            .signIn();
    };
};