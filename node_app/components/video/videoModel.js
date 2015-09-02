"use strict";
var mongoose = require('./../../global/globalMongoose');

// schema
var videoSchema = mongoose.Schema({
    name: String,
    body: String,
    comments: [
        { body: String, date: Date }
    ],
    date: { type: Date, default: Date.now },
    protected: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
})



/*
catSchema.methods.apiFind = function (email, password, cb) {
    this.find(function (err, user) {
        if (!user) return fn(new Error('cannot find user'));
        if (user.password == hash(password, conf.secret)) return fn(null, user);
// Otherwise password is invalid
        fn(new Error('invalid password'));
    });

    this.find(function(err, obj) {
        if (err) { return cb(err); }
        return cb(obj);
    });


};
*/

/*UserSchema.statics.newUser = function (email, password, fn) {
    var instance = new User();
    instance.email = email;
    instance.password = hash(password, conf.secret);
    instance.save(function (err) {
        fn(err, instance);
    });
};*/



/*
// methods
catSchema.methods.speak = function () {
    var greeting = this.name
        ? "My name is " + this.name
        : "I don't have a name"
    console.log(greeting);
}*/

// models from schema
module.exports = mongoose.model('Video', videoSchema);


/*

 //
 // Remove
 //
 function remove (req, res, callback) {
 // db connection
 connect();
 var id = "" + req.params.id;
 Kitten.findOne({_id: id}, function(err, obj){
 if (err) {
 callback(err, null);
 return;
 }
 if(obj) {
 obj.remove()
 callback(null, "removed id:"+ id);
 } else {
 callback(null, "id not found");
 }
 })
 }
 module.exports.remove = remove;

 //
 // Save
 //
 function save (req, res, callback) {
 // db connection
 connect();
 var genName = "";
 //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

 for( var i=0; i < 5; i++ )
 genName += possible.charAt(Math.floor(Math.random() * possible.length));

 // Instance from model
 var k = new Kitten({ name: "calico-"+genName });

 // Save
 k.save(function (err, obj) {
 if (err) {
 callback(err, null);
 return;
 }
 callback(null, "saved:"+ k.name);
 });
 }
 module.exports.save = save;

 */
