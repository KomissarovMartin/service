module.exports = function (response) {

    this.statuses = {
        success : 200,
        failed: 403
    };

    this.success = function (user) {
        response
            .status(self.statuses.success)
            .send({
                userId : user._id,
                token  : user.token,
                login  : user.login
            });
    };

    this.failed = function (error) {
        response
            .status(self.statuses.failed)
            .send({
                error: error
            });
    }

    this.signOut = function() {
        response.send({});
    }

    var self = this;
};