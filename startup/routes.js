const path=require('path');
const bodyParser=require('body-parser');
const express=require('express');
const cors=require('cors');

// const user=require('../Routes/userRoute');
// const userAuth=require('../Routes/userAuthentication');

// const error=require('../middleware/error');

module.exports=function(app){
    app.use(express.json());
    // app.use('/api/user',cors(),user);
    // app.use('/api/user/login',cors(),userAuth);
    // app.use(error);
}