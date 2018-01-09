const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var userSchema = new Schema({
    email       : {
        type : String,
    required : true
},
    password    :  {
        type : String,
    required : true
},
},{timestamps:{}});

let UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;