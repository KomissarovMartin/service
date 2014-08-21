module.exports = function (res) {

    this.statuses = {
        success : 200,
        failed: 403
    };

    this.success = function (user) {
        res.status(self.statuses.success).send({
            userId : user._id,
            token  : user.token,
            login  : user.login
        });
    };

    this.failed = function (error) {
        res.status(self.statuses.failed).send({
            error: error
        });
    }

    var self = this;
};