var User = require('./models/user');

//User.create([
//    {name: 'Edward1'},
//    {name: 'Edward2'},
//    {name: 'Edward3'},
//    {name: 'Edward4'},
//    {name: 'Edward5'},
//    {name: 'Edward6'},
//    {name: 'Edward7'}
//]);

var query = User;

var userIds = [];

query.find(function(err, user) {

    user.forEach(function(user, index) {

        userIds[index] = user._id;
    });

    User.find({_id:{$in:userIds.splice(1,3)}}, function(err, users){
        users.forEach(function(user){
            console.log(user._id);
            console.log(user.name);
        });
    });

});