import classNames from 'classnames/bind';
import styles from './cartStyles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import img from './ao-so-mi.png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Cart = () => {
    return (
        <div className={cx('cart')}>
            <div className={cx('cart-info')}>
                <p>
                    Có <input type="button" value="0" /> <span className={cx('')}>Sản phẩm </span>trong giỏ hàng
                </p>
                <hr />
            </div>
            <div className={cx('cart-product')}>
                <div className={cx('cart-product-item')}>
                    <img src={img} />
                    <div className={cx('cart-product-info')}>
                        <h5>ÁO SƠ MI OXFORD TAY NGẮN ASM017 MÀU XANH</h5>
                        <p>
                            <span>1</span> X <span>245.000</span>
                        </p>
                        <div className={cx('delete')}>
                            <button>
                                <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon')} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('cart-product-item')}>
                    <img src={img} />
                    <div className={cx('cart-product-info')}>
                        <h5>ÁO SƠ MI OXFORD TAY NGẮN ASM017 MÀU XANH</h5>
                        <p>
                            <span>1</span> X <span>245.000</span>
                        </p>
                        <div className={cx('delete')}>
                            <button>
                                <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon')} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('cart-product-item')}>
                    <img src={img} />
                    <div className={cx('cart-product-info')}>
                        <h5>ÁO SƠ MI OXFORD TAY NGẮN ASM017 MÀU XANH</h5>
                        <p>
                            <span>1</span> X <span>245.000</span>
                        </p>
                        <div className={cx('delete')}>
                            <button>
                                <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon')} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('cart-product-item')}>
                    <img src={img} />
                    <div className={cx('cart-product-info')}>
                        <h5>ÁO SƠ MI OXFORD TAY NGẮN ASM017 MÀU XANH</h5>
                        <p>
                            <span>1</span> X <span>245.000</span>
                        </p>
                        <div className={cx('delete')}>
                            <button>
                                <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon')} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('cart-product-item')}>
                    <img src={img} />
                    <div className={cx('cart-product-info')}>
                        <h5>ÁO SƠ MI OXFORD TAY NGẮN ASM017 MÀU XANH</h5>
                        <p>
                            <span>1</span> X <span>245.000</span>
                        </p>
                        <div className={cx('delete')}>
                            <button>
                                <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon')} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('total')}>
                <p>
                    Tổng: <span>245.000</span>
                </p>
                <Link to="/thanh-toan">Gửi đơn hàng</Link>
            </div>
        </div>
    );
};

export default Cart;
