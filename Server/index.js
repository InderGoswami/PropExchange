import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // This loads variables from your .env file



mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected To DB");

}).catch((err)=>{
    console.log(err);
    }
)
const app=express();

app.use(express.json());
app.listen(3000,()=>{
    console.log("Port working fine")
})
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message ||'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
    

})
;