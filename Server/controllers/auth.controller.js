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
        next(e);
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
export const google = async (req, res, next) => {
    try {
        // Check if the user already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // Generate a JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            // Exclude password from the response
            const { password, ...rest } = user._doc;
            // Send response with JWT cookie
            res.cookie('access_token', token, { httpOnly: true })
               .status(200)
               .json(rest);
        } else {
            // Generate a random password
            const generatePass = Math.random().toString(36).slice(-12);
            const hashPass = bcryptjs.hashSync(generatePass, 10);

            // Create a new user
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashPass,
                avatar: req.body.photo,
            });
            await newUser.save();

            // Generate a JWT token for the new user
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;

            // Send response with JWT cookie
            res.cookie('access_token', token, { httpOnly: true })
               .status(200)
               .json(rest);
        }
    } catch (error) {
        next(error);
    }
};
