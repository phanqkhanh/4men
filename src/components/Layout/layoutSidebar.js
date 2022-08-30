import Header from './Header/header';
import Footer from './Footer/footer';
import Sidebar from '../ProductsSidebar/productsSidebar';

function LayoutSidebar({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">{children}</div>
            <Sidebar />
            <Footer />
        </div>
    );
}
