import classNames from 'classnames/bind';
import styles from './headerStyles.scss';
import logo from '../../../assets/logo.png';
import { faCartShopping, faMagnifyingGlass, faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Column } from 'reactstrap';
import { Outlet, Link } from 'react-router-dom';
import DropdownMenu from '../../DropdownMenu/dropdownMenu';
import Cart from '../../Cart/cart';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [top, setTop] = useState('static');
    const [show, setShow] = useState(false);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 40) {
                setTop('fixed');
            } else {
                setTop('static');
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        function handleScrollGoToTop() {
            if (window.scrollY >= 300) {
                setShow(true);
            } else {
                setShow(false);
            }
        }
        window.addEventListener('scroll', handleScrollGoToTop);
        return () => {
            window.removeEventListener('scroll', handleScrollGoToTop);
        };
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <header>
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
            <div
                className={cx('header-bottom')}
                style={{
                    position: top,
                    top: '0',
                    left: '0',
                    backgroundColor: '#fff',
                    height: top == 'fixed' ? '70px' : '80px',
                }}
            >
                <Container>
                    <div className={cx('header-bottom-list')}>
                        <div className={cx('logo')}>
                            <Link to="/">
                                <img src={logo}></img>
                            </Link>
                        </div>
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
                                    <form className={cx('search-home')}>
                                        <input type="text" name="search" placeholder="Tìm kiếm" />
                                    </form>
                                </div>
                            </div>
                        </div>
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
