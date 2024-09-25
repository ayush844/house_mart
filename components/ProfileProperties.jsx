'use client'

import deleteProperty from "@/app/actions/deleteProperty";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { toast } from "react-toastify";

const ProfileProperties = ({properties: initialProperties}) => {

    const [properties, setProperties] = useState(initialProperties);


    const handleDeleteProperty = async (propertId) => {
        const confirmed = window.confirm('Are you sure you want to delete this property?');
        
        if(!confirmed) return;

        await deleteProperty(propertId);

        const updatedProperty = properties.filter((property) =>property._id !== propertId);

        setProperties(updatedProperty);

        toast.success("property deleted successfully");
    }

    return properties.map(property => (
    <div key={property._id} className="mb-10">
        <Link href={`/properties/${property._id}`}>
          <Image
            className="h-32 w-full rounded-md object-cover"
            src={property.images[0]}
            width={1000}
            height={200}
            alt="Property"
            priority={true}
          />
        </Link>
        <div className="mt-2">
          <p className="text-lg font-semibold">{property.name}</p>
          <p className="text-gray-600">Address: {property.location.street} {property.location.city} {property.location.state}</p>
        </div>
        <div className="mt-2">
          <Link
            href={`/properties/${property._id}/edit`}
            className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
            type="button"
            onClick={() => handleDeleteProperty(property._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
}
 
export default ProfileProperties;