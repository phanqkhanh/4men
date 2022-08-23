import React from 'react';
import img from '../../assets/footer-map.jpg';
import { useState, useEffect, useRef } from 'react';
import API, { headers } from '../../API';
import axios from 'axios';
import { FormGroup, Col, Input } from 'reactstrap';
import PoppupSuccess from '../../pages/Admin/components/poppupSuccess';
import ModalEdit from '../../pages/Admin/components/ModalEdit';
import ModalDelete from '../../pages/Admin/components/ModalDelete';
import ModalAllImg from '../../pages/Admin/components/ModalAllImg';

const ProductsAdmin = () => {
    const [products, setProducts] = useState();
    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [categoryId, setCategoryId] = useState();
    const [categoryItemId, setCategoryItemId] = useState();
    const [categoryItem, setCategoryItem] = useState([]);
    const [allCategoryItems, setAllCategoryItems] = useState();
    const [inputCategoryItem, setInputCategoryItem] = useState(1);
    const [disabledOptions, setDisabledOptions] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    const productsSearch = useRef();

    useEffect(() => {
        GetProducts();
        // GetCategoryItem();
        GetAllCategoryItem();
    }, []);
    useEffect(() => {
        if (categoryId == '0') {
            GetProducts();
        } else {
            GetCategoryItem();
        }
    }, [categoryId]);

    function FilterProductsCategory(categoryId) {
        var config = {
            method: 'get',
            url: `${API.baseURL}filterproducts/category/${categoryId}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setShowLoading(true);
                if (response.status == 200) {
                    setProducts(response.data);
                    productsSearch.current = response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setShowLoading(false);
            });
    }
    function FilterProductsCategoryItem(categoryItemId) {
        var config = {
            method: 'get',
            url: `${API.baseURL}filterproducts/categoryItem/${categoryItemId}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setShowLoading(true);
                // console.log(response.data);
                if (response.status == 200) {
                    setProducts(response.data);
                    productsSearch.current = response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setShowLoading(false);
            });
    }
    function GetProducts() {
        var config = {
            method: 'get',
            url: `${API.baseURL}products`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setShowLoading(true);
                // console.log(response.data);
                if (response.status == 200) {
                    setProducts(response.data);
                    productsSearch.current = response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setShowLoading(false);
            });
    }

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
    function GetAllCategoryItem() {
        var config = {
            method: 'get',
            url: `${API.baseURL}categoriesItem`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                setAllCategoryItems(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function FilterCategory(id) {
        if (allCategoryItems != undefined) {
            for (let index = 0; index < allCategoryItems.length; index++) {
                const element = allCategoryItems[index];
                if (id == element.id) {
                    return element.title;
                }
            }
        }
    }
    // function handleSearch(name) {
    //     console.log(name);
    //     if (name == '') {
    //         GetProducts();
    //     } else {
    //         var config = {
    //             method: 'get',
    //             url: `https://localhost:44362/api/products/${name}`,
    //             headers: {},
    //         };

    //         axios(config)
    //             .then(function (response) {
    //                 // console.log(JSON.stringify(response.data));
    //                 setProducts(response.data);
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     }
    // }

    //xóa dấu tiếng việt
    function removeAccents(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }

    function handleSearch(name) {
        if (name == '') {
            setProducts(productsSearch.current);
        } else {
            var arr = [];
            for (let index = 0; index < productsSearch.current.length; index++) {
                var element = productsSearch.current[index];
                if (removeAccents(element.title).toUpperCase().indexOf(removeAccents(name).toUpperCase()) > -1) {
                    console.log('ok');
                    arr.push(element);
                }
            }
            setProducts(arr);
            console.log(arr);
        }
    }

    function SuccessEdit() {
        setSuccess('Sửa thành công');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    }
    function SuccessDelete() {
        setSuccess('Xóa thành công');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    }
    //modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [productEdit, setProductEdit] = useState();
    //modal xóa
    const [modalDelete, setModalDelete] = useState(false);
    const toggleDelete = () => setModalDelete(!modalDelete);
    const [productDelete, setProductDelete] = useState();
    //modal xem tất cả ảnh
    const [modalAllImg, setModalAllImg] = useState(false);
    const toggleAllImg = () => setModalAllImg(!modalAllImg);
    const [productID, setProductID] = useState();
    const [imgMain, setImageMain] = useState();
    return (
        <div className="wrapper-product-admin">
            {showSuccess && <PoppupSuccess success={success} />}
            {modal && (
                <ModalEdit
                    modal={modal}
                    callback={toggle}
                    setProducts={setProducts}
                    products={products}
                    data={productEdit}
                    SuccessEdit={SuccessEdit}
                />
            )}
            {modalDelete && (
                <ModalDelete
                    modal={modalDelete}
                    callback={toggleDelete}
                    productDelete={productDelete}
                    SuccessDelete={SuccessDelete}
                    setProducts={setProducts}
                    products={products}
                />
            )}
            {modalAllImg && (
                <ModalAllImg modal={modalAllImg} callback={toggleAllImg} id={productID} imgMain={imgMain} />
            )}
            <h3 className="title-admin">Danh sách sản phẩm</h3>
            <div className="filter">
                <input
                    className="search"
                    onKeyUp={(e) => handleSearch(e.target.value)}
                    placeholder="Tìm kiếm theo tên"
                />
                <div className="option-filter">
                    <FormGroup style={{ display: 'flex', marginTop: '0px' }}>
                        <h3 style={{ width: 'max-content', marginTop: '9px', marginRight: '10px', fontSize: '20px' }}>
                            Danh mục
                        </h3>
                        <div style={{ width: '80%' }} className="form-flex">
                            <Col sm={6} style={{ marginRight: '10px' }}>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    onChange={(e) => {
                                        setInputCategoryItem('0');
                                        if (e.target.value == 0) {
                                            setDisabledOptions(true);
                                            setCategoryId('0');
                                        } else {
                                            setCategoryId(e.target.value);
                                            setDisabledOptions(false);
                                            FilterProductsCategory(e.target.value);
                                        }
                                    }}
                                >
                                    <option value="0">Tất cả</option>
                                    <option value="1">Áo nam</option>
                                    <option value="2">Quần nam</option>
                                    <option value="3">Phụ kiện</option>
                                    <option value="4">Giày dép</option>
                                </Input>
                            </Col>
                            <Col sm={6}>
                                <Input
                                    id="exampleSelect"
                                    disabled={disabledOptions}
                                    name="select"
                                    type="select"
                                    onChange={(e) => {
                                        setCategoryItemId(e.target.value);
                                        setInputCategoryItem(e.target.value);
                                        if (e.target.value == 0) {
                                            FilterProductsCategory(categoryId);
                                        } else {
                                            FilterProductsCategoryItem(e.target.value);
                                        }
                                    }}
                                    value={inputCategoryItem}
                                >
                                    <option value="0">Tất cả</option>
                                    {categoryItem.map((item, index) => (
                                        <option value={item.id}>{item.title}</option>
                                    ))}
                                </Input>
                            </Col>
                        </div>
                    </FormGroup>
                </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Ảnh</th>
                            <th>Danh mục</th>
                            <th>Giá</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {console.log(products == undefined)} */}
                        {showLoading && <div className="loader-admin"></div>}
                        {products == '' || products == undefined ? (
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Chưa có sản phẩm nào</td>
                            </tr>
                        ) : (
                            products.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ width: '5%' }}>
                                        <h3>{index + 1}</h3>
                                    </td>
                                    <td style={{ width: '30%' }}>
                                        <h3 style={{ fontSize: '20px' }}>{item.title}</h3>
                                    </td>
                                    <td style={{ width: '15%' }}>
                                        <img src={API.imgURL + item.img} style={{ maxWidth: '100px' }} alt="ảnh lỗi" />
                                        <p
                                            onClick={() => {
                                                setProductID(item.id);
                                                setImageMain(API.imgURL + item.img);
                                                toggleAllImg();
                                            }}
                                        >
                                            Xem tất cả
                                        </p>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        {/* <h3>adasdasdadadadada</h3> */}
                                        <h3>
                                            {/* {categoryItem &&
                                                // categoryItem.filter((category) => category.id == item.categoryItemId)}
                                                categoryItem.filter((category) =>
                                                    console.log(category.id == item.categoryItemId),
                                                )} */}
                                            {FilterCategory(item.categoryItemId)}
                                        </h3>
                                    </td>
                                    <td style={{ width: '10%', color: 'red' }}>
                                        <h3 style={{ width: 'max-content' }}>{item.price} đ</h3>
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <div className="btn-admin">
                                            <button
                                                onClick={() => {
                                                    setProductEdit(item);
                                                    toggle();
                                                }}
                                            >
                                                Sửa
                                            </button>{' '}
                                            <br />
                                            <button
                                                onClick={() => {
                                                    setProductDelete(item);
                                                    toggleDelete();
                                                }}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductsAdmin;
