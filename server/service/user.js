module.exports = function ( ) {

    var self = this;
    var User = global._require('model/user');

    this.signInWithToken = function (credentials, callback) {

        User.findOne({_id: credentials.userId}, function (error, _userModel) {

            var userModel = null;

            if (_userModel && _userModel.token.indexOf(credentials.token) !== -1) {
                userModel = _userModel;
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

        User.findOne(cond, function (error, userModel) {

            if (userModel) {
                userModel.token.push(generateToken(userModel.login));
                userModel.save();
            }

            if (callback) {
                callback(userModel);
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

        User.findOne({login: credentials.login}, function(error, userModel) {

            if (!userModel) {

                if (!isValid(credentials)) {

                    if (callback) {
                        callback(['invalid credentials'], userModel);
                    }

                    return;
                }

                var userModel = new User({
                    login: credentials.login,
                    password: credentials.password,
                    token: [generateToken(credentials.login)]
                });

                userModel.save(function (error) {
                    if (callback) {
                        callback(error, userModel);
                    }
                });

                return;
            }

            if (callback) {
                callback(['login exists'], userModel);
            }
        });
    }

    this.signOut = function (credentials, callback) {

        User.findOne({_id:credentials.userId, token: credentials.token}, function (err, userModel) {

            if (userModel) {
                userModel.token.splice(userModel.token.indexOf(credentials.token), 1);
                userModel.save();
            }

            if (callback) {
                callback();
            }
        });
    }
};