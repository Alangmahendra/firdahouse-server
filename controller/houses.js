const Model = require('../models/houses')

class House {
    static findAllUser(req, res) {
        console.log('nininininininininiin',req.user)
        Model.find({
            owner: req.user._id
        }, (err, rows) => {
            if (err) {
                res.status(500).json({ message: err })
            } else {
                res.status(200).json({ message: `list home of user ${req.user.email}`, data: rows })
            }
        })
    }

    static findAll(req,res) {
        Model.find({}).populate('owner').exec((err,rows)=>{
            if(err){
                res.status(500).json({message : err})
            } else{
                res.status(200).json({message:`list of all adds`,data:rows})
            }
        })
    }

    static add(req, res) {
        console.log('masuk add',Number(req.body.long),Number(req.body.lat));
        
        let obj = {
            owner: req.user._id,
            title: req.body.title,
            cost: req.body.cost,
            description:req.body.description,
            location:{
                type:'Point',
                coordinates : [Number(req.body.long),Number(req.body.lat)]
            },
            image: req.file.cloudStoragePublicUrl
        }
        Model.create(obj, (err, rows) => {
            if (err) {
                console.log(err);

                res.status(500).json({ message: err })
            } else {
                res.status(200).json({ message: 'data has been created', data: rows })
            }
        })
    }


    static remove(req, res) {
        Model.findByIdAndRemove(req.params.id, (err, rows) => {
            if (err) {
                res.status(500).json({ message: err })
            } else {
                res.status(200).json({ message: 'data has been removed', data: rows })
            }
        })
    }

    static update(req, res) {
        let obj = {
            title: req.body.title,
            cost: req.body.cost,
            description:req.body.description,
            location:{
                type:'Point',
                coordinates : [Number(req.body.long),Number(req.body.lat)]
            },
            image: req.file.cloudStoragePublicUrl
        }
        Model.findByIdAndUpdate(req.params.id, obj, (err, rows) => {
            if (err) {
                res.status(500).json({ message: err })
            } else {
                res.status(200).json({ message: 'data has been update', data: rows })
            }
        })
    }

    static findOne(req, res) {
        Model.findById(req.params.id).populate('owner').exec((err,rows)=>{
            if (err) {
                res.status(500).json({ message: err })
            } else {
                res.status(200).json({ message: 'data has finded', data: rows })
            }
        })
    }

}
module.exports = House