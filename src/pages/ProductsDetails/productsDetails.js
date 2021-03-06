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
import Notify from '../../components/Notify/notify';

const cx = classNames.bind(styles);

const ProductsDetails = () => {
    const par = useParams();
    var pathCategory = useLocation();
    var i = pathCategory.pathname.lastIndexOf('/');
    let kq = pathCategory.pathname.slice(0, i);
    let pathProduct = pathCategory.pathname.slice(i);
    // console.log(pathProduct);

    const dispatch = useDispatch();

    var lsProducts = useRef([]);
    var lsSizes = useRef([]);
    var lsImg = useRef([]);

    const navigate = useNavigate();

    const [show, setShow] = useState(false); // notify
    const [categoryItem, setCategoryItem] = useState('');
    const [categoryItemPath, setCategoryItemPath] = useState('');
    const [title, setTitle] = useState('');
    const [sold, setSold] = useState('');
    const [price, setPrice] = useState('');
    const [listSize, setListSize] = useState([]);
    const [size, setSize] = useState('');
    const [listImg, setListImg] = useState([]);
    const [lsProductsCategory, setProductCategory] = useState([]);
    const [showWarning, setShowWarning] = useState(false);

    const [imgDescriptionDefault, setImgDescriptionDefault] = useState('');
    const [img, setImg] = useState();
    const [amount, setAmount] = useState(1);
    const [imgDescription, setDescription] = useState();
    // console.log(par.tag);
    useEffect(() => {
        getData(function (list) {
            setListSize('');
            list.map(function (item) {
                if (item.categoryItemPath == kq || item.categoryPath == kq) {
                    lsProducts.current.push(item);
                }

                if (item.path.replace('/', '') == par.tag) {
                    setCategoryItem(item.categoryItem);
                    setTitle(item.title);
                    setSold(item.sold);
                    setPrice(item.price);
                    setListImg(item.detail);
                    setImg(item.img);
                    lsSizes.current = item.size;
                    setDescription(item.detail[0]);
                    setCategoryItemPath(item.categoryItemPath);
                    var product = {
                        title: item.title,
                        img: item.img,
                        path: item.categoryItemPath + item.path,
                        price: item.price,
                    };
                    // AddProductSeen(product);
                    const actions = addProductSeen(product);
                    dispatch(actions);
                }
            });
            setProductCategory(lsProducts.current);
            setAmount(1);
            setSize('default');
            setListSize(lsSizes.current);
            AddProductSeen();
        });
    }, [par.tag]);

    function AddProductSeen(product) {
        // var product = { title: title, img: img, path: pathProduct, price: price };
        // const actions = addProductSeen(product);
        // dispatch(actions);
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
            var product = {
                amount: amount,
                sizeOption: sizeOption,
                img: img,
                title: title,
                path: categoryItemPath + pathProduct,
                price: price,
            };
            console.log(product);
            const actions = addCart(product);
            dispatch(actions);
            // Complete();
            if (check == true) {
                navigate('/dat-hang');
            } else {
                Complete();
            }
        }
    }
    function Complete() {
        setShow(true);
        setInterval(CompleteHide, 2000);
    }
    function CompleteHide() {
        setShow(false);
    }
    return (
        <div className={cx('products-details')}>
            <Breadcrumbs category={categoryItem} name={title} categoryItemPath={categoryItemPath} />
            <Container className={cx('wrapper')}>
                <Col xs={12} sm={5} className={cx('img-main')}>
                    <img src={img} />
                    {show && <Notify />}
                </Col>
                <Col xs={12} sm={7} className={cx('info')}>
                    <h5>{title}</h5>
                    <p>
                        ???? b??n: <i>{sold} l?????t mua</i>
                    </p>
                    <p>
                        <u>Gi?? b??n: </u>
                        <span className={cx('price')}>{price} ??</span>
                    </p>
                    <div className={cx('options')}>
                        <div className={cx('size')}>
                            <p>
                                Ch???n k??ch c??? <Link to="">* H?????ng d???n ch???n size *</Link>
                            </p>
                            <select value={size} onChange={(e) => setSize(e.target.value)}>
                                <option value="default">Size</option>
                                {listSize.map((item, index) => (
                                    <option value={item} key={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('amount')}>
                            <p>S??? l?????ng</p>
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
                            Th??m v??o gi???
                        </button>
                    </div>
                    {showWarning && (
                        <div className={cx('warning')}>
                            <p>B???n ch??a ch???n size!!</p>
                        </div>
                    )}
                    <Link to="" className={cx('location')}>
                        <i className="fa-solid fa-location-dot"></i>
                        <u>Xem ?????a ch??? c??n s???n ph???m n??y</u>
                    </Link>
                    <div className={cx('wrapper-service')}>
                        <div className={cx('service')}>
                            <i className="fa-solid fa-angles-right"></i>
                            <h3>B???O H??NH S???N PH???M 90 NG??Y</h3>
                        </div>
                        <div className={cx('service')}>
                            <i className="fa-solid fa-angles-right"></i>
                            <h3>?????I H??NG TRONG V??NG 30 NG??Y</h3>
                        </div>
                        <div className={cx('service')}>
                            <i className="fa-solid fa-angles-right"></i>
                            <h3>HOTLINE B??N H??NG 1900 633 501</h3>
                        </div>
                        <div className={cx('service')}>
                            <i className="fa-solid fa-angles-right"></i>
                            <h3>M??? C???A T??? 8H30 ?????n 22H T???T C??? C??C NG??Y TRONG TU???N</h3>
                        </div>
                    </div>
                </Col>
            </Container>
            <Container className={cx('')}>
                <div className={cx('description-title')}>
                    <hr />
                    <h5>M?? t???</h5>
                    <hr />
                </div>
                <div className={cx('description')}>
                    <Col xs={2} md={1} className={cx('description-left')}>
                        {listImg.map((image, index) => (
                            <img src={image} onClick={() => setDescription(image)} key={index} />
                        ))}
                    </Col>
                    <Col xs={10} md={11} className={cx('description-right')}>
                        <img src={imgDescription} />
                    </Col>
                </div>
            </Container>
            <Container className={cx('products-category')}>
                <h5>S???N PH???M C??NG DANH M???C</h5>
                <Slider data={lsProductsCategory} />
            </Container>
        </div>
    );
};

export default ProductsDetails;
