module.exports = function(request, response)
{
    var user = new (global._require('service/user'))();
    var authResponse = new (global._require('core/response/auth'))(response);

    this.login = function () {

        credentials = {
            login: request.param('login', false),
            password: request.param('password', false)
        };

        user.signIn(credentials, function (error, user) {
            if (error) {
                user.signUp(credentials, function(error, user){
                    if (error) {
                        authResponse.failed(error);
                    }
                    else {
                        authResponse.success(user);
                    }
                });
            }
            else {
                authResponse.success(user);
            }
        });
    };

    this.out = function () {

        if (request.param('x-auth')) {
            user.signOut({
                userId: request.param('x-auth').split(':')[1],
                token: request.param('x-auth').split(':')[0]
            });
        }

        authResponse.signOut();
    }
};