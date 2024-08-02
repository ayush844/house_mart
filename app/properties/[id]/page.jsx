
const PropertyPage = ({params, searchParams}) => {

    return ( <div>

        particular property page

        {/* http://localhost:3000/properties/123456?name=ayush */}

        <br />

        {/* getting params in server component */}

        {params.id}

        {/* 123456 */}

        <br />

        {/* getting search params in server component */}

        {searchParams.name}

        {/* ayush */}




    </div> );
}
 
export default PropertyPage;