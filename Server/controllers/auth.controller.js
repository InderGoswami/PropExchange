const User=require("../Models/user.models");
const signup=async (req,res)=>{
    const {username,email,password}=req.body;
    const newUser=new User({username,email,password});
    await newUser.save();
    res.status(201).send("User Created Successfully");

}
module.exports=signup;