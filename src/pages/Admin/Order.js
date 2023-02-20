import React, { useRef } from 'react';
import { FormGroup, Col, Input } from 'reactstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import API from '../../API';
import ModalOrderDetail from './components/ModalOrderDetail';

const Order = () => {
    const [order, setOrder] = useState();
    const [modal, setModal] = useState(false);
    const [orderProps, setOrderProps] = useState();
    const [orderItem, setOrderItem] = useState();
    const orderRef = useRef();
    const [orderSearch, setOrderSearch] = useState();
    const toggle = () => setModal(!modal);
    useEffect(() => {
        var config = {
            method: 'get',
            url: `${API.baseURL}order`,
            headers: {},
        };
        axios(config)
            .then((response) => {
                if (response.status == 200) {
                    setOrder(response.data);
                    orderRef.current = response.data;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    function handleClickOrder(item) {
        setOrderItem(item);
        // var arr = [];
        // for (let index = 0; index < orderDetail.length; index++) {
        //     const element = orderDetail[index];
        //     if (element.orderId == item.id) {
        //         arr.push(element);
        //     }
        // }
        // setOrderProps(arr);
        // console.log(arr);
    }
    function removeAccents(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }

    function handleSearch(name) {
        if (name == '') {
            setOrder(orderRef.current);
        } else {
            var arr = [];
            for (let index = 0; index < order.length; index++) {
                var element = order[index];
                console.log(removeAccents(element.title).slice(13, element.title.length));
                if (
                    removeAccents(element.title)
                        .slice(13, element.title.length)
                        .toUpperCase()
                        .indexOf(removeAccents(name).toUpperCase()) > -1
                ) {
                    arr.push(element);
                }
            }
            setOrder(arr);
        }
    }
    function handleFilterOrder(params) {
        console.log(orderRef.current);
        if (params == 'Tất cả') {
            setOrder(orderRef.current);
        } else {
            var arr = [];
            for (let index = 0; index < orderRef.current.length; index++) {
                const element = orderRef.current[index];
                if (element.status == params) {
                    arr.push(element);
                }
            }
            setOrder(arr);
        }
    }

    return (
        <div className="wrapper-product-admin">
            <h3 className="title-admin">Đơn hàng</h3>
            <div className="filter">
                <input
                    className="search"
                    onKeyUp={(e) => handleSearch(e.target.value)}
                    placeholder="Tìm kiếm theo tên"
                />
                <div className="option-filter">
                    <FormGroup style={{ display: 'flex', marginTop: '0px' }}>
                        <h3
                            style={{
                                width: 'max-content',
                                marginTop: '9px',
                                marginRight: '10px',
                                fontSize: '18px',
                            }}
                        >
                            Lọc đơn
                        </h3>
                        <div style={{ width: '70%' }} className="form-flex">
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                onChange={(e) => handleFilterOrder(e.target.value)}
                            >
                                <option value="Tất cả">Tất cả</option>
                                <option value="Đơn mới">Đơn mới</option>
                                <option value="Đã gửi">Đã gửi</option>
                                <option value="Đang vận chuyển">Đang vận chuyển</option>
                                <option value="Hoàn thành">Hoàn thành</option>
                                <option value="Khách boom">Khách boom</option>
                                <option value="Đã hủy">Đã hủy</option>
                            </Input>
                        </div>
                    </FormGroup>
                </div>
            </div>
            {modal && (
                <ModalOrderDetail modal={modal} callback={toggle} orderProps={orderProps} orderItem={orderItem} />
            )}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Đơn</th>
                            <th>Ngày đặt</th>
                            <th>Trạng thái</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {showLoading && <div className="loader-admin"></div>} */}
                        {order &&
                            order.map((item, index) => (
                                <tr
                                    key={index}
                                    className="order-item"
                                    style={{ height: '50px' }}
                                    onClick={() => {
                                        toggle();
                                        handleClickOrder(item);
                                    }}
                                >
                                    <td style={{ width: '5%' }}>
                                        <h3>{item.id}</h3>
                                    </td>
                                    <td style={{ width: '35%' }}>
                                        <h3 style={{ fontSize: '18px', width: '100%', color: '#575757' }}>
                                            {item.title}
                                        </h3>
                                    </td>
                                    <td style={{ width: '10%', lineHeight: '37px' }}>{item.date.slice(0, 10)}</td>
                                    <td style={{ width: '15%' }}>
                                        <h3>{item.status}</h3>
                                    </td>
                                    <td style={{ width: '15%', color: 'red' }}>
                                        <h3 style={{ width: 'max-content' }}>{item.totalPrice} đ</h3>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;
