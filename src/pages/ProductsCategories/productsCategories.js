import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs';
import { Col, Container, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './productsCategoriesStyles.scss';
import StickyBox from 'react-sticky-box';
import ProductsSidebar from '../../components/ProductsSidebar/productsSidebar';
import getData from '../../api/getData';
import ProductsView from '../../components/ProductsView/productsView';
import { useSelector } from 'react-redux';
import API from '../../API';
import axios from 'axios';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchContext } from '../../Context/context';
import TutorialSize from '../TutorialSize/tutorialSize';
import PolicyVip from '../PolicyVip/policyVip';
import Introduce from '../Introduce/introduce';
import Promotion from '../Promotion/promotion';

const options = [''];

const cx = classNames.bind(styles);

const ProductsCategories = () => {
    const [lsProductsCategory, setLsProductsCategory] = useState();
    var path = useLocation();
    let lsHot = useRef([]);
    let listDefaults = useRef();

    var lsProductsSeen = [];
    const ProductsSeen = useSelector((state) => state.seen);
    ProductsSeen &&
        ProductsSeen.map((product) => {
            lsProductsSeen.push(product);
        });
    localStorage.removeItem('productSeen');
    localStorage.setItem('productSeen', JSON.stringify(ProductsSeen));
    const [CategoryProducts, setCategoryProducts] = useState([]);
    const [productHot, setProductHot] = useState();
    const [productSeen, setProductSeen] = useState();
    const [category, setCategory] = useState('');
    const [options, setOptions] = useState('');
    const [pageNumber, setPageNumber] = useState([]);
    const [pageActive, setPageActive] = useState(1);
    const [showPagination, setShowPagination] = useState(true);
    const [allCategoryItems, setAllCategoryItems] = useState();

    //useContext
    const searchCxt = useContext(SearchContext);
    //page
    const [search, setSearch] = useState(searchCxt.searchValue);
    const [isPageSearch, setIsPageSearch] = useState(false);
    const [isPageSize, setIsPageSize] = useState(false);
    const [isPagePolicyVip, setIsPagePolicyVip] = useState(false);
    const [isPageProducts, setIsPageProducts] = useState(false);
    const [isPageIntro, setIsPageIntro] = useState(false);

    var str = path.pathname;
    // console.log(str);
    useEffect(() => {
        switch (str) {
            case '/ao-nam':
                FilterProductsCategory('1');
                setCategory('Áo nam');
                setIsPageSearch(false);
                setIsPageSize(false);
                setIsPageProducts(true);
                setIsPageIntro(false);
                setIsPagePolicyVip(false);
                break;
            case '/quan-nam':
                FilterProductsCategory('2');
                setCategory('Quần nam');
                setIsPageSearch(false);
                setIsPageSize(false);
                setIsPageProducts(true);
                setIsPageIntro(false);
                setIsPagePolicyVip(false);
                break;
            case '/phu-kien':
                FilterProductsCategory('3');
                setCategory('Phụ kiện');
                setIsPageSearch(false);
                setIsPageSize(false);
                setIsPageProducts(true);
                setIsPageIntro(false);
                setIsPagePolicyVip(false);
                break;
            case '/giay-dep':
                FilterProductsCategory('4');
                setCategory('Giày dép');
                setIsPageSearch(false);
                setIsPageSize(false);
                setIsPageProducts(true);
                setIsPageIntro(false);
                setIsPagePolicyVip(false);
                break;
            case '/tim-kiem':
                setCategory('Tìm kiếm sản phẩm');
                setIsPageSize(false);
                setIsPageProducts(true);
                setIsPageIntro(false);
                setIsPagePolicyVip(false);
                break;
            case '/thoi-trang-moi-nhat':
                setCategory('Thời trang mới nhất');
                ProductsNew();
                setIsPageSize(false);
                setIsPageProducts(true);
                setIsPageProducts(true);
                setIsPageIntro(false);
                setIsPagePolicyVip(false);
                break;
            case '/cach-chon-size':
                setCategory('Hướng dẫn chọn size');
                setIsPageSize(true);
                setIsPageProducts(false);
                setIsPageIntro(false);
                setIsPagePolicyVip(false);
                break;
            case '/chinh-sach-khach-vip':
                setCategory('Chính sách khách vip');
                setIsPagePolicyVip(true);
                setIsPageProducts(false);
                setIsPageIntro(false);
                setIsPageSize(false);
                break;
            case '/gioi-thieu':
                setCategory('Giới thiệu 4men');
                setIsPagePolicyVip(false);
                setIsPageProducts(false);
                setIsPageIntro(true);
                setIsPageSize(false);
                break;
            case '/khuyen-mai':
                ProductsPromotion();
                setCategory('Thời trang khuyến mãi');
                setIsPagePolicyVip(false);
                setIsPageProducts(false);
                setIsPageIntro(false);
                setIsPageSize(false);
                setIsPageProducts(true);
                break;
            default:
                GetAllCategoryItem(str);
                setIsPageSearch(false);
                setIsPageSize(false);
                setIsPageIntro(false);
                // console.log('default');
                setIsPageProducts(true);
                break;
        }
        GetProducts();
        GetAllCategoryItem();
    }, [path.pathname]);
    // console.log(searchCxt.searchValue);
    useEffect(() => {
        if (path.pathname === '/tim-kiem') {
            SearchProduct(searchCxt.searchValue);
            setSearch(searchCxt.searchValue);
            setIsPageSearch(true);
        }
    }, [searchCxt.searchValue]);

    function Run(data) {
        PaginationChange(1, data);
        // console.log(data);
        // setProductHot(lsHot.current);
        var lsPage = [];
        var count = Math.ceil(data.length / 12);
        for (let i = 0; i < count; i++) {
            lsPage.push(i + 1);
        }
        setPageNumber(lsPage);
        setOptions('default');
        setShowPagination(true);
        setPageActive(1);
    }
    // console.log(allCategoryItems);
    function FilterProductsCategory(categoryId) {
        // alert('s');
        var config = {
            method: 'get',
            url: `${API.baseURL}filterproducts/category/${categoryId}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                // setShowLoading(true);
                if (response.status == 200) {
                    // setProducts(response.data);
                    // productsSearch.current = response.data;
                    // console.log(response.data);
                    // setLsProductsCategory(response.data);
                    console.log('chay');
                    Run(response.data);
                    listDefaults.current = response.data;
                    setLsProductsCategory(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                // setShowLoading(false);
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
                // setShowLoading(true);
                // console.log(response.data);
                if (response.status == 200) {
                    Run(response.data);
                    setLsProductsCategory(response.data);
                    // productsSearch.current = response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                // setShowLoading(false);
            });
    }
    function GetAllCategoryItem(str) {
        var config = {
            method: 'get',
            url: `${API.baseURL}categoriesItem`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setAllCategoryItems(response.data);
                    for (let index = 0; index < response.data.length; index++) {
                        const element = response.data[index];
                        if ('/' + element.path == str) {
                            FilterProductsCategoryItem(element.id);
                            setCategory(element.title);
                        }
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
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
                if (response.status == 200) {
                    var arrNew = [];
                    var index = 0;
                    for (let i = 0; i < response.data.length; i++) {
                        const element = response.data[i];
                        if (index < 4) {
                            if (element.status == 'hot') {
                                arrNew.push(element);
                                index += 1;
                            }
                        } else if (index > 5) {
                            break;
                        }
                    }
                    setProductHot(arrNew);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function SearchProduct(name) {
        var config = {
            method: 'get',
            url: `${API.baseURL}products/${name}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data);
                Run(response.data);
                setLsProductsCategory(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function ProductsNew() {
        var config = {
            method: 'get',
            url: `${API.baseURL}filterproducts/productsnew`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                Run(response.data);
                setLsProductsCategory(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function ProductsPromotion() {
        var config = {
            method: 'get',
            url: `${API.baseURL}filterproducts/promotion`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                Run(response.data);
                setLsProductsCategory(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //sort options
    console.log(listDefaults.current);

    function handleChangeOptions(e) {
        setPageActive(1);
        var arr = lsProductsCategory;
        var temp;
        // console.log(arr);
        switch (e.target.value) {
            case 'default':
                PaginationChange(1, listDefaults.current);
                setOptions('default');
                setShowPagination(true);
                // setCategoryProducts(arr);
                // console.log('chay');
                break;
            case 'high':
                setShowPagination(false);
                setOptions('high');
                var arrNew = arr;
                var temp;
                for (let index = 0; index < arrNew.length - 1; index++) {
                    for (let j = index + 1; j < arrNew.length; j++) {
                        if (Number(arrNew[index].price.replace('.', '')) < Number(arrNew[j].price.replace('.', ''))) {
                            temp = arrNew[index];
                            arrNew[index] = arrNew[j];
                            arrNew[j] = temp;
                        }
                    }
                }
                setCategoryProducts(arrNew);
                break;
            case 'low':
                setOptions('low');
                var arrNew = arr;
                for (var i = 0; i < arrNew.length - 1; i++) {
                    for (var j = i + 1; j < arrNew.length; j++) {
                        if (Number(arrNew[i].price.replace('.', '')) > Number(arrNew[j].price.replace('.', ''))) {
                            temp = arrNew[i];
                            arrNew[i] = arrNew[j];
                            arrNew[j] = temp;
                        }
                    }
                }
                setCategoryProducts(arrNew);
                setShowPagination(false);
                break;
            case 'sell':
                setOptions('sell');
                var arrSold = [];
                var arrNew = arr;
                var temp;
                for (let index = 0; index < arrNew.length - 1; index++) {
                    for (let j = index + 1; j < arrNew.length; j++) {
                        if (arrNew[index].sold < arrNew[j].sold) {
                            temp = arrNew[index];
                            arrNew[index] = arrNew[j];
                            arrNew[j] = temp;
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
    function PaginationChange(pageActive, data) {
        scrollToTop();
        if (data == undefined) {
            console.log('null');
            data = lsProductsCategory;
        }
        console.log(pageActive);
        var list = [];
        let start = 12 * pageActive - 12;
        let end;
        if (pageActive * 12 > data.length) {
            end = data.length;
        } else {
            end = start + 12;
        }
        for (let i = start; i < end; i++) {
            list.push(data[i]);
        }
        setCategoryProducts(list);
        // console.log(list);
    }
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };
    function handleEnter(e) {
        if (e.key === 'Enter') {
            // console.log(e.target.value);
            searchCxt.setSearchValue(e.target.value);
            // navigate('/tim-kiem');
        }
    }
    function handleSubmit(value) {
        searchCxt.setSearchValue(value);
    }
    // console.log(isPageSearch);
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
                {isPageSearch && (
                    <Col sm={6} className={cx('form-search')}>
                        <input
                            type="text"
                            className={cx('input-search')}
                            placeholder="Từ khóa tìm kiếm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => handleEnter(e)}
                        />
                        <button className={cx('button-search')} onClick={() => handleSubmit(search)}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                        </button>
                    </Col>
                )}
                <div className={cx('hr-category')}></div>
            </Container>
            <Container style={{ paddingLeft: '5px' }}>
                <div className={cx('wrapper-content')}>
                    {console.log(isPageSize)}
                    {isPageSize && (
                        <Col sm={12} lg={9} md={8}>
                            <TutorialSize />
                        </Col>
                    )}
                    {isPageProducts && ( //page sản phẩm
                        <Col sm={12} lg={9} md={8} className={cx('product-category')}>
                            {CategoryProducts.length > 0 ? (
                                CategoryProducts.map((item, index) => (
                                    <ProductsView
                                        id={item.id}
                                        title={item.title}
                                        path={item.path}
                                        img={item.img}
                                        price={item.price}
                                        key={index}
                                        status={item.status}
                                        size={item.size}
                                        promotion={item.promotion == null ? '' : item.promotion}
                                        lg={4}
                                        md={6}
                                        xs={6}
                                    />
                                ))
                            ) : (
                                <h3 style={{ marginTop: '30px', color: 'red', textAlign: 'center' }}>
                                    Không có sản phẩm phù hợp
                                </h3>
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
                    )}
                    {isPagePolicyVip && (
                        <Col sm={12} lg={9} md={8}>
                            <PolicyVip />
                        </Col>
                    )}
                    {isPageIntro && (
                        <Col sm={12} lg={9} md={8}>
                            <Introduce />
                        </Col>
                    )}

                    <Col sm={12} lg={3} md={4} className={cx('sidebar')}>
                        <div className={cx('sidebar-top')}>
                            <div className={cx('sidebar-top-title')}>
                                <h5>SẢN PHẨM HOT</h5>
                                <div className={cx('hr')}></div>
                            </div>
                            {allCategoryItems && productHot && (
                                <ProductsSidebar data={productHot} categoryItem={allCategoryItems} />
                            )}
                        </div>

                        <StickyBox offsetTop={60}>
                            <div className={cx('sidebar-bottom')}>
                                <div className={cx('sidebar-top-title')}>
                                    <h5>SẢN PHẨM ĐÃ XEM</h5>
                                    <div className={cx('hr')}></div>
                                </div>
                                {lsProductsSeen.length != 0 ? (
                                    allCategoryItems && (
                                        <ProductsSidebar
                                            data={lsProductsSeen.reverse()}
                                            categoryItem={allCategoryItems}
                                        />
                                    )
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
