const Model = require('../models/houses')

class House {
    static findAll (req,res){
        // console.log(req.user)
        Model.find({
            owner:req.user._id
        },(err,rows)=>{
            if(err){
                res.status(500).json({message:err})
            } else{
                res.status(200).json({message:`list home of user ${req.user.email}`,data:rows})
            }
        })
    }

    static add (req,res){
        console.log('masuk add');
        
        let obj = {
            owner   :req.user._id,
            title   :req.body.title,
            cost    :req.body.cost,
            image   :req.file.cloudStoragePublicUrl
        }
        Model.create(obj,(err,rows)=>{
            if (err){
                console.log(err);
                
                res.status(500).json({message:err})
            } else {
                res.status(200).json({message:'data has been created',data:rows})
            }
        })
    }


    static remove (req,res){
        Model.findByIdAndRemove(req.params.id,(err,rows)=>{
            if(err){
                res.status(500).json({message:err})
            } else {
                res.status(200).json({message:'data has been removed',data:rows})
            }
        })
    }

    static update(req,res){
        let obj = {
            title : req.body.title,
            cost  : req.body.cost,
            image : req.file.cloudStoragePublicUrl
        }
        Model.findByIdAndUpdate(req.params.id,obj,(err,rows)=>{
            if(err){
                res.status(500).json({message:err})
            } else{
                res.status(200).json({message:'data has been update',data:rows})
            }
        })
    }

    
}
module.exports = House