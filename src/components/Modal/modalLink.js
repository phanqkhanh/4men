import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './modalStyles.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/slice';
import { useNavigate } from 'react-router-dom';
import API from '../../API';

const cx = classNames.bind(styles);

const ModalLink = (props) => {
    const navigate = useNavigate();
    const [size, setSize] = useState(props.size.split(',').length > 1 ? '' : 'Free');
    const [amount, setAmount] = useState(1);
    const [showWarning, setShowWarning] = useState(false);
    var { modal, callback, complete, ...product } = props;
    const dispatch = useDispatch();

    function More() {
        setAmount((prev) => prev + 1);
    }
    function Less() {
        setAmount(function (prev) {
            if (prev > 1) {
                return prev - 1;
            } else {
                return prev;
            }
        });
    }
    var sizeOption = size;
    function handleAddCart(check) {
        if (size == '' || size == 'default') {
            setShowWarning(true);
        } else {
            const { size, ...rest } = product;
            rest.sizeOption = sizeOption;
            rest.amount = amount;
            const actions = addCart(rest);
            // console.log(rest);
            dispatch(actions);
            callback();

            if (check == true) {
                navigate('/dat-hang');
            } else {
                complete();
            }
        }
    }
    return (
        <div>
            <Modal fullscreen="sm" size="lg" isOpen={props.modal} toggle={props.callback}>
                <ModalBody>
                    <div className={cx('modal-body-list')}>
                        <img src={API.imgURL + props.img} />
                        <div className={cx('modal-info')}>
                            <h5>{props.title}</h5>
                            <p>
                                Giá bán: <span>{props.price} đ</span>
                            </p>
                            <div className={cx('options')}>
                                <div className={cx('size')}>
                                    <p>Chọn kích cỡ</p>
                                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                                        {props.size.split(',').length > 1 ? (
                                            <>
                                                <option value="default">Size</option>
                                                {props.size.split(',').map((item, index) => (
                                                    <option value={item} key={index}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </>
                                        ) : (
                                            <option value="Free">Free</option>
                                        )}
                                    </select>
                                    {console.log(props.size.split(','))}
                                </div>
                                <div className={cx('amount')}>
                                    <p>Số lượng</p>
                                    <div>
                                        <button className="amount-btn" onClick={Less}>
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                        <button disabled>{amount}</button>
                                        <button className="amount-btn" onClick={More}>
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('action')}>
                                <button
                                    className={cx('order-link')}
                                    onClick={() => {
                                        handleAddCart(true);
                                    }}
                                >
                                    Mua
                                </button>
                                <button
                                    onClick={() => {
                                        handleAddCart(false);
                                    }}
                                >
                                    Thêm vào giỏ
                                </button>
                            </div>
                            {showWarning && (
                                <div className={cx('warning')}>
                                    <p>Bạn chưa chọn size!!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={function noRefCheck() {}}>
                        Do Something
                    </Button>{' '} */}
                    <Button onClick={props.callback}>Thoát</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default memo(ModalLink);
