import classNames from 'classnames/bind';
import styles from './footerStyles.scss';

import logoFooter from '../../../assets/logo-footer.png';
import mapFooter from '../../../assets/footer-map.jpg';
import gov from '../../../assets/gov.png';
import { Link } from 'react-router-dom';
import { Col, Container } from 'reactstrap';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-top')}>
                <Container className={cx('footer-top-list')}>
                    <Col xs={12} sm={6} lg={3}>
                        <div className={cx('footer-top-item')}>
                            <img src={logoFooter} alt="" className={cx('logo-footer')} /> <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Giới thiệu
                            </Link>{' '}
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Liên hệ
                            </Link>
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Tuyển dụng
                            </Link>
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Tin tức
                            </Link>
                            <br />
                            <p>
                                <i className={cx('fa-solid fa-envelope')}></i> Email: phanqkhanh9196@gmail.com
                            </p>
                            <p>
                                <i className={cx('fa-solid fa-phone')}></i> Hotline: 0868.444.644
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} lg={3}>
                        <div className={cx('footer-top-item footer-top-item2')}>
                            <u>HỖ TRỢ KHÁCH HÀNG</u> <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Hướng dẫn đặt hàng
                            </Link>
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Hướng dẫn chọn size
                            </Link>
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Câu hỏi thường gặp
                            </Link>
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Chính sách khách VIP
                            </Link>
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Thanh toán - Giao hàng
                            </Link>
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Chính sách đổi hàng
                            </Link>
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Chính sách bảo mật
                            </Link>
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Chính sách cookie
                            </Link>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} lg={3}>
                        <div className={cx('footer-top-item')}>
                            <u>HỆ THỐNG CỬA HÀNG</u> <br />
                            <Link to="/">
                                <img src={mapFooter} alt="" className={cx('map-footer')} />
                            </Link>
                            <br />
                            <Link to="/">
                                <i className={cx('fa-solid fa-angles-right')}></i> Tìm địa chỉ cửa hàng gần bạn
                            </Link>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} lg={3} style={{ overflow: 'auto' }}>
                        <div className={cx('footer-top-item ')}>
                            <u>KẾT NỐI VỚI 4MEN</u>
                            <iframe src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fphanqkhanh9196&tabs&width=270&height=200&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="270" height="200" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'></iframe>
                        </div>
                    </Col>
                </Container>
            </div>
            <div className={cx('footer-bottom')}>
                <Container className={cx('footer-bottom-list')}>
                    <Col xs={12} sm={12} md={8} className={cx('footer-bottom-item')}>
                        <p>Copyright 2022 · Thiết kế và phát triển bởi 4MEN SHOP All rights reserved</p>
                        <p style={{ color: '#cc0000' }}>
                            Nhãn hiệu "4MEN" đã được đăng kí độc quyền tại Cục sở hữu trí tuệ Việt Nam
                        </p>
                    </Col>
                    <Col xs={12} sm={12} md={4} className={cx('footer-bottom-item')}>
                        <img src={gov} alt="" />
                    </Col>
                </Container>
            </div>
        </div>
    );
};

export default Footer;
