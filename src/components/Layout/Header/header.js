import classNames from 'classnames/bind';
import styles from './headerStyles.scss';
import logo from '../../../assets/logo.png';
import { faCartShopping, faMagnifyingGlass, faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Container,
    Row,
    Column,
    Dropdown,
    DropdownToggle,
    DropdownMenu as DropdownMenuMobile,
    DropdownItem,
} from 'reactstrap';
import { Outlet, Link, useParams, useNavigate } from 'react-router-dom';
import DropdownMenu from '../../DropdownMenu/dropdownMenu';
import Cart from '../../Cart/cart';
import { useEffect, useState, useContext } from 'react';
import { SearchContext } from '../../../Context/context';

const cx = classNames.bind(styles);
const Menu1 = [
    { title: 'Áo sơ mi', path: '/ao-so-mi' },
    { title: 'Áo thun', path: '/ao-thun' },
    { title: 'Áo polo', path: '/ao-polo' },
    { title: 'Áo khoác', path: '/ao-khoac' },
    { title: 'Áo vest', path: '/ao-vest' },
    { title: 'Áo ghi lê', path: '/ao-ghi-le' },
    { title: 'Áo len', path: '/ao-len' },
];
const Menu2 = [
    { title: 'Quần jeans', path: '/quan-jeans' },
    { title: 'Quần tây', path: '/quan-tay' },
    { title: 'Quần kaki', path: '/quan-kaki' },
    { title: 'Quần jogger', path: '/quan-jogger' },
    { title: 'Quần short', path: '/quan-short' },
    { title: 'Quần lót', path: '/quan-lot' },
];
const Menu3 = [
    { title: 'Thắt lưng', path: '/that-lung' },
    { title: 'Ví da', path: '/vi-da' },
    { title: 'Cà vạt', path: '/ca-vat' },
    { title: 'Nơ', path: '/no-nam' },
    { title: 'Vớ nam', path: '/vo-nam' },
    { title: 'Mũ nón', path: '/mu-non' },
    { title: 'Túi xách', path: '/tui-xach' },
    { title: 'Mắt kính', path: '/mat-kinh' },
];
const Menu4 = [
    { title: 'Giày', path: '/giay' },
    { title: 'Sandal', path: '/sandal' },
    { title: 'Dép nam', path: '/dep-nam' },
];

