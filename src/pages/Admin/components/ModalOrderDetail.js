import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, Button, Table } from 'reactstrap';
import axios from 'axios';
import API from '../../../API';
import styles from '../../Order/orderStyles.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const ModalOrderDetail = ({ modal, callback, orderProps, orderItem }) => {
    const [productsOrder, setProductsOrder] = useState();
    const [orderDetail, setOrderDetail] = useState();

    useEffect(() => {
        var data = {
            Id: orderItem.id,
            CustomerId: orderItem.customerId,
            Date: orderItem.date,
            Status: orderItem.status,
            TotalPrice: orderItem.totalPrice,
            Title: orderItem.title,
        };
        var config = {
            method: 'post',
            url: `${API.baseURL}orderdetails`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                console.log(response);
                setOrderDetail(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Modal isOpen={modal} toggle={callback} size="lg" fullscreen="xl">
                <ModalHeader>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#0d6efd',
                            marginLeft: '15px',
                            marginTop: '5px',
                        }}
                    >
                        Chi tiết đơn hàng
                    </h3>
                </ModalHeader>
                <div>
                    <Col style={{ padding: '0px 30px' }}>
                        <Table hover bordered style={{ position: 'relative' }}>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>Sản phẩm</td>
                                    <td>SL</td>
                                    <td>Giá</td>
                                </tr>
                            </thead>
                            {
                                <tbody>
                                    {orderDetail &&
                                        orderDetail.lsProductOrders.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">
                                                    <p>{index + 1}</p>
                                                </th>
                                                <td className={cx('order-products-title')}>
                                                    <img src={API.imgURL + item.product.img} />
                                                    <h6>
                                                        {item.product.title} <br /> <strong> Size: {item.size}</strong>
                                                    </h6>
                                                </td>
                                                <td className={cx('order-products-amount')} style={{ padding: '20px' }}>
                                                    <p>{item.amount}</p>
                                                </td>
                                                <td className={cx('order-products-price')} style={{ width: '15%' }}>
                                                    <span>
                                                        <p>{item.product.price} đ</p>
                                                        <p style={{ color: '#333' }}>(1/cái)</p>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            }
                        </Table>
                        <div className={cx('order-total')}>
                            <p>Tổng: </p>
                            <span style={{ color: 'red' }}>{orderItem.totalPrice} đ</span>
                        </div>
                    </Col>
                    {orderDetail && (
                        <Col style={{ textAlign: 'center' }}>
                            <h2 style={{ fontWeight: 'bold' }}>Thông tin khách hàng</h2>
                            <div className={cx('customer')}>
                                <p>
                                    Họ và tên: <strong>{orderDetail.customer.name}</strong>
                                </p>
                            </div>
                            <div className={cx('customer')}>
                                <p>
                                    Email: <strong>{orderDetail.customer.email}</strong>
                                </p>
                            </div>
                            <div className={cx('customer')}>
                                <p>
                                    Số điện thoại: <strong>{orderDetail.customer.phone}</strong>
                                </p>
                            </div>
                            <div className={cx('customer')}>
                                <p>
                                    Địa chỉ: <strong>{orderDetail.customer.address}</strong>
                                </p>
                            </div>
                            {orderDetail.customer.note == null ? null : (
                                <div className={cx('customer')}>
                                    <p>
                                        Ghi chú: <strong>{orderDetail.customer.note}</strong>
                                    </p>
                                </div>
                            )}
                        </Col>
                    )}
                </div>
                <ModalFooter>
                    <Button color="primary" size="lg" style={{ width: '100px', height: '35px' }}>
                        Xác nhận
                    </Button>
                    <Button color="secondary" style={{ width: '100px', height: '35px' }} onClick={callback}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalOrderDetail;
