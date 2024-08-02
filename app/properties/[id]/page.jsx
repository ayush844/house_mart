'use client'

import { useRouter, useParams, useSearchParams, usePathname } from "next/navigation";

const PropertyPage = () => {
    const router = useRouter();

    const params = useParams();

    const searchParams = useSearchParams();

    const pathname = usePathname();



    console.log(router)

    // back: ()=>window.history.back()
    // fastRefresh: ()=> {…}
    // forward:()=>window.history.forward()
    // prefetch: (href, options)=> {…}
    // push:(href, options)=> {…}
    // refresh: ()=> {…}
    // replace: (href, options)=> {…}


   // http://localhost:3000/properties/123456
    console.log(typeof(params.id)); // string
// we are using id because this is what is the name of the folder => [id]



    console.log('Property page component');

    return ( <div>


        <h1>the param is {params.id}</h1> 
        {/* http://localhost:3000/properties/123456 */}
        {/* 123456 */}



        <h1>the search param is {searchParams.get('name')}</h1>
        {/* http://localhost:3000/properties/123456?name=ayush */}
        {/* the search param is ayush */}



        <h1>the pathname is {pathname}</h1>
        {/* http://localhost:3000/properties/123456?name=ayush */}
        {/* the pathname is /properties/123456 */}
        

        <button onClick={() => router.replace('/')}>
            Go Home
        </button>
    </div> );
}
 
export default PropertyPage;