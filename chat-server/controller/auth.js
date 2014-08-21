module.exports = function(request, response)
{
    var auth = new (global._require('service/auth'))();
    var authResponse = new (global._require('core/response/auth'))(response);

    if (request.param('x-auth')) {

        auth.setUserHeaderCredentials(
                request.param('x-auth').split(':')[0],
                request.param('x-auth').split(':')[1]
            )
            .success(function(user){
                authResponse.success(user);
            })
            .failed(function(err){
                authResponse.failed(['token or user-id is not valid']);
            })
            .signInWithToken();

        return;
    }

    this.main = function () {

        auth.setCredentials(
                request.param('login', false),
                request.param('password', false)
            )
            .success(function(user) {
                authResponse.success(user);
            })
            .failed(function (err) {
                auth.signUp(
                    request.param('login', false),
                    request.param('password', false)
                );
            })
            .signIn();
    };

    this.out = function () {

        if (request.param('x-auth')) {

            auth.setUserHeaderCredentials(
                    request.param('x-auth').split(':')[0],
                    request.param('x-auth').split(':')[1]
                )
                .signOut();
        }

        authResponse.signOut();
    }
};