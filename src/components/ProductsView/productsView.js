import React from 'react';
import classNames from 'classnames/bind';
import styles from './productsViewStyles.scss';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { memo, useState, useEffect, useCallback } from 'react';
import ModalLink from '../../components/Modal/modalLink';
import Notify from '../Notify/notify';
import API from '../../API';

const cx = classNames.bind(styles);

const ProductsView = (props) => {
    const [modal, setModal] = useState(false);
    const [styleButton, setStyleButton] = useState('');
    const [show, setShow] = useState(false);

    // function ToggleModal() {
    //     setModal(!modal);
    // }

    const ToggleModal = useCallback(() => {
        setModal(!modal);
    }, [modal]);

    useEffect(() => {
        if (modal) {
            setStyleButton('none');
        } else {
            setStyleButton('block');
        }
    }, [modal]);

    var status = props.status;

    function Complete() {
        setShow(true);
        setInterval(CompleteHide, 1000);
    }
    function CompleteHide() {
        setShow(false);
    }
    // console.log(props);
    return (
        <Col xs={props.xs} md={props.md} lg={props.lg} className={cx('col-product')}>
            <div className={cx('product')}>
                {show && <Notify />}
                <div className={cx('product-item')}>
                    <div className={cx('product-img')}>
                        <Link to={props.path} className={cx('product-img-link')}>
                            <img src={API.imgURL + props.img} alt="ảnh loi" />
                        </Link>
                        <div className={cx('product-btn')} style={{ display: styleButton }}>
                            <button className={cx('order-link')} onClick={ToggleModal}>
                                Mua ngay
                            </button>
                            <button onClick={ToggleModal}>Thêm vào giỏ</button>
                            {modal && (
                                <ModalLink
                                    callback={ToggleModal}
                                    complete={Complete}
                                    modal={modal}
                                    title={props.title}
                                    price={props.price}
                                    img={props.img}
                                    size={props.size}
                                    path={props.path}
                                />
                            )}
                        </div>
                    </div>
                    <div className={cx('product-title')}>
                        <Link to={props.path} className={cx('product-link')}>
                            {props.title}
                            {/* {console.log(props.title)} */}
                        </Link>
                    </div>
                    <p>{props.price} đ</p>
                </div>
                {status == 'hot' && <div className={cx('hot')}>HOT</div>}
                {status == 'new' && <div className={cx('new')}>New</div>}
                {status == 'promotion' && <div className={cx('new')}>30%</div>}
            </div>
        </Col>
    );
};

export default memo(ProductsView);
