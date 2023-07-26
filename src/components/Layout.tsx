import { Anton } from 'next/font/google'

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const anton = Anton({ weight: '400', subsets: ['latin'] })

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={`${anton.className}`}>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;