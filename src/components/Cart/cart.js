import classNames from 'classnames/bind';
import styles from './cartStyles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import img from '../../assets/ao-so-mi.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, memo, useRef } from 'react';
import { removeCart } from '../../redux/slice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

const Cart = () => {
    const productsCart = useSelector((state) => state.cart);
    var lsProducts = [];
    productsCart.map((product) => {
        lsProducts.push(product);
    });
    const dispatch = useDispatch();
    const [showTotal, setShowTotal] = useState(false);
    // const [amount, setAmount] = useState(0);

    useEffect(() => {
        if (productsCart.length > 0) {
            setShowTotal(true);
            // setAmount(productsCart.length);
        } else {
            setShowTotal(false);
        }
    }, [productsCart.length]);

    function handleTotalAmount() {
        var total = 0;
        productsCart.map((product) => {
            total = total + product.amount;
        });
        return total;
        // console.log('doi');
    }
    function handleTotalMoney() {
        var total = 0;
        productsCart.map((product) => {
            total = total + product.amount * Number(product.price.replace('.', ''));
        });
        // for (const char of total.toString()) {
        //     console.log(char);
        // }
        var arr = total.toString().split('');
        var arrNew = [];
        for (let index = 0; index < arr.length; index++) {
            if (
                (arr.length == 6 && index == 3) ||
                (arr.length == 7 && (index == 1 || index == 4)) ||
                (arr.length == 8 && (index == 2 || index == 5))
            ) {
                arrNew.push('.');
                arrNew.push(arr[index]);
            } else {
                arrNew.push(arr[index]);
            }
        }
        return arrNew;
    }
    //console.log(totalAmount.current);
    return (
        <div className={cx('cart')}>
            <div className={cx('cart-info')}>
                <p>
                    Có <input type="button" value={handleTotalAmount()} /> <span className={cx('')}>Sản phẩm </span>
                    trong giỏ hàng
                </p>
                <hr />
            </div>
            <div className={cx('cart-product')}>
                {lsProducts.reverse().map((product, index) => (
                    <div className={cx('cart-product-item')} key={index}>
                        <img src={product.img} />
                        <div className={cx('cart-product-info')}>
                            <h5>
                                <Link to={product.path}>{product.title}</Link>
                            </h5>

                            <div className={cx('cart-product-info-item')}>
                                <div className={cx('amount')}>
                                    <span>
                                        {product.amount}
                                        <span style={{ display: 'none' }}>
                                            {product.amount > 1 ? handleTotalAmount() : ''}
                                        </span>
                                    </span>
                                    &nbsp;X <span> {product.price} đ</span>
                                </div>
                                <div className={cx('size')}>
                                    Size: &nbsp;
                                    <span>{product.sizeOption}</span>
                                </div>
                            </div>
                            <div className={cx('delete')}>
                                <button
                                    onClick={() => {
                                        const actions = removeCart(product);
                                        dispatch(actions);
                                        // setAmount((amount) => amount - product.amount);
                                        //console.log(product.title);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon')} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showTotal && (
                <div className={cx('total')}>
                    <p>
                        Tổng: <span>{handleTotalMoney()} đ</span>
                    </p>
                    <Link to="/thanh-toan">Gửi đơn hàng</Link>
                </div>
            )}
        </div>
    );
};

export default memo(Cart);
