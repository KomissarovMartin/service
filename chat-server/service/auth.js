module.exports = function () {

    var self = this;
    var User = global._require('model/user');

    var successCallback = null,
        failedCallback = null;

    var userCredentials = {
        login: null,
        password: null
    };

    this.setCredentials = function (login, password) {

        userCredentials.login = login;
        userCredentials.password = password;

        return self;
    }

    this.success = function (callback) {
        successCallback = callback;
        return self;
    };

    this.failed = function (callback) {
        failedCallback = callback;
        return self;
    }

    this.signByToken = function (userId, token) {

        User.findOne(userCredentials, function (err, user) {

            if (user) {
                user.token.push(generateToken(user.login));
                user.save();
            }

            if (successCallback) {
                successCallback(user);
                return;
            }
            if (failedCallback) {
                failedCallback(err);
                return;
            }
        });

        return this;
    }

    this.signIn = function () {

        User.findOne(userCredentials, function (err, user) {

            if (user) {
                
                user.token.push(generateToken(user.login));
                user.save();

                if (successCallback) {
                    successCallback(user);
                    return;
                }
            }


            if (failedCallback) {
                failedCallback(err);
                return;
            }
        });

        return this;
    };

    function generateToken (login) {
        return global._require('MD5', true)(new Date().getTime() + login)
    }

    this.signUp = function (login, password) {

        User.findOne({login: login}, function(err, user) {

            if (!user) {

                var user = new User({
                    login: login,
                    password: password,
                    token: [generateToken(login)]
                });

                user.save(function (err) {

                    if (err && failedCallback) {
                        failedCallback(err);
                    }
                    else if (successCallback) {
                        successCallback(user);
                    }

                });
            }
        });
    }
};