"use server"

import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";



async function contactOwner({ name, email, phone, message, propertyId }) {

    try {

        await connectDB();

        const sessionUser = await getSessionUser();
    
        if (!sessionUser || !sessionUser.userId) {
            throw new Error("User id is required");
        }
    
        const { user } = sessionUser;
    
        const property = await Property.findById(propertyId).populate('owner');
        const owner = await User.findById(property.owner._id);
    
        if (!owner) {
            throw new Error("Property owner not found");
        }


        return {success: true, email: owner.email}
    


        
    } catch (error) {
        return {success: false, message: error.message}
    }
 

}

export default contactOwner;
