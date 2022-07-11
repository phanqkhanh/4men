import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs';
import { Col, Container, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './productsCategoriesStyles.scss';
import StickyBox from 'react-sticky-box';
import ProductsSidebar from '../../components/ProductsSidebar/productsSidebar';
import getData from '../../api/getData';
import ProductsView from '../../components/ProductsView/productsView';
import { useSelector } from 'react-redux';

const options = [''];

const cx = classNames.bind(styles);

const ProductsCategories = () => {
    var path = useLocation();
    let lsHot = useRef([]);
    let lsProductsCategory = useRef([]);
    let lsProducts = useRef([]);
    var lsProductsSeen = [];
    const ProductsSeen = useSelector((state) => state.seen);
    ProductsSeen.map((product) => {
        lsProductsSeen.push(product);
    });
    const [CategoryProducts, setCategoryProducts] = useState([]);
    const [productHot, setProductHot] = useState([]);
    const [category, setCategory] = useState('');
    const [options, setOptions] = useState('');
    const [pageNumber, setPageNumber] = useState([]);
    const [pageActive, setPageActive] = useState(1);
    const [showPagination, setShowPagination] = useState(true);
    useEffect(() => {
        lsProductsCategory.current = [];
        var str = path.pathname;
        getData(function (list) {
            list.map((item) => {
                if (str == item.categoryPath) {
                    setCategory(item.category);
                    lsProductsCategory.current.push(item);
                } else if (str == item.categoryItemPath) {
                    setCategory(item.categoryItem);
                    lsProductsCategory.current.push(item);
                } else if (str == '/thoi-trang-moi-nhat' && item.status == 'new') {
                    setCategory('Thời trang mới nhất');
                    lsProductsCategory.current.push(item);
                }
                lsProducts.current.push(item);
                if (item.status == 'hot' && lsHot.current.length < 4) {
                    lsHot.current.push(item);
                }
            });
            // setCategoryProducts(lsProductsCategory.current);
            PaginationChange(1);
            setProductHot(lsHot.current);
            var lsPage = [];
            var count = Math.ceil(lsProductsCategory.current.length / 12);
            for (let i = 0; i < count; i++) {
                lsPage.push(i + 1);
            }
            setPageNumber(lsPage);
            setOptions('default');
            setShowPagination(true);
            setPageActive(1);
        });
    }, [path.pathname]);
    //sort options
    function handleChangeOptions(e) {
        setPageActive(1);
        var arr = lsProductsCategory.current;
        var temp;
        // console.log(arr);
        switch (e.target.value) {
            case 'default':
                PaginationChange(1);
                setOptions('default');
                setShowPagination(true);
                break;
            case 'high':
                setShowPagination(false);
                setOptions('high');
                var arrPrice = [];
                var arrNew = [];
                for (let i = 0; i < arr.length; i++) {
                    var b = Number(arr[i].price.replace('.', ''));
                    arrPrice.push(b);
                }
                arrPrice.sort((a, b) => b - a);
                for (let i = 0; i < arrPrice.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (Number(arr[j].price.replace('.', '')) == arrPrice[i]) {
                            arrNew.push(arr[j]);
                            break;
                        }
                    }
                }
                setCategoryProducts(arrNew);
                break;
            case 'low':
                setOptions('low');
                var arrPrice = [];
                var arrNew = [];
                for (let i = 0; i < arr.length; i++) {
                    var b = Number(arr[i].price.replace('.', ''));
                    arrPrice.push(b);
                }
                arrPrice.sort((a, b) => a - b);
                for (let i = 0; i < arrPrice.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (Number(arr[j].price.replace('.', '')) == arrPrice[i]) {
                            arrNew.push(arr[j]);
                            break;
                        }
                    }
                }
                setCategoryProducts(arrNew);
                setShowPagination(false);
                break;
            case 'sell':
                setOptions('sell');
                var arrSold = [];
                var arrNew = [];
                for (let i = 0; i < arr.length; i++) {
                    var b = Number(arr[i].sold);
                    arrSold.push(b);
                }
                arrSold.sort((a, b) => b - a);
                for (let i = 0; i < arrSold.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (Number(arr[j].sold) == arrSold[i]) {
                            arrNew.push(arr[j]);
                            break;
                        }
                    }
                }
                setCategoryProducts(arrNew);
                setShowPagination(false);
                break;
        }
    }

    function handleClickPaginationNext() {
        if (pageActive < pageNumber.length) {
            setPageActive(pageActive + 1);
            PaginationChange(pageActive + 1);
            scrollToTop();
        }
    }
    function handleClickPaginationPrev() {
        if (pageActive > 1) {
            setPageActive(pageActive - 1);
            PaginationChange(pageActive - 1);
            scrollToTop();
        }
    }
    function handleClickPaginationItems() {}
    function PaginationChange(pageActive) {
        scrollToTop();
        var list = [];
        let start = 12 * pageActive - 12;
        let end;
        if (pageActive * 12 > lsProductsCategory.current.length) {
            end = lsProductsCategory.current.length;
        } else {
            end = start + 12;
        }
        for (let i = start; i < end; i++) {
            list.push(lsProductsCategory.current[i]);
        }
        // console.log(end);
        setCategoryProducts(list);
    }
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div>
            <Breadcrumbs category={category} page={pageActive} />
            <Container>
                <div className={cx('wrapper-filter')}>
                    <h5 className={cx('category-title')}>{category}</h5>
                    <div className={cx('sort')}>
                        <p>Sắp xếp: </p>
                        <select onChange={handleChangeOptions} value={options}>
                            <option value="default">Mặc định</option>
                            <option value="low">Giá thấp đến cao</option>
                            <option value="high">Giá cao đến thấp</option>
                            <option value="sell">Bán nhiều nhất</option>
                        </select>
                    </div>
                </div>
                <div className={cx('hr-category')}></div>
            </Container>
            <Container style={{ paddingLeft: '5px' }}>
                <div className={cx('wrapper-content')}>
                    <Col sm={12} lg={9} md={8} className={cx('product-category')}>
                        {CategoryProducts.length > 0 ? (
                            CategoryProducts.map((item, index) => (
                                <ProductsView
                                    title={item.title}
                                    path={item.categoryItemPath + item.path}
                                    img={item.img}
                                    price={item.price}
                                    key={index}
                                    status={item.status}
                                    size={item.size}
                                    lg={4}
                                    md={6}
                                    xs={6}
                                />
                            ))
                        ) : (
                            <h1 style={{ marginTop: '30px', color: 'red' }}>
                                Em chưa có thêm data phần danh mục này ( Các mục có data bao gồm: Áo sơ mi, Áo thun,
                                Quần Jeans )
                            </h1>
                        )}
                        <div className={cx('hr-category-bottom')}></div>
                        <div className={cx('page-category-bottom')}>
                            <div className={cx('like-share')}>
                                <iframe
                                    src='https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fgaming%2Fphanqkhanh9196&width=500&layout=standard&action=like&size=small&share=true&height=35&appId"
                                        width="500"
                                        height="35"
                                        style="border:none;overflow:hidden"
                                        scrolling="no"
                                        frameborder="0"
                                        allowfullscreen="true"
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                                ></iframe>
                            </div>
                            <div className={cx('pagination')}>
                                {showPagination && (
                                    <Pagination>
                                        <PaginationItem
                                            disabled={pageActive == 1 ? true : false}
                                            onClick={handleClickPaginationPrev}
                                        >
                                            <PaginationLink previous />
                                        </PaginationItem>
                                        {pageNumber.map((pageNumber, index) => (
                                            <PaginationItem
                                                key={index}
                                                onClick={() => {
                                                    setPageActive(pageNumber);
                                                    PaginationChange(pageNumber);
                                                }}
                                                active={pageActive == pageNumber ? true : false}
                                            >
                                                <PaginationLink>{pageNumber}</PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem disabled={pageActive == pageNumber.length ? true : false}>
                                            <PaginationLink next onClick={handleClickPaginationNext} />
                                        </PaginationItem>
                                    </Pagination>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} lg={3} md={4} className={cx('sidebar')}>
                        <div className={cx('sidebar-top')}>
                            <div className={cx('sidebar-top-title')}>
                                <h5>SẢN PHẨM HOT</h5>
                                <div className={cx('hr')}></div>
                            </div>

                            {productHot.map((item, index) => (
                                <ProductsSidebar
                                    title={item.title}
                                    price={item.price}
                                    key={index}
                                    img={item.img}
                                    path={item.categoryItemPath + item.path}
                                />
                            ))}
                        </div>

                        <StickyBox offsetTop={60}>
                            <div className={cx('sidebar-bottom')}>
                                <div className={cx('sidebar-top-title')}>
                                    <h5>SẢN PHẨM ĐÃ XEM</h5>
                                    <div className={cx('hr')}></div>
                                </div>
                                {lsProductsSeen.length != 0 ? (
                                    lsProductsSeen
                                        .reverse()
                                        .map((item, index) => (
                                            <ProductsSidebar
                                                title={item.title}
                                                price={item.price}
                                                key={index}
                                                img={item.img}
                                                path={item.path}
                                            />
                                        ))
                                ) : (
                                    <p style={{ textAlign: 'center', fontSize: '1.4rem', marginTop: '20px' }}>
                                        Bạn chưa có sản phẩm đã xem
                                    </p>
                                )}
                            </div>
                        </StickyBox>
                    </Col>
                </div>
            </Container>
        </div>
    );
};

export default ProductsCategories;
