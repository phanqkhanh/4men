import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from './components/GlobalStyles/ScrollToTop';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((router, index) => {
                            const Page = router.component;
                            const Layout = router.layout;
                            return (
                                <Route
                                    key={index}
                                    path={router.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
                {/* <Notify /> */}
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;
