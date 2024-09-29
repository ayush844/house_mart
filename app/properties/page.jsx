import Pagination from '@/components/Pagination';
import ProperyCard from '@/components/PropertyCard';

import connectDB from '@/config/database';

import Property from '@/models/Property';


const PropertiesPage = async ({searchParams : {page = 1, pageSize = 6}}) => {

    await connectDB();

    const skip = (page -1) * pageSize;

    const total = await Property.countDocuments({});

    const properties = await Property.find({}).sort({createdAt: -1}).skip(skip).limit(+pageSize);

      // Calculate if pagination is needed
    const showPagination = total > pageSize;



    return ( 
    <section className=' px-4 py-6 min-h-[90vh]'>
        <div className=' container-xl lg:container m-auto px-4 py-6'>
            {properties.length === 0 ? (<p>No Properties Found</p>) : (
                <div className=' grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {properties.map((property) => (
                        <ProperyCard key={property._id} property={property} />
                    ))}
                </div>
            )}

            {showPagination && (
                <Pagination
                page={parseInt(page)}
                pageSize={parseInt(pageSize)}
                totalItems={total}
                />
            )}


        </div>
    </section> );
}
 
export default PropertiesPage;