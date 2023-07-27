import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <NavBar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;