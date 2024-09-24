'use server'

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import cloudinary from "@/config/cloudinary";



async function addProperty(formData){

    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error("User id is required");
    }

    const {userId} = sessionUser;

    // accessing all vlues from amenities and images
    // [we are accesssing trough names of the fields]
    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images').filter(image => image.name !== '')
    
    const propertData = {
        owner: userId,
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode')
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates: {
            nightly: formData.get('rates.nightly'),
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        }
    }

    const imageUrls = [];

    for(const imageFile of images){
        const imageBuffer = await imageFile.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);

        // convert to base 64
        const imageBase64 = imageData.toString('base64');

        // make request to cloudinary
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
            folder: 'house_mart'
        });

        imageUrls.push(result.secure_url);
    }

    propertData.images = imageUrls;


    const newProperty = new Property(propertData);
    await newProperty.save();

    revalidatePath('/', 'layout');

    redirect(`/properties/${newProperty._id}`);


}


export default addProperty;