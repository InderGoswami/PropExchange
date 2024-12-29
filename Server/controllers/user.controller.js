import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../Models/user.models.js'

export const test=(req,res)=>{
    res.json({
        message:'Hello World!',
    });
}



export const updateUser = async (req, res, next) => {
  try {
    // Check if the logged-in user matches the user to be updated
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account'));
    }

    // Hash password if provided
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Exclude password from the response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      user: rest,
    });
  } catch (error) {
    next(error); // Ensure error is passed to the error-handling middleware
  }
};
