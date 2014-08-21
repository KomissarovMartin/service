module.exports = function () {

    var self = this;
    var User = global._require('model/user');

    var successCallback = null,
        failedCallback = null;

    var userCredentials = {
        login: null,
        password: null
    };

    var userHeaderCredentials = {
        token: null,
        userId: null
    };

    this.success = function (callback) {
        successCallback = callback;
        return self;
    };

    this.failed = function (callback) {
        failedCallback = callback;
        return self;
    }

    this.setCredentials = function (login, password) {
        userCredentials.login = login;
        userCredentials.password = password;
        return self;
    }

    this.setUserHeaderCredentials = function (token, userId) {
        userHeaderCredentials.token = token;
        userHeaderCredentials.userId = userId;
        return this;
    };

    this.signInWithToken = function () {

        condition = {
            _id: userHeaderCredentials.userId
        };

        User.findOne(condition, function (err, user) {
            if (user && user.token.indexOf(userHeaderCredentials.token) !== -1) {
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

    this.signOut = function () {
        User.findOne({_id:userHeaderCredentials.userId}, function (err, user) {
            if (user) {
                delete user.token[user.token.indexOf(userHeaderCredentials.token)];
                user.save();
            }
        });
    }
};