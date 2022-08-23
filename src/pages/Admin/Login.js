import React from 'react';
import './scss/login.scss';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <section>
            <div id="loginform">
                <h2 id="headerTitle">Đăng nhập</h2>
                <div>
                    <div className="row">
                        <label>Tên đăng nhập</label>
                        <input type="text" placeholder="Nhập tên người dùng của bạn" />
                    </div>
                    <div className="row">
                        <label>Mật khẩu</label>
                        <input type="password" placeholder="Nhập mật khẩu của bạn" />
                    </div>
                    <div id="button" className="row">
                        <button>Đăng nhập</button>
                    </div>
                    <div className="row">
                        <Link className="forget-password" to="/">
                            Quên mật khẩu
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
