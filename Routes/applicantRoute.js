const {Applicant,validate}=require('../Models/applicant');
const mongoose=require('mongoose');
const Joi=require('joi');
const express=require('express');
const router=express.Router();


router.post('/register',async(req,res) =>{

    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let applicant=await Applicant.findOne({email:req.body.email});
    if(applicant){
        return res.status(400).send('You have already applied');
    }

    applicant =new Applicant({
        fullName:req.body.fullName,
        email:req.body.email
    });

    try{
        applicant=await applicant.save();
        res.send(applicant);
    }catch(ex){
        console.log(ex.message);
    }
});

module.exports=router;