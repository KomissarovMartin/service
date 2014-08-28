module.exports = function(request, response)
{
    var userService = new (global._require('service/user'))();
    var authResponse = new (global._require('core/response/auth'))(response);

    this.login = function () {

        credentials = {
            login: request.param('login', null),
            password: request.param('password', null)
        };

        userService.signIn(credentials, function (error, user) {
            if (!user) {
                userService.signUp(credentials, function(error, user){

                    if (user) {
                        authResponse.success(user);
                    }
                    else {
                        authResponse.failed(error);
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
            userService.signOut({
                userId: request.param('x-auth').split(':')[1],
                token: request.param('x-auth').split(':')[0]
            });
        }

        authResponse.signOut();
    }
};