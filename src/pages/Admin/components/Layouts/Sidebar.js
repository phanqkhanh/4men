import React from 'react';
import img from '../../../../assets/footer-map.jpg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const sidebarNav = [
    {
        title: 'Quản lí sản phẩm',
        path: '/san-pham',
        icon: 'fa-solid fa-database',
    },
    {
        title: 'Thêm mới',
        path: '/them-san-pham',
        icon: 'fa-solid fa-folder-plus',
    },
    {
        title: 'Cài đặt',
        path: '/cai-dat',
        icon: 'fa-solid fa-gear',
    },
    {
        title: 'Đăng xuất',
        path: '/',
        icon: 'fa-solid fa-power-off',
    },
];

const Sidebar = () => {
    const [active, setActive] = useState();
    var path = useLocation();
    console.log(path.pathname);
    useEffect(() => {
        sidebarNav.map((item, index) => {
            if (path.pathname == item.path) {
                setActive(index);
            }
        });
    }, []);

    return (
        <div className="sidebar-admin">
            <div className="profile-sidebar">
                <div className="avatar">
                    <img src={img} />
                </div>
                <div className="profile-title">
                    <h3>Khanh</h3>
                    <div className="profile-status">
                        <span className="indicator"></span>
                        ONLINE
                    </div>
                </div>
            </div>
            <div className="sidebar-nav">
                <ul className="sidebar-menu">
                    {sidebarNav &&
                        sidebarNav.map((item, index) => (
                            <li
                                key={index}
                                className="sidebar-menu-item"
                                onClick={() => setActive(index)}
                                style={{
                                    backgroundColor: active == index ? 'rgb(48, 165, 255)' : '',
                                }}
                            >
                                <Link to={item.path} style={{ color: active == index ? 'rgb(255, 255, 255)' : '' }}>
                                    <i className={item.icon}></i>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
