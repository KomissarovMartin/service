module.exports = function (response) {

    this.statuses = {
        success: {
            code: 200
        },
        wrongXAuth: {
            code: 403,
            message: 'wrong x-auth param'
        },
        wrongToken: {
            code: 404,
            message: 'wrong token or user id'
        }
    };

    this.success = function (user) {
        response
            .status(self.statuses.success)
            .send({
                userId : user._id,
                token  : user.token,
                login  : user.login
            }).close();
    };

    this.failed = function (error) {

        response.status(error['code']);
        response.send({
            error: error['message']
        });
    }

    var self = this;
};