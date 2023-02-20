import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.png';
import Notify from '../Notify/Notify';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const nameAdmin = localStorage.getItem('name');

    return (
        <header className="header-admin" style={{ zIndex: 999 }}>
            <div>
                <div className="logo">
                    <Link to="/san-pham">
                        <img src={logo} />
                    </Link>
                </div>
            </div>
            <div className="header-right-admin">
                {/* <div className="notify">
                    <i className="fa-solid fa-bell"></i>
                    <input value="1" disabled />
                </div> */}
                <div>
                    <h3 style={{ marginTop: '5px' }}>Hello Admin</h3>
                </div>
            </div>
        </header>
    );
};

export default Header;
