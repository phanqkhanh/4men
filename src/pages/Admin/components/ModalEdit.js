import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API, { headers } from '../../../API';
import Success from './poppupSuccess';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';

function ModalEdit({ modal, callback, data, setProducts, products, SuccessEdit }) {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('default');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState([]);
    const [categoryId, setCategoryId] = useState(data.categoryId);
    const [categoryItemId, setCategoryItemId] = useState(data.categoryItemId);
    const [checkboxDefault, setCheckboxDefault] = useState(false);
    const [radioDefault, setRadioDefault] = useState(true);
    const [img, setImg] = useState();
    const [imgDetails, setImgDetails] = useState();
    const [success, setSuccess] = useState(false);
    const [showRequired, setShowRequired] = useState(false);
    const [productsDetails, setProductsDetails] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [positionLeft, setPositionLeft] = useState(150 + data.price.length * 6);

    const [categoryItem, setCategoryItem] = useState([]);

    const [showPromotion, setShowPromotion] = useState(data.status == 'promotion' ? true : false);
    const [promotion, setPromotion] = useState(data.promotion);
    // console.log(data);

    // console.log(data);
    useEffect(() => {
        setName(data.title);
        setStatus(data.status);
        setPrice(data.price);
        if (data.size == null) {
            setSize('');
        } else {
            setSize(() => data.size.split(','));
        }

        GetCategoryItem();
        ProductsDetails(data.id);
    }, []);

    useEffect(() => {
        GetCategoryItem();
    }, [categoryId]);

    function GetCategoryItem() {
        var config = {
            method: 'get',
            url: `${API.baseURL}categoriesItem/${categoryId}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setCategoryItem(response.data);
                // setCategoryItemId(response.data[0].id);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function ProductsDetails(id) {
        var config = {
            method: 'get',
            url: `${API.baseURL}productdetails/${id}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data);
                if (response.status == 200) {
                    let arr = response.data.img.split(',');
                    // console.log(arr);
                    setProductsDetails(() => arr.filter((p) => p != ''));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //lấy ảnh chính
    const handleImgChange = (e) => {
        const [f] = e.target.files;
        setImg(f);
    };
    //lấy ảnh chi tiết
    const handleImgsChange = (e) => {
        setImgDetails(e.target.files);
    };
    //xóa dấu tiếng việt
    function removeAccents(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }

    function handleSubmit() {
        if (name == '' || price == '') {
            setShowRequired(true);
        } else {
            var FormData = require('form-data');
            var Fmdata = new FormData();
            var link = name.replace(/ /g, '-').toLocaleLowerCase();
            var link = removeAccents(link);
            Fmdata.append('Title', name);
            Fmdata.append('Price', price);
            Fmdata.append('Status', status);
            if (status == 'promotion') {
                if (promotion == '') {
                    Fmdata.append('Promotion', '5');
                } else {
                    Fmdata.append('Promotion', promotion);
                }
            }
            Fmdata.append('path', link);
            Fmdata.append('CategoryId', categoryId);
            Fmdata.append('Sold', '0');
            Fmdata.append('Size', size);
            Fmdata.append('CategoryItemId', categoryItemId);

            // data.append('ImgDetails', imgDetails);
            if (img != undefined) {
                Fmdata.append('ImageFile', img);
            }
            if (imgDetails != undefined) {
                for (let index = 0; index < imgDetails.length; index++) {
                    const element = imgDetails[index];
                    Fmdata.append('ImgDetails', element);
                }
            }
            // for (const value of data.values()) {
            //     console.log(value);
            // }
            EditProduct(Fmdata);
            // console.log(data);
        }
    }

    function EditProduct(Fmdata) {
        var config = {
            method: 'put',
            url: `${API.baseURL}products/${data.id}`,
            headers: {},
            data: Fmdata,
        };

        axios(config)
            .then(function (response) {
                console.log(response.status);
                if (response.status == 200) {
                    callback(false);
                    SuccessEdit();
                    var arr = [];
                    products.map(function (item) {
                        if (item.id == data.id) {
                            var link = name.replace(/ /g, '-').toLocaleLowerCase();
                            var link = removeAccents(link);
                            item.title = name;
                            item.price = price;
                            item.status = status;
                            item.path = link;
                            item.categoryId = categoryId;
                            var strSize = '';
                            for (let index = 0; index < size.length; index++) {
                                const element = size[index];
                                if (index == 0) {
                                    strSize = strSize + element;
                                } else {
                                    strSize = strSize + ',' + element;
                                }
                            }
                            item.size = strSize;
                            item.categoryItemId = categoryItemId;
                            console.log(item);
                            if (img != undefined) {
                                item.img = `/img/${img.name}`;
                            }
                            // if (imgDetails != undefined) {
                            //     for (let index = 0; index < imgDetails.length; index++) {
                            //         const element = imgDetails[index];
                            //         Fmdata.append('ImgDetails', element);
                            //     }
                            // }
                            arr.push(item);
                        } else {
                            arr.push(item);
                        }
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
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
                        Sửa sản phẩm
                    </h3>
                </ModalHeader>
                <Form className="form" style={{ padding: '10px 30px' }}>
                    <FormGroup className="form-flex">
                        <Label className="label-title">Tên sản phẩm</Label>
                        <Input
                            type="text"
                            className="input-text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup
                        tag="fieldset"
                        className="form-flex"
                        onChange={(e) => {
                            setStatus(e.target.value);
                            console.log(e.target.value);
                            // setShowPromotion(true);
                            if (e.target.value == 'default') {
                                setRadioDefault(true);
                                setStatus('default');
                                setShowPromotion(false);
                            } else {
                                setRadioDefault(false);
                            }
                            if (e.target.value == 'hot') {
                                setStatus('hot');
                                setShowPromotion(false);
                            } else if (e.target.value == 'new') {
                                setStatus('new');
                                setShowPromotion(false);
                            } else if (e.target.value == 'promotion') {
                                setStatus('promotion');
                                setShowPromotion(true);
                            } else if (!isNaN(e.target.value)) {
                                setStatus('promotion');
                            }
                        }}
                    >
                        <h3>Trạng thái</h3>
                        <FormGroup check>
                            <Input
                                type="radio"
                                name="radio1"
                                value="default"
                                checked={status == 'default' ? true : false}
                            />
                            <Label check>Mặc định</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input type="radio" name="radio1" value="hot" checked={status == 'hot' ? true : false} />
                            <Label check>Hot</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input type="radio" name="radio1" value="new" checked={status == 'new' ? true : false} />
                            <Label check>Mới</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                type="radio"
                                name="radio1"
                                value="promotion"
                                checked={status == 'promotion' ? true : false}
                            />
                            <Label check>Khuyến mãi</Label>
                            {showPromotion && (
                                <>
                                    <input
                                        type="text"
                                        style={{
                                            marginLeft: '10px',
                                            width: '50px',
                                            padding: '0px 10px',
                                            outline: 'none',
                                            textAlign: 'center',
                                        }}
                                        value={promotion}
                                        onChange={(e) => {
                                            let value = e.target.value;
                                            // console.log(Number(e.target.value));
                                            if (!isNaN(value)) {
                                                if (value != '0' && Number(value) <= 100) {
                                                    setPromotion(e.target.value);
                                                }
                                            }
                                        }}
                                    />
                                    <span style={{ position: 'absolute', fontSize: '20px' }}>%</span>
                                </>
                            )}
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="form-flex" style={{ position: 'relative' }}>
                        <Label className="label-title">Giá sản phẩm</Label>
                        <Input
                            type="text"
                            maxLength="15"
                            value={price}
                            className="input-text"
                            // onChange={(e) => setPrice(e.target.value)}
                            onChange={(e) => {
                                var strAfter = e.target.value.slice(e.target.value.length - 1);
                                for (var i = 0; i < 10; i++) {
                                    if (strAfter == i || strAfter == '.') {
                                        if (e.target.value.length > 3) {
                                            var arrStr = e.target.value.replace(/\./g, '');
                                            var number = 1;
                                            var valueStr = '';
                                            if (arrStr.length % 3 == 0) {
                                                number = 3;
                                            } else if (arrStr.length % 3 == 1) {
                                                number = 1;
                                            } else if (arrStr.length % 3 == 2) {
                                                number = 2;
                                            }
                                            for (let index = 0; index < arrStr.length; index++) {
                                                const element = arrStr[index];
                                                console.log(element);
                                                if (index == number) {
                                                    valueStr = valueStr + '.' + element;
                                                    number += 3;
                                                    // console.log('+');
                                                } else {
                                                    valueStr += element;
                                                }
                                            }
                                            setPrice(valueStr);

                                            setPositionLeft(150 + e.target.value.replace(/\./g, '').length * 8);
                                        } else {
                                            setPrice(e.target.value);
                                            setPositionLeft(150 + e.target.value.length * 6);
                                        }
                                        // setPrice(e.target.value);
                                    }
                                }
                            }}
                        />
                        <span
                            style={{
                                left: positionLeft,
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }}
                        >
                            Đ
                        </span>
                    </FormGroup>
                    {/* size */}
                    <FormGroup className="form-flex">
                        <h3>Nhập Size</h3>
                        <FormGroup check>
                            <Input
                                type="checkbox"
                                value="S"
                                checked={size.indexOf('S') === -1 ? false : true}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        // alert(e.target.value);
                                        setSize([...size, e.target.value]);
                                        setCheckboxDefault(true);
                                    } else {
                                        setSize((pre) => pre.filter((item) => item != e.target.value));
                                        setCheckboxDefault(false);
                                    }
                                }}
                            />
                            <Label check>S</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                type="checkbox"
                                value="M"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        // alert(e.target.value);
                                        setSize([...size, e.target.value]);
                                    } else {
                                        setSize((pre) => pre.filter((item) => item != e.target.value));
                                    }
                                }}
                                checked={size.indexOf('M') === -1 ? false : true}
                            />
                            <Label check>M</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                type="checkbox"
                                value="L"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        // alert(e.target.value);
                                        setSize([...size, e.target.value]);
                                    } else {
                                        setSize((pre) => pre.filter((item) => item != e.target.value));
                                    }
                                }}
                                checked={size.indexOf('L') === -1 ? false : true}
                            />
                            <Label check>L</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                type="checkbox"
                                value="XL"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        // alert(e.target.value);
                                        setSize([...size, e.target.value]);
                                    } else {
                                        setSize((pre) => pre.filter((item) => item != e.target.value));
                                    }
                                }}
                                checked={size.indexOf('XL') === -1 ? false : true}
                            />
                            <Label check>XL</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                type="checkbox"
                                value="XXL"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        // alert(e.target.value);
                                        setSize([...size, e.target.value]);
                                    } else {
                                        setSize((pre) => pre.filter((item) => item != e.target.value));
                                    }
                                }}
                                checked={size.indexOf('XXL') === -1 ? false : true}
                            />
                            <Label check>XXL</Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup style={{ display: 'flex' }}>
                        <h3 style={{ width: 'max-content' }}>Danh mục</h3>
                        <div style={{ width: '80%' }} className="form-flex">
                            <Col sm={3} style={{ marginRight: '10px' }}>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    onChange={(e) => {
                                        setCategoryId(e.target.value);
                                    }}
                                    value={categoryId}
                                >
                                    <option value="1">Áo nam</option>
                                    <option value="2">Quần nam</option>
                                    <option value="3">Phụ kiện</option>
                                    <option value="4">Giày dép</option>
                                </Input>
                            </Col>
                            <Col sm={3}>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    onChange={(e) => {
                                        setCategoryItemId(e.target.value);
                                    }}
                                    value={categoryItemId}
                                >
                                    {categoryItem &&
                                        categoryItem.map((item, index) => (
                                            <option value={item.id}>{item.title}</option>
                                        ))}
                                </Input>
                            </Col>
                        </div>
                    </FormGroup>
                    <Row style={{ paddingTop: '0px' }}>
                        <Col>
                            <FormGroup>
                                <h3>Ảnh chính</h3>
                                <Input
                                    id="exampleFile"
                                    name="file"
                                    type="file"
                                    style={{ width: '100%' }}
                                    onChange={handleImgChange}
                                    // ref={refFiles}
                                />
                                <img
                                    src={API.imgURL + data.img}
                                    style={{ width: '80px', maxHeight: '80px', marginLeft: '7px' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <h3>Ảnh chi tiết</h3>
                                <Input
                                    id="exampleFile"
                                    name="file"
                                    type="file"
                                    multiple="multiple"
                                    style={{ width: '100%' }}
                                    onChange={handleImgsChange}
                                    // ref={refFiles}
                                />
                                {productsDetails &&
                                    productsDetails.map((item, index) => (
                                        <img
                                            key={index}
                                            src={item != '' && API.imgURL + item}
                                            style={{ width: '80px', maxHeight: '80px', marginLeft: '7px' }}
                                        />
                                    ))}
                            </FormGroup>
                        </Col>
                    </Row>
                    {showRequired && <p className="required">Cần nhập đủ hông tin sản phẩm!</p>}
                    {/* <Button
                        size="lg"
                        color="success"
                        style={{ fontSize: '16px', marginLeft: '40%' }}
                        onClick={handleSubmit}
                    >
                        Thêm sản phẩm
                    </Button> */}
                </Form>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit} size="lg" style={{ width: '100px', height: '35px' }}>
                        Xác nhận
                    </Button>
                    <Button color="secondary" style={{ width: '100px', height: '35px' }} onClick={callback}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalEdit;
