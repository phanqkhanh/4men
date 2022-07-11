import classNames from 'classnames/bind';
import styles from './policyHomeStyles.scss';
import { Container, Row, Col } from 'reactstrap';

const cx = classNames.bind(styles);

const policy = [
    {
        name: 'THANH TOÁN & GIAO HÀNG',
        icon: 'fa-solid fa-plane',
        description1: 'Miễn phí vận chuyển cho đơn hàng trên 499.000 VNĐ',
        description2: '- Giao hàng và thu tiền tận nơi',
        description3: '- Chuyển khoản và giao hàng',
        description4: '- Mua hàng tại shop',
    },
    {
        name: 'THẺ THÀNH VIÊN',
        icon: 'fa-solid fa-money-check',
        description1: 'Chế độ ưu đãi thành viên VIP:',
        description2: '- 5% cho thành viên Bạc',
        description3: '- 10% cho thành viên Vàng',
        description4: '- 15% cho thành viên Kim cương',
    },
    {
        name: 'GIỜ MỞ CỬA',
        icon: 'fa-solid fa-clock',
        description1: ' 8h30 đến 22:00 ',
        description2: '- Tất cả các ngày trong tuần',
        description3: '- Áp dụng cho tất cả các chi nhánh hệ thống cửa hàng 4MEN',
        description4: '',
    },
    {
        name: 'HỖ TRỢ 24/7',
        icon: 'fa-solid fa-headphones-simple',
        description1: 'Gọi ngay cho chúng tôi khi bạn có thắc mắc',
        description2: '- 0868.666.888',
        description3: '',
        description4: '',
    },
];

const Policy = () => {
    return (
        <div className={cx('policy')}>
            <Container>
                <Row>
                    <div className={cx('policy-list')}>
                        {policy.map((item, index) => (
                            <Col xs={12} sm={6} md={3} key={index}>
                                <div className={cx('policy-item')} key={index}>
                                    <div>
                                        <i className={item.icon}></i>
                                        <h4>{item.name}</h4>
                                    </div>
                                    <p>
                                        {item.description1}
                                        <br />
                                        {item.description2}
                                        <br />
                                        {item.description3}
                                        <br />
                                        {item.description4}
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Policy;
