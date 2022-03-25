const mongoose=require('mongoose');
const Joi=require('joi');
const config=require('config');
const jwt=require('jsonwebtoken');
const { validate } = require('./applicant');

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:255
    }
});


adminSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email
    },
    config.get('jwtPrivateKey'));

    return token;
}

const admin=mongoose.model('Admin',adminSchema);

function validateAdmin(adminVal){
    const schema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().min(8).max(255).required()
    }).options({abortEarly:false});

    return schema.validate(adminVal);
}

exports.Admin=admin;
exports.validate=validateAdmin;
