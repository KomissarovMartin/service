module.exports = new (global._require('model/abstract'))().model('User', {
    login : String,
    password : String,
    token : Array,
    socket: Array
});


//var User = require('./models/user');
//
//var query = User;
//
//var userIds = [];
//
//query.find(function(err, user) {
//
//    user.forEach(function(user, index) {
//
//        userIds[index] = user._id;
//    });
//
//    User.find({_id:{$in:userIds.splice(1,3)}}, function(err, users){
//        users.forEach(function(user){
//            console.log(user._id);
//            console.log(user.name);
//        });
//    });
//
//});
