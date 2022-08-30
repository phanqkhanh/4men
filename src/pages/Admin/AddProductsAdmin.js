import React from 'react';
import { Form, FormGroup, Label, Input, Col, Row, Button } from 'reactstrap';
import { useState, useEffect, useRef } from 'react';
import API from '../../API';
import PoppupSuccess from '../../pages/Admin/components/poppupSuccess';
import axios from 'axios';

const AddProductsAdmin = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('default');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState(['S']);
    const [categoryId, setCategoryId] = useState('1');
    const [categoryItemId, setCategoryItemId] = useState('');
    const [checkboxDefault, setCheckboxDefault] = useState(true);
    const [radioDefault, setRadioDefault] = useState(true);
    const [img, setImg] = useState();
    const [imgDetails, setImgDetails] = useState();
    const [success, setSuccess] = useState(false);
    const [showRequired, setShowRequired] = useState(false);
    const [positionLeft, setPositionLeft] = useState(150);

    const [categoryItem, setCategoryItem] = useState([]);

    const [showPromotion, setShowPromotion] = useState(false);
    const [promotion, setPromotion] = useState('10');

    const refFiles = useRef();
    const refFocus = useRef();
    const checkLess = useRef(0);

    useEffect(() => {
        GetCategoryItem();
    }, []);
    useEffect(() => {
        GetCategoryItem();
    }, [categoryId]);

    //Call api lấy danh mục
    function GetCategoryItem() {
        var config = {
            method: 'get',
            url: `${API.baseURL}categoriesItem/${categoryId}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setCategoryItem(response.data);
                setCategoryItemId(response.data[0].id);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //button thêm
    function handleSubmit() {
        // console.log(promotion);
        if (name == '' || price == '' || img == null || imgDetails == null) {
            setShowRequired(true);
        } else {
            var FormData = require('form-data');
            var data = new FormData();
            var link = name.replace(/ /g, '-').toLocaleLowerCase();
            var link = removeAccents(link);
            data.append('Title', name);
            data.append('Price', price);
            data.append('Status', status);
            if (status == 'promotion') {
                if (promotion == '') {
                    data.append('Promotion', '5');
                } else {
                    data.append('Promotion', promotion);
                }
            }
            data.append('path', link);
            data.append('CategoryId', categoryId);
            data.append('Sold', '0');
            data.append('Size', size);
            data.append('CategoryItemId', categoryItemId);
            data.append('ImageFile', img);
            // data.append('ImgDetails', imgDetails);
            for (let index = 0; index < imgDetails.length; index++) {
                const element = imgDetails[index];
                data.append('ImgDetails', element);
            }
            AddProduct(data);
        }
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
    //call API thêm sản phẩm
    function AddProduct(data) {
        var config = {
            method: 'post',
            url: `${API.baseURL}products`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    setSuccess(true);
                    setShowRequired(false);
                    resetForm();
                    setTimeout(() => setSuccess(false), 2000);
                    document.getElementById('myForm').reset();
                    document.getElementById('myText').focus();
                    setPositionLeft(150);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function resetForm() {
        setShowPromotion(false);
        refFiles.current.value = '';
        setName('');
        setRadioDefault(true);
        setCategoryId('1');
        setPrice('');
        setSize('S');
        refFocus.current.focus();
    }
    //xóa dấu tiếng việt
    function removeAccents(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }
    return (
        <div className="wrap-add-products">
            {success && <PoppupSuccess success="đã thêm" />}
            <h1>Thêm sản phẩm</h1>
            <Form className="form" id="myForm">
                <FormGroup className="form-flex">
                    <Label className="label-title">Tên sản phẩm</Label>
                    <Input
                        id="myText"
                        ref={refFocus}
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
                        // console.log(e.target.value);
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
                            setShowPromotion(false);

                            setStatus('new');
                        } else if (e.target.value == 'promotion') {
                            setStatus('promotion');
                            setShowPromotion(true);
                        }
                    }}
                >
                    <h3 className="title-add-product">Trạng thái</h3>
                    <FormGroup check>
                        <Input type="radio" name="radio1" value="default" checked={radioDefault} />
                        <Label check>Mặc định</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input type="radio" name="radio1" value="hot" />
                        <Label check>Hot</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input type="radio" name="radio1" value="new" />
                        <Label check>Mới</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input type="radio" name="radio1" value="promotion" />
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

                                        setPositionLeft(150 + e.target.value.replace(/\./g, '').length * 9);
                                    } else {
                                        setPrice(e.target.value);
                                        setPositionLeft(150 + e.target.value.length * 8);
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
                    <h3 className="title-add-product">Nhập Size</h3>
                    <FormGroup check>
                        <Input
                            type="checkbox"
                            value="S"
                            checked={checkboxDefault}
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
                        />
                        <Label check>XXL</Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup style={{ display: 'flex' }}>
                    <h3 className="title-add-product" style={{ width: 'max-content' }}>
                        Danh mục
                    </h3>
                    <div style={{ width: '80%' }} className="form-flex">
                        <Col sm={3} style={{ marginRight: '10px' }}>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                }}
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
                            >
                                {categoryItem.map((item, index) => (
                                    <option value={item.id}>{item.title}</option>
                                ))}
                            </Input>
                        </Col>
                    </div>
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                            <h3 className="title-add-product">Ảnh chính</h3>
                            <Input
                                id="exampleFile"
                                name="file"
                                type="file"
                                style={{ width: '100%' }}
                                onChange={handleImgChange}
                                ref={refFiles}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <h3 className="title-add-product">Ảnh chi tiết</h3>
                            <Input
                                id="exampleFile"
                                name="file"
                                type="file"
                                multiple="multiple"
                                style={{ width: '100%' }}
                                onChange={handleImgsChange}
                                ref={refFiles}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                {showRequired && <p className="required">Cần nhập đủ hông tin sản phẩm!</p>}
                <Button
                    size="lg"
                    color="success"
                    style={{ fontSize: '16px', marginLeft: '40%' }}
                    onClick={handleSubmit}
                >
                    Thêm sản phẩm
                </Button>
            </Form>
        </div>
    );
};

export default AddProductsAdmin;
