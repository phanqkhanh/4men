import Header from './Header/header';
import Footer from './Footer/footer';

function Layout({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
