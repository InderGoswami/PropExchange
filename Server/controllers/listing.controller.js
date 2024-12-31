import Listing from "../Models/listing.model.js";
import { errorHandler } from "../utils/error.js";
export const createListing =async(req,res,next)=>{
    try{
      
        const listing=await Listing.create(req.body);
        return res.status(201).json(listing);

    }catch(error){
        next(error);
    }
}
export const deleteListing =async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,'Listing not found!'));
    }
    if(req.user.id!==listing.userRef){
        return next(errorHandler(401,'You can only delete your own account'));
    }
    try{
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');
    }catch(error){
        next(error);
    }
}
export const updateListing=async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,'Listing not found!'));
    }
    if(req.user.id!=listing.userRef){
        return next(errorHandler(401,'You can only update your own listings!'));
    }
    try{
        const updatedListing=await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updatedListing);


    }catch(error){
        next(error);
    }

}
export const getListing=async(req,res,next)=>{
    try{
        const listing=await Listing.findById(req.params.id);
        if(!listing){
            return next(errorHandler(404,"Listing not found"));
        }
        res.status(200).json(listing);
    }catch(error){
        next(error);
    }

}
export const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0; // Default to start from the first listing
      let offer = req.query.offer;
      let furnished = req.query.furnished;
      let parking = req.query.parking;
      let type = req.query.type;
  
      // Filter by offer (true/false), default to both true and false
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      } else if (offer === 'true') {
        offer = true;
      }
  
      // Filter by furnished (true/false), default to both true and false
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      } else if (furnished === 'true') {
        furnished = true;
      }
  
      // Filter by parking (true/false), default to both true and false
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      } else if (parking === 'true') {
        parking = true;
      }
  
      // Filter by type (sale/rent/all), default to both sale and rent
      if (type === 'undefined' || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
      const sort = req.query.sort || 'createdAt'; // Default to createdAt if not specified
      const order = req.query.order === 'asc' ? 1 : -1; // 'asc' or 'desc' maps to 1 or -1
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' }, // Case-insensitive search by name
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order }) // Sorting based on the `sort` field and `order`
        .limit(limit) // Limit the number of listings per page
        .skip(startIndex); // Skip the listings based on the start index (pagination)
  
      return res.status(200).json(listings); // Return the listings
    } catch (error) {
      next(error); // Pass the error to the next middleware (e.g., error handling middleware)
    }
  };
  