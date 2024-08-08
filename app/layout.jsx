import '@/assets/styles/globals.css'
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';

import Navbar from '@/components/Navbar';

export const metadata = {
    title: 'House Mart',
    keywords: 'rental, property, real estate',
    description: 'Find the perfect rental property',
}


const MainLayout = ({children}) => {
    return ( 
    <AuthProvider>
    <html>
        <body>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </body>
    </html> 
    </AuthProvider>
    );
}
 
export default MainLayout;