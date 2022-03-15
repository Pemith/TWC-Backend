const mongoose=require('mongoose');
const Joi=require('joi');
const config=require('config');

const applicantSchema=new mongoose.Schema({

    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    }
});

const applicant=mongoose.model('Applicant',applicantSchema);

function validateApplicant(applicant){

    const schema=Joi.object({
        fullName:Joi.string().required(),
        email:Joi.string().required()
    }).options({abortEarly:false});

    return schema.validate(applicant);
}

exports.Applicant=applicant;
exports.validate=validateApplicant;
