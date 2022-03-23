const {Admin}=require('../Models/admins');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const Joi=require('joi');
const express=require('express');
const router=express.Router();
const _=require('lodash');


router.post('/login', async (req,res) => {
    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const admin=await Admin.findOne({email:req.body.email});
    if(!admin){
        return res.status(400).send('Invalid email or password');
    }

    const validPassword=await bcrypt.compare(req.body.password,admin.password);
    if(!validPassword){
        return res.status(400).send("Invalid email or password");
    }

    const token=admin.generateAuthToken();

    res
        .header("X-auth-token",token)
        .header("access-control-expose-headers","x-auth-token")
        .send(_.pick(admin,["_id","name","email"]));
});

function validate(req){
    const schema=Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().min(8).max(255).required()
    }).options({abortEarly:false});

    return schema.validate(req);
}

module.exports=router;