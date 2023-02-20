import React from 'react';
import classNames from 'classnames/bind';
import styles from './productsDetailsStyles.scss';
import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import getData from '../../api/getData';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Container } from 'reactstrap';
import Slider from '../../components/Slider/slider';
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/slice';
import { addProductSeen } from '../../redux/productsSeenSlice';
import API from '../../API';
import axios from 'axios';
import { Message } from '../../Notification';

const cx = classNames.bind(styles);

const ProductsDetails = () => {
    const par = useParams();
    var pathCategory = useLocation();
    var i = pathCategory.pathname.lastIndexOf('/');
    let kq = pathCategory.pathname.slice(0, i);
    let pathProduct = pathCategory.pathname.slice(i);
    // console.log(pathProduct);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [categoryItem, setCategoryItem] = useState('');
    const [listSize, setListSize] = useState([]);
    const [size, setSize] = useState('');
    const [listImg, setListImg] = useState([]);
    const [lsProductsCategory, setProductCategory] = useState();
    const [showWarning, setShowWarning] = useState(false);
    const [product, setProduct] = useState();
    const [allCategoryItems, setAllCategoryItems] = useState();

    const [imgDescriptionDefault, setImgDescriptionDefault] = useState('');
    const [img, setImg] = useState();
    const [amount, setAmount] = useState(1);
    const [imgDescription, setDescription] = useState();
    useEffect(() => {
        GetProducts();
        GetAllCategoryItem();
    }, [par.tag]);

    function GetProducts() {
        var config = {
            method: 'get',
            url: `${API.baseURL}filterproducts/${par.tag}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data);
                if (response.status == 200) {
                    GetProductsDetail(response.data.id);
                    GetCategoryItem(response.data.categoryItemId);
                    FilterProductsCategoryItem(response.data.categoryItemId);
                    setProduct(response.data);
                    setListSize(response.data.size.split(','));
                    if (response.data.size.split(',').length == 1) {
                        setSize('Free');
                    }
                    // var product = {
                    //     title: item.title,
                    //     img: item.img,
                    //     path: item.categoryItemPath + item.path,
                    //     price: item.price,
                    // };
                    AddProductSeen(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function GetProductsDetail(id) {
        var config = {
            method: 'get',
            url: `${API.baseURL}filterproducts/productdetails/${id}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    const arr = response.data.img.split(',');
                    const arrNew = arr.shift();
                    setListImg(arr);
                    setDescription(arr[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //
    function GetCategoryItem(id) {
        var config = {
            method: 'get',
            url: `${API.baseURL}categoriesItem/first/${id}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    // console.log(response.data);
                    setCategoryItem(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //
    function FilterProductsCategoryItem(categoryItemId) {
        var config = {
            method: 'get',
            url: `${API.baseURL}filterproducts/categoryItem/${categoryItemId}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setProductCategory(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                // setShowLoading(false);
            });
    }
    //
    function GetAllCategoryItem() {
        var config = {
            method: 'get',
            url: `${API.baseURL}categoriesItem`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setAllCategoryItems(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function AddProductSeen(product) {
        // var product = { title: title, img: img, path: pathProduct, price: price };
        const actions = addProductSeen(product);
        dispatch(actions);
        // console.log(product);
    }
    function More() {
        setAmount((prev) => prev + 1);
    }
    function Less() {
        setAmount(function (prev) {
            if (prev > 1) {
                return prev - 1;
            } else {
                return prev;
            }
        });
    }
    var sizeOption = size;
    function handleAddCart(check) {
        if (size == '' || size == 'default') {
            setShowWarning(true);
        } else {
            var p = {
                id: product.id,
                amount: amount,
                sizeOption: sizeOption,
                img: product.img,
                title: product.title,
                path: categoryItem.path + '/' + product.path,
                price: product.price,
            };
            // console.log(categoryItem.path + '/' + product.path);
            const actions = addCart(p);
            dispatch(actions);
            if (check == true) {
                navigate('/dat-hang');
            } else {
                Message('Thêm thành công', 'success');
                setShowWarning(false);
            }
        }
    }
    // console.log(categoryItem);
    return (
        <>
            {product && (
                <div className={cx('products-details')}>
                    {categoryItem && (
                        <Breadcrumbs
                            category={categoryItem.title == '' ? '' : categoryItem.title}
                            name={product.title == '' ? '' : product.title}
                            categoryItemPath={categoryItem.path == '' ? '' : categoryItem.path}
                        />
                    )}

                    <Container className={cx('wrapper')}>
                        <Col xs={12} sm={5} className={cx('img-main')}>
                            <img src={API.imgURL + product.img} />
                        </Col>
                        <Col xs={12} sm={7} className={cx('info')}>
                            <h5>{product.title}</h5>
                            <p>
                                Đã bán: <i>{product.sold} lượt mua</i>
                            </p>
                            <p>
                                <u>Giá bán: </u>
                                <span className={cx('price')}>{product.price} đ</span>
                            </p>
                            <div className={cx('options')}>
                                <div className={cx('size')}>
                                    <p>
                                        Chọn kích cỡ <Link to="">* Hướng dẫn chọn size *</Link>
                                    </p>
                                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                                        {listSize.length > 1 ? (
                                            <>
                                                <option value="default">Size</option>
                                                {listSize &&
                                                    listSize.map((item, index) => (
                                                        <option value={item} key={index}>
                                                            {item}
                                                        </option>
                                                    ))}
                                            </>
                                        ) : (
                                            <option value="Free">Free</option>
                                        )}
                                    </select>
                                </div>
                                <div className={cx('amount')}>
                                    <p>Số lượng</p>
                                    <div>
                                        <button className="amount-btn" onClick={Less}>
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                        <button disabled>{amount}</button>
                                        <button className="amount-btn" onClick={More}>
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('action')}>
                                <button
                                    className={cx('order-link')}
                                    onClick={() => {
                                        handleAddCart(true);
                                    }}
                                >
                                    Mua
                                </button>
                                <button
                                    onClick={() => {
                                        handleAddCart(false);
                                    }}
                                >
                                    Thêm vào giỏ
                                </button>
                            </div>
                            {showWarning && (
                                <div className={cx('warning')}>
                                    <p>Bạn chưa chọn size!!</p>
                                </div>
                            )}
                            <Link to="" className={cx('location')}>
                                <i className="fa-solid fa-location-dot"></i>
                                <u>Xem địa chỉ còn sản phẩm này</u>
                            </Link>
                            <div className={cx('wrapper-service')}>
                                <div className={cx('service')}>
                                    <i className="fa-solid fa-angles-right"></i>
                                    <h3>BẢO HÀNH SẢN PHẨM 90 NGÀY</h3>
                                </div>
                                <div className={cx('service')}>
                                    <i className="fa-solid fa-angles-right"></i>
                                    <h3>ĐỔI HÀNG TRONG VÒNG 30 NGÀY</h3>
                                </div>
                                <div className={cx('service')}>
                                    <i className="fa-solid fa-angles-right"></i>
                                    <h3>HOTLINE BÁN HÀNG 1900 633 501</h3>
                                </div>
                                <div className={cx('service')}>
                                    <i className="fa-solid fa-angles-right"></i>
                                    <h3>MỞ CỬA TỪ 8H30 đến 22H TẤT CẢ CÁC NGÀY TRONG TUẦN</h3>
                                </div>
                            </div>
                        </Col>
                    </Container>
                    <Container className={cx('')}>
                        <div className={cx('description-title')}>
                            <hr />
                            <h5>Mô tả</h5>
                            <hr />
                        </div>
                        <div className={cx('description')}>
                            <Col xs={2} md={1} className={cx('description-left')}>
                                {listImg &&
                                    listImg.map((image, index) => (
                                        <img
                                            src={API.imgURL + image}
                                            onClick={() => setDescription(image)}
                                            key={index}
                                        />
                                    ))}
                            </Col>
                            <Col xs={10} md={11} className={cx('description-right')}>
                                <img src={API.imgURL + imgDescription} />
                                {/* {console.log(imgDescription)} */}
                            </Col>
                        </div>
                    </Container>
                    <Container className={cx('products-category')}>
                        <h5>SẢN PHẨM CÙNG DANH MỤC</h5>
                        {lsProductsCategory && allCategoryItems && (
                            <Slider data={lsProductsCategory} categoryItem={allCategoryItems} />
                        )}
                    </Container>
                </div>
            )}
        </>
    );
};

export default ProductsDetails;
