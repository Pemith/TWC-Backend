const path=require('path');
const bodyParser=require('body-parser');
const express=require('express');
const cors=require('cors');

const applicant=require('../Routes/applicantRoute');

// const error=require('../middleware/error');

module.exports=function(app){
    app.use(express.json());
    app.use('/career',cors(),applicant);
    // app.use('/api/user/login',cors(),userAuth);
    // app.use(error);
}