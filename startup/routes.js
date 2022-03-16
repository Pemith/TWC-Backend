const path=require('path');
const bodyParser=require('body-parser');
const express=require('express');
const cors=require('cors');

const applicant=require('../Routes/applicantRoute');
const admin=require('../Routes/adminRoute');
const adminAuth=require('../Routes/adminAuthentication');

const error=require('../middleware/error');

module.exports=function(app){
    app.use(express.json());
    app.use('/career',cors(),applicant);
    app.use('/admin',cors(),admin);
    app.use('/admin',adminAuth);
    app.use(error);
}