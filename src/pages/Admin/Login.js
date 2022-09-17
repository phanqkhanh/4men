import React, { useState } from 'react';
import './scss/login.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API from '../../API';
import { Message } from '../../Notification';
import InputCode from './components/inputCode';
import ForgotPassword from './components/forgotPassword';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showRequired, setShowRequired] = useState(false);

    const [forgotPassword, setForgotPassword] = useState(false);

    let navigate = useNavigate();

    function handleLogin() {
        var data = JSON.stringify({
            UserName: username,
            Password: password,
        });
        console.log(data);
        var config = {
            method: 'post',
            url: `${API.baseURL}users`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setShowRequired(false);
                    Message('Đăng nhập thành công', 'success');
                    setTimeout(() => {
                        navigate('/san-pham', { replace: true });
                    }, 1500);
                    localStorage.setItem('name', response.data.toString());
                }
            })
            .catch(function (error) {
                setShowRequired(true);
                console.log(error);
            });
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    // const name = localStorage.getItem('name');
    // console.log(name);

    return (
        <section>
            {forgotPassword ? (
                // quên mật khẩu
                <ForgotPassword setForgotPassword={setForgotPassword} setShowRequiredLogin={setShowRequired} />
            ) : (
                <div id="loginform">
                    <h2 id="headerTitle">Đăng nhập</h2>
                    <div>
                        <div className="row">
                            <label>Tên đăng nhập</label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Nhập tên người dùng của bạn"
                                onKeyDown={(e) => handleEnter(e)}
                            />
                        </div>
                        <div className="row">
                            <label>Mật khẩu</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Nhập mật khẩu của bạn"
                                onKeyDown={(e) => handleEnter(e)}
                            />
                        </div>

                        {showRequired && (
                            <div className="row wrong" style={{ color: 'red' }}>
                                Sai tài khoản hoặc mật khẩu!
                            </div>
                        )}
                        <div id="button" className="row">
                            <button onClick={handleLogin}>Đăng nhập</button>
                        </div>
                        <div className="row">
                            <a
                                style={{ cursor: 'pointer' }}
                                className="forget-password"
                                onClick={() => setForgotPassword(true)}
                            >
                                Quên mật khẩu
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Login;
