import React from 'react';
import Header from './Header';
import { Container } from 'reactstrap';
import '../../scss/index.scss';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LayoutAdmin = ({ children }) => {
    const nameAdmin = localStorage.getItem('name');
    const [show, setShow] = useState(false);
    var navigate = useNavigate();

    useEffect(() => {
        if (nameAdmin == null) {
            navigate('/login');
            console.log('vo');
        } else {
            setShow(true);
        }
    }, []);

    return (
        <>
            {show && (
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
            )}
        </>
    );
};

export default LayoutAdmin;
