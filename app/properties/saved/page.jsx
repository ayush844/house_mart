import connectDB from "@/config/database";
import User from "@/models/User";
import ProperyCard from '@/components/PropertyCard';

import { getSessionUser } from "@/utils/getSessionUser";


const SavedProperty = async () => {
    await connectDB();

    const sessionUser = await getSessionUser();
  
    const { userId } = sessionUser;

    const {bookmarks} = await User.findById(userId).populate('bookmarks');

    return ( <section className=" px-4 py-6 min-h-[90vh]">
        <div className="container lg:container m-auto px-4 py-6">
            <h1 className=" text-2xl mb-4 "> Saved Properties</h1>

            {bookmarks.length === 0 ? (
                <p>No Saved Properties</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bookmarks.map((property) => (
                        <ProperyCard key={property._id} property={property} />
                    ))}
                </div>
            )}

        </div>
    </section>);
}
 
export default SavedProperty;