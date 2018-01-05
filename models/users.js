const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var userSchema = new Schema({
    name        :  String,
    email       :  String,
    password    :  String,
},{timestamps:{}});

let UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;