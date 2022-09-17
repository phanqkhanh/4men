import Header from './Header/header';
import Footer from './Footer/footer';
import { useEffect } from 'react';

function Layout({ children }) {
    useEffect(() => {
        localStorage.removeItem('name');
    }, []);
    return (
        <div className="wrapper">
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
