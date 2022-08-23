import React from 'react';
import Header from './Header';
import { Container } from 'reactstrap';
import '../../scss/index.scss';
import Sidebar from './Sidebar';

const LayoutAdmin = ({ children }) => {
    return (
        <div className="">
            <Header />
            <div
                style={{
                    padding: '50px 50px 30px 50px',
                    width: '82%',
                    marginLeft: '18%',
                    backgroundColor: '#f1f4f7',
                    minHeight: '100vh',
                }}
            >
                {children}
            </div>
            <Sidebar />
        </div>
    );
};

export default LayoutAdmin;
