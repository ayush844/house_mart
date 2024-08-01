import Link from "next/link";


const HomePage = () => {
    return ( 
    <div>
        <h1 className=" text-3xl">Welcome Home</h1>
        <Link href={
            {
                pathname: 'properties',
                query: {name: 'test'}
            }
        }>Go To Properties</Link>
    </div> );
}
 
export default HomePage;