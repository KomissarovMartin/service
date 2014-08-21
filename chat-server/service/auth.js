module.exports = function () {

    this.signIn = function (login, password) {

        var user = global._require('model/user');

        console.log(user);

        return 1;
    };
};