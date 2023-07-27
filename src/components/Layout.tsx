import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;