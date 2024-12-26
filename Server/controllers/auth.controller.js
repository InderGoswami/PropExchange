import User from "../Models/user.models.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"; // Import as default

const signup=async (req,res,next)=>{
    const {username,email,password}=req.body;
    if (!username || !email || !password || typeof password !== "string") {
        return res.status(400).send("Invalid input. Ensure all fields are provided and valid.");
    }
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashedPassword});
    try{
    await newUser.save();
    res.status(201).send({
        "success": true,
        "message": "Signup successfully."
      }
      );
    }catch(e){
        next(errorHandler(550,'error from this function'));
    }

}
export default signup;
export const signin=async(req,res,next)=>{
    
    const {email,password}=req.body;
    try{
        const validUser=await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not found"));
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong Credentials'));
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=validUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    }catch(error){
        next(error);
    }
}