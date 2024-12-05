const express=require("express");
const mongoose=require("mongoose");
require('dotenv').config(); // This loads variables from your .env file


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected To DB");

}).catch((err)=>{
    console.log(err);
    }
)
const app=express();

app.listen(3000,()=>{
    console.log("Port working fine")
})