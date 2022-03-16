const {Admin,validate}=require('../Models/admin');
const mongoose=require('mongoose');
const Joi=require('joi');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');


router.post('/signup',async(req,res) => {
    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let admin=await Admin.findOne({email:req.body.email});
    if(admin){
        return res.status(400).send('Admin is already registered');
    }

    admin=new Admin({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    const salt=await bcrypt.genSalt(10);
    admin.password=await bcrypt.hash(admin.password,salt);

    try {
        admin=await admin.save();
        res.send(admin);
    } catch (error) {
        console.log(error.message);
    }


});

module.exports=router;