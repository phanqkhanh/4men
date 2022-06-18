import React from 'react';
import classNames from 'classnames/bind';
import styles from './productsViewStyles.scss';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const cx = classNames.bind(styles);

const ProductsView = (props) => {
    var checkStatus = false;
    var status = props.status;
    if (props.status != '') {
        checkStatus = true;
    }
    return (
        <Col sm={3} style={{ float: 'left', paddingLeft: '10px', paddingRight: '10px' }}>
            <div className={cx('product')}>
                <div className={cx('product-item')}>
                    <div className={cx('product-img')}>
                        <Link to={props.path} className={cx('product-img-link')}>
                            <img src={props.img} alt="" />
                        </Link>
                        <div className={cx('product-btn')}>
                            <Link to="/">Mua ngay</Link>
                            <button className="">Thêm vào giỏ</button>
                        </div>
                    </div>
                    <Link to={props.path} className={cx('product-link')}>
                        {props.title}
                    </Link>
                    <p>{props.price} đ</p>
                </div>
                {checkStatus ? (
                    status == 'hot' ? (
                        <div className={cx('hot')}>HOT</div>
                    ) : (
                        <div className="new">New</div>
                    )
                ) : (
                    ''
                )}
            </div>
        </Col>
    );
};

export default ProductsView;
