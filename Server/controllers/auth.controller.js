const User=require("../Models/user.models");
const bcryptjs=require("bcryptjs");
const signup=async (req,res,next)=>{
    const {username,email,password}=req.body;
    if (!username || !email || !password || typeof password !== "string") {
        return res.status(400).send("Invalid input. Ensure all fields are provided and valid.");
    }
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashedPassword});
    try{
    await newUser.save();
    res.status(201).send("User Created Successfully");
    }catch(e){
        next(e);
    }

}
module.exports=signup;