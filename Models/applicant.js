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
    },
    mobile:{
        type:String,
        minlength:9,
        maxlength:10
    }
});

const applicant=mongoose.model('Applicant',applicantSchema);

function validateApplicant(applicant){

    const schema=Joi.object({
        fullName:Joi.string().required(),
        email:Joi.string().required(),
        mobile:Joi.string().min(9).max(10).required()
    }).options({abortEarly:false});

    return schema.validate(applicant);
}

exports.Applicant=applicant;
exports.validate=validateApplicant;
