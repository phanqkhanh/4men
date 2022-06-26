import React from 'react';
import classNames from 'classnames/bind';
import styles from './productsViewStyles.scss';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { memo, useState, useEffect, useCallback } from 'react';
import ModalLink from '../../components/Modal/modalLink';
import Notify from '../Notify/notify';

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

    var checkStatus = false;
    var status = props.status;
    if (props.status != '') {
        checkStatus = true;
    }
    function Complete() {
        setShow(true);
        setInterval(CompleteHide, 1000);
    }
    function CompleteHide() {
        setShow(false);
    }
    return (
        <Col lg={props.lg} style={{ float: 'left', paddingLeft: '10px', paddingRight: '10px', height: '490px' }}>
            <div className={cx('product')}>
                {show && <Notify />}
                <div className={cx('product-item')}>
                    <div className={cx('product-img')}>
                        <Link to={props.path} className={cx('product-img-link')}>
                            <img src={props.img} alt="ảnh loi" />
                        </Link>
                        <div className={cx('product-btn')} style={{ display: styleButton }}>
                            <Link to="/">Mua ngay</Link>
                            <button className="" onClick={ToggleModal}>
                                Thêm vào giỏ
                            </button>
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
                    <Link to={props.path} className={cx('product-link')}>
                        {props.title}
                        {/* {console.log(props.title)} */}
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

export default memo(ProductsView);