function Header() {
    const [top, setTop] = useState('static');
    const [show, setShow] = useState(false);
    const [showNav, setShowNav] = useState(window.innerWidth < 768 ? false : true);
    const [showNavMobile, setShowNavMobile] = useState(false);
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [showDropdown3, setShowDropdown3] = useState(false);
    const [showDropdown4, setShowDropdown4] = useState(false);
    const [search, setSearch] = useState('');

    let navigate = useNavigate();

    //useContext
    const context = useContext(SearchContext);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 40) {
                setTop('fixed');
            } else if (showNav) {
                setTop('static');
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showNav]);

    useEffect(() => {
        function handleScrollGoToTop() {
            if (window.scrollY >= 300) {
                setShow(true);
            } else {
                setShow(false);
            }
        }
        function handleResize() {
            if (window.innerWidth < 768) {
                setShowNav(false);
                setTop('fixed');
            } else {
                setShowNav(true);
            }
        }
        window.addEventListener('scroll', handleScrollGoToTop);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScrollGoToTop);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const path = useParams();
    useEffect(() => {
        setShowNavMobile(false);
    }, [path]);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    function handleEnter(e) {
        if (e.key === 'Enter') {
            // console.log(e.target.value);
            context.setSearchValue(e.target.value);
            navigate('/tim-kiem');
            setSearch('');
        }
    }

    return (
        <header>
            {showNav && (
                <div className={cx('header-top')} style={{ paddingBottom: top == 'fixed' ? '120px' : '0' }}>
                    <Container>
                        <div className={cx('header-top-list')}>
                            <div className={cx('header-top-left')}>
                                <FontAwesomeIcon
                                    icon={faPhoneFlip}
                                    fontSize={16}
                                    color="white"
                                    className={cx('icon-phone')}
                                />
                                <p> Hotline: 0123456789</p>
                            </div>
                            <div className={cx('header-top-right')}>
                                <ul>
                                    <li>
                                        <Link to="/cach-chon-size">Cách chọn size</Link>
                                    </li>
                                    <li>
                                        <Link to="/chinh-sach-khach-vip">Chính sách khách vip</Link>
                                    </li>
                                    <li>
                                        <Link to="/gioi-thieu">Giới thiệu</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Container>
                </div>
            )}
            <div
                className={cx('header-bottom')}
                style={{
                    position: top,
                    top: '0',
                    left: '0',
                    backgroundColor: '#fff',
                    height: top == 'fixed' && showNav ? '70px' : '80px',
                }}
            >
                <Container>
                    <div className={cx('header-bottom-list')}>
                        <div className={cx('logo')}>
                            <Link to="/">
                                <img src={logo}></img>
                            </Link>
                        </div>
                        {showNav ? (
                            <div className={cx('navbars')}>
                                <div className={cx('navbar-left')}>
                                    <ul className={cx('nav-list')}>
                                        <li className={cx('nav-item')}>
                                            <Link to="/thoi-trang-moi-nhat">
                                                HÀNG MỚI<span className={cx('nav-badge')}>Hot</span>
                                            </Link>
                                        </li>
                                        <li className={cx('nav-item')}>
                                            <Link to="/ao-nam">ÁO NAM</Link>
                                            <DropdownMenu menu="menu1" />
                                        </li>
                                        <li className={cx('nav-item')}>
                                            <Link to="/quan-nam">QUẦN NAM</Link>
                                            <DropdownMenu menu="menu2" />
                                        </li>
                                        <li className={cx('nav-item')}>
                                            <Link to="/phu-kien">PHỤ KIỆN</Link>
                                            <DropdownMenu menu="menu3" />
                                        </li>
                                        <li className={cx('nav-item')}>
                                            <Link to="/giay-dep">GIÀY DÉP</Link>
                                            <DropdownMenu menu="menu4" />
                                        </li>
                                        <li className={cx('nav-item')}>
                                            <Link to="/khuyen-mai">
                                                KHUYẾN MÃI<span className={cx('nav-badge')}>Hot</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx('navbar-right')}>
                                    <div className={cx('btn-cart')}>
                                        <FontAwesomeIcon icon={faCartShopping} className={cx('cart-icon')} />
                                        <Cart />
                                    </div>
                                    <div className={cx('btn-search')}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                                        <div
                                            className={cx('search-home')}
                                            style={{
                                                height: search == '' ? '' : '52px',
                                                border: search == '' ? '' : '1px solid #3a3a3a',
                                            }}
                                        >
                                            <input
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                onKeyDown={(e) => handleEnter(e)}
                                                type="text"
                                                name="search"
                                                placeholder="Tìm kiếm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('mobile')}>
                                <div className={cx('btn-cart-mobile')}>
                                    <Link to="/dat-hang">
                                        <FontAwesomeIcon icon={faCartShopping} className={cx('cart-icon')} />
                                    </Link>
                                </div>
                                <div className={cx('btn-search-mobile')}>
                                    <Link to="/tim-kiem">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                                    </Link>
                                </div>
                                <div className={cx('btn-toggle')}>
                                    <button onClick={() => setShowNavMobile(!showNavMobile)}>
                                        {showNavMobile ? (
                                            <i className="fa-solid fa-xmark"></i>
                                        ) : (
                                            <i className="fa-solid fa-bars"></i>
                                        )}
                                    </button>
                                    <div
                                        className={cx('nav-mobile')}
                                        style={{
                                            left: showNavMobile ? '0' : '-100vw',
                                        }}
                                    >
                                        <Link to="/thoi-trang-moi-nhat">
                                            HÀNG MỚI<span class="nav-badge">Hot</span>
                                        </Link>
                                        <Dropdown
                                            isOpen={showDropdown1}
                                            toggle={() => setShowDropdown1(!showDropdown1)}
                                            className={cx('dropdown-mobile')}
                                        >
                                            <DropdownToggle
                                                style={{ backgroundColor: showDropdown1 ? '#e0e0e0' : '' }}
                                                data-toggle="dropdown"
                                                tag="span"
                                                color="secondary"
                                            >
                                                ÁO NAM
                                            </DropdownToggle>
                                            <DropdownMenuMobile className={cx('nav-menu-mobile')}>
                                                <ul>
                                                    {Menu1.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={item.path}>{item.title}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </DropdownMenuMobile>
                                        </Dropdown>
                                        <Dropdown
                                            isOpen={showDropdown2}
                                            toggle={() => setShowDropdown2(!showDropdown2)}
                                            className={cx('dropdown-mobile')}
                                        >
                                            <DropdownToggle
                                                style={{ backgroundColor: showDropdown2 ? '#e0e0e0' : '' }}
                                                data-toggle="dropdown"
                                                tag="span"
                                                color="secondary"
                                            >
                                                QUẦN NAM
                                            </DropdownToggle>
                                            <DropdownMenuMobile className={cx('nav-menu-mobile')}>
                                                <ul>
                                                    {Menu2.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={item.path}>{item.title}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </DropdownMenuMobile>
                                        </Dropdown>
                                        <Dropdown
                                            isOpen={showDropdown3}
                                            toggle={() => setShowDropdown3(!showDropdown3)}
                                            className={cx('dropdown-mobile')}
                                        >
                                            <DropdownToggle
                                                style={{ backgroundColor: showDropdown3 ? '#e0e0e0' : '' }}
                                                data-toggle="dropdown"
                                                tag="span"
                                                color="secondary"
                                            >
                                                PHỤ KIỆN
                                            </DropdownToggle>
                                            <DropdownMenuMobile className={cx('nav-menu-mobile')}>
                                                <ul>
                                                    {Menu3.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={item.path}>{item.title}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </DropdownMenuMobile>
                                        </Dropdown>
                                        <Dropdown
                                            isOpen={showDropdown4}
                                            toggle={() => setShowDropdown4(!showDropdown4)}
                                            className={cx('dropdown-mobile')}
                                        >
                                            <DropdownToggle
                                                style={{ backgroundColor: showDropdown4 ? '#e0e0e0' : '' }}
                                                data-toggle="dropdown"
                                                tag="span"
                                                color="secondary"
                                            >
                                                GIÀY DÉP
                                            </DropdownToggle>
                                            <DropdownMenuMobile className={cx('nav-menu-mobile')}>
                                                <ul>
                                                    {Menu4.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={item.path}>{item.title}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </DropdownMenuMobile>
                                        </Dropdown>
                                        <Link to="/">
                                            KHUYẾN MÃI<span className="nav-badge">Hot</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </div>

            {show && (
                <div className="go-to-top">
                    <button onClick={scrollToTop}>
                        <i className="fa-solid fa-chevron-up"></i>
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
