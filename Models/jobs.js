const mongoose=require('mongoose');
const config=require('config');
const Joi=require('joi');

const jobSchema=new mongoose.Schema({

    role:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
})

const job=mongoose.model('Job',jobSchema);


function validateJob(job){
    const schema=Joi.object({
        role:Joi.string().required(),
        description:Joi.string().required()
    }).options({abortEarly:false});

    return schema.validate(job);
}

exports.Job=job;
exports.validate=validateJob;
