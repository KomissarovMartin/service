module.exports = function ( ) {

    var self = this;
    var User = global._require('model/user');

    this.signInWithToken = function (credentials, callback) {

        User.findOne({_id: credentials.userId}, function (error, user) {

            var userModel = null;

            if (user && user.token.indexOf(credentials.token) !== -1) {
                userModel = user;
            }

            if (callback) {
                callback(error, userModel);
            }
        });
    }

    this.signIn = function (crenentials, callback) {

        cond = {
            login: crenentials.login,
            password: crenentials.password
        };

        User.findOne(cond, function (error, user) {

            if (user) {
                user.token.push(generateToken(user.login));
                user.save();
            }

            if (callback) {
                callback(user);
            }
        });
    };

    function generateToken (login) {

        if (!login) {
            return null;
        }

        return global._require('MD5', true)(new Date().getTime() + login)
    }

    function isValid(credentials) {

        if (!credentials.password || credentials.password.length == 0) {
            return false;
        }

        if (!credentials.login || credentials.login.length == 0) {
            return false;
        }

        return true;
    }

    this.signUp = function (credentials, callback) {

        User.findOne({login: credentials.login}, function(error, user) {

            if (!user) {

                if (!isValid(credentials)) {

                    if (callback) {
                        callback(['invalid credentials'], user);
                    }

                    return;
                }

                var user = new User({
                    login: credentials.login,
                    password: credentials.password,
                    token: [generateToken(credentials.login)]
                });

                user.save(function (error) {
                    if (callback) {
                        callback(error, user);
                    }
                });

                return;
            }

            if (callback) {
                callback(['login exists'], user);
            }
        });
    }

    this.signOut = function (credentials, callback) {

        User.findOne({_id:credentials.userId, token: credentials.token}, function (err, user) {

            if (user) {
                user.token.splice(user.token.indexOf(credentials.token), 1);
                user.save();
            }

            if (callback) {
                callback();
            }
        });
    }
};