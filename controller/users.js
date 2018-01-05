const Model = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
require('dotenv').config()

class User{

    static signup(req,res){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                let obj = {
                    name      : req.body.name,
                    email     : req.body.email,
                    password  : hash,
                }
                Model.create(obj,(err,rows)=>{
                    if (err){
                        res.status(500).json({message:`error pak`})
                    }
                    else {
                        res.status(200).json({message:'user has been created',data:rows})
                    }
                })
            });
        });
    }

    static signin(req,res){
        console.log('masuk signin')
        Model.findOne({email:req.body.email},function(err,user){
            console.log('=========== bawah model')
            if (err){
                console.log(err)
                res.status(500).json({message:err.message})
            }
            else {
                console.log('masuk else')
                bcrypt.compare(req.body.password,user.password,function(err,data){
                    if (!err){
                        let payload = {
                            _id   : user._id, 
                            email : user.email
                        }
                        jwt.sign(payload,process.env.SECRET_KEY,function(err,token){
                            if(err){
                                res.status(500).json({message:err.message})
                            } else{
                                res.status(200).json({message:'user has been login',token:token,user:user})
                            }
                        })
                    } 
                    else{
                        res.status(500).json({message:err.message})
                    }  
                })
            }
        })
    }


    static findAll(req,res){
        Model.find({},(err,rows)=>{
            if (err){
                res.status(500).json({message:err})
            } else {
                res.status(200).json({message:'your list of user',data:rows})
            }
        })
    }

    static remove(req,res){
        Model.findByIdAndRemove(req.params.id,(err,rows)=>{
            if(err){
                res.status(500).json({message:err})
            } else {
                res.status(200).json({message:'data has removed',data:rows})
            }
        })
    }

    static update(req,res){
        let obj ={
            email : req.body.email,
            password : req.body.password
        }
        Model.findByIdAndUpdate(req.params.id,obj,(err,rows)=>{
            if(err){
                res.status(500).json({message:err})
            } else {
                res.status(200).json({message:'data has been update',data:rows})
            }
        })
    }

    static findone(req,res){
        Model.findById(req.params.id,(err,rows)=>{
            if (err){
                res.status(500).json({message:err})
            } else {
                res.status(200).json({message:'this is your search result',data:rows})
            }
        })
    }

}
module.exports=User;