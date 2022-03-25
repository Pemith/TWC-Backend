const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const multer=require('multer');

const storageEngine=multer.diskStorage({
    destination:'./public/uploads',
    filename: function(req,file,callback){
        callback(
            null,
            file.fieldname+'-'+Date.now()+path.extname(file.originalname)
        );
    },
});

const fileFilter=(req,file,callback)=>{
    let pattern=/jpg|png|svg|pdf/;

    if(pattern.test(path.extname(file.originalname))){
        callback(null,true);
    }else{
        callback('Error: not a valid file');
    }
};

const upload=multer({
    storage:storageEngine,
    fileFilter:fileFilter,
});

module.exports=storageEngine;
module.exports=fileFilter;
module.exports=upload;