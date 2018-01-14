const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var houseSchema = new Schema({
    owner       : {
        type : Schema.Types.ObjectId,
        ref  : 'User'
    },
    title       :  String,
    cost        :  String,
    image       :  String,
    description : String,
    location    : {
        type : {
            type: String
        },
        coordinates:[]
    }
},{timestamps:{}});



houseSchema.index({ 
    "location": "2dsphere",
  })

let HousesModel = mongoose.model('House', houseSchema);
module.exports = HousesModel;