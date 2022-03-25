const {Job,validate}=require('../Models/jobs');
const mongoose=require('mongoose');
const Joi=require('joi');
const express=require('express');
const router=express.Router();
const authz=require('../middleware/adminAuthorization');

router.post('/job',authz,async(req,res) =>{
    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);

    }

    let job;
    job=new Job({
        role:req.body.role,
        description:req.body.description
    });

    try {
        job=await job.save();
        res.send(job);
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/jobs', async(req,res) =>{

    const job=await Job
        .find()
        .select('-__v');

    res.send(job);
})

router.get('/jobs/:id',async(req,res) =>{
    
    const job=await Job
        .findById(req.params.id)
        .select('-__v');
    
    if(!job){
        return res.status(400).send('Not found');
    }

    res.send(job);
});

module.exports=router;