const authRouter =require('./routes/auth.route.js')
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

app.listen(8080,()=>{
    console.log("Port working fine")
})
app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.use(express.json());
app.use('/api/auth',authRouter);
