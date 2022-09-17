import InputCode from './inputCode';
import { useState } from 'react';
import axios from 'axios';
import API from '../../../API';
import { Message } from '../../../Notification';

const ForgotPassword = ({ setForgotPassword, setShowRequiredLogin }) => {
    const [showInputCode, setShowInputCode] = useState(false);
    const [textSend, setTextSend] = useState(false);
    const [time, setTime] = useState(30);
    const [loader, setLoader] = useState(false);
    const [showRequired, setShowRequired] = useState(false);

    const [RequiredEmail, setRequiredEmail] = useState(false);
    const [inputPasswordNew, setInputPasswordNew] = useState(false);
    const [requiredPassword, setRequiredPassword] = useState(false);

    const [email, setEmail] = useState();
    const [code, setCode] = useState([...Array(6)].map(() => ''));
    const [passwordNew, setPasswordNew] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    function handleSendEmail() {
        var config = {
            method: 'post',
            url: `${API.baseURL}Verification/sendcode/${email}`,
            headers: {},
        };
        setLoader(true);
        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setLoader(false);
                    setRequiredEmail(false);
                    setShowInputCode(true);
                    setTextSend(true);
                    Waiting();
                } else {
                    setRequiredEmail(true);
                }
            })
            .catch(function (error) {
                setRequiredEmail(true);
                setLoader(false);
                console.log(error);
            });
    }

    function handleSenCode() {
        var Code = Number(code.toString().replace(/,/g, ''));
        var data = JSON.stringify({
            Email: email,
            Code: Code,
        });
        setLoader(true);
        var config = {
            method: 'post',
            url: `${API.baseURL}Verification/checkcode`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setLoader(false);
                    setInputPasswordNew(true);
                    setShowRequired(false);
                }
            })
            .catch(function (error) {
                // console.log(error);
                setLoader(false);
                setShowRequired(true);
            });
    }

    function handleChangePassword() {
        if (passwordNew == retypePassword) {
            if (passwordNew != '') {
                setRequiredPassword(false);
                var data = JSON.stringify({
                    Email: email,
                    Password: passwordNew,
                });
                console.log(data);
                setLoader(true);
                var config = {
                    method: 'put',
                    url: `${API.baseURL}users`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data,
                };

                axios(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            setLoader(false);
                            // setShowRequired(false);
                            Message('Đổi mật khẩu thành công', 'success');
                            setShowRequiredLogin(false);
                            setTimeout(() => {
                                setForgotPassword(false);
                            }, 1000);
                        }
                    })
                    .catch(function (error) {
                        Message('Đổi mật khẩu thất bại', 'error');
                        setLoader(false);
                        // setShowRequired(true);
                    });
            }
        } else {
            setRequiredPassword(true);
        }
    }

    function Waiting() {
        var i = 30;
        const myInterval = setInterval(() => {
            i--;
            if (i <= 0) {
                setTextSend(false);
                setTime(30);
                clearInterval(myInterval);
                i = 30;
            } else {
                setTime((prev) => prev - 1);
            }
        }, 1000);
    }
    return (
        <>
            <div id="loginform" style={{ position: 'relative' }}>
                <h2 id="headerTitle">Quên mật khẩu</h2>
                {loader && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                        <span class="loader2"></span>
                    </div>
                )}

                <i
                    className="fa-sharp fa-solid fa-arrow-left"
                    style={{ position: 'absolute', top: '25px', left: '15px', fontSize: '25px', cursor: 'pointer' }}
                    onClick={() => setForgotPassword(false)}
                ></i>

                {!inputPasswordNew ? (
                    <div>
                        <div className="row">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="Nhập email của bạn"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div id="button" className="send-code">
                            <button
                                onClick={() => {
                                    handleSendEmail();
                                }}
                                disabled={textSend}
                            >
                                {textSend ? 'Gửi lại sau' : 'Gửi mã code'}
                                {textSend && (
                                    <>
                                        <span class="loader"></span>
                                        <p style={{ margin: '0px', width: '23px' }}>{time}s</p>
                                    </>
                                )}
                            </button>
                        </div>
                        {showInputCode && (
                            <>
                                <InputCode length={6} label="Nhập mã code gồm 6 số" code={code} setCode={setCode} />
                                <div id="button" className="row">
                                    <button onClick={handleSenCode}>Xác thực</button>
                                </div>
                            </>
                        )}
                        {showRequired && (
                            <div className="row wrong" style={{ color: 'red' }}>
                                Mã code không đúng!
                            </div>
                        )}
                        {RequiredEmail && (
                            <div className="row wrong" style={{ color: 'red' }}>
                                Email không đúng!
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <div className="row">
                            <label>Mật khẩu mới</label>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu của bạn"
                                onChange={(e) => setPasswordNew(e.target.value)}
                                value={passwordNew}
                            />
                        </div>
                        <div className="row">
                            <label>Nhập lại khẩu mới</label>
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu của bạn"
                                onChange={(e) => setRetypePassword(e.target.value)}
                                value={retypePassword}
                            />
                        </div>
                        <div id="button" className="row">
                            <button onClick={handleChangePassword}>Đổi mật khẩu</button>
                        </div>
                        {requiredPassword && (
                            <div className="row wrong" style={{ color: 'red' }}>
                                Mật khẩu không khớp!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ForgotPassword;
