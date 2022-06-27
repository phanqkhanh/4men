import classNames from 'classnames/bind';
import styles from './orderStyles.scss';
import { Container, Col, Input, Form, FormGroup, Label, Button, Table } from 'reactstrap';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCart } from '../../redux/slice';

const cx = classNames.bind(styles);

const Order = () => {
    const [provinces, setProvinces] = useState('');
    const [districts, setDistrict] = useState('');
    const [lsProvinces, setLsProvinces] = useState([]);
    const [disabledOptions, setDisabledOptions] = useState(true);
    const [lsDistrict, setLsDistrict] = useState([]);
    const productsCart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    //var lsProvinces = [];
    useEffect(() => {
        const api = 'https://provinces.open-api.vn/api/';
        fetch(api)
            .then((response) => response.json())
            .then((data) => setLsProvinces(data));
    }, []);
    function handleTotalMoney() {
        var total = 0;
        productsCart.map((product) => {
            total = total + product.amount * Number(product.price.replace('.', ''));
        });
        // for (const char of total.toString()) {
        //     console.log(char);
        // }
        var arr = total.toString().split('');
        var arrNew = [];
        for (let index = 0; index < arr.length; index++) {
            if (
                (arr.length == 6 && index == 3) ||
                (arr.length == 7 && (index == 1 || index == 4)) ||
                (arr.length == 8 && (index == 2 || index == 5))
            ) {
                arrNew.push('.');
                arrNew.push(arr[index]);
            } else {
                arrNew.push(arr[index]);
            }
        }
        return arrNew;
    }
    function handleProvincesChang(provinces) {
        setProvinces(provinces.target.value);
        if (provinces.target.value == 'default') {
            setDisabledOptions(true);
        } else {
            setDisabledOptions(false);
            const api = 'https://provinces.open-api.vn/api/?depth=2';
            fetch(api)
                .then((response) => response.json())
                .then((data) => {
                    data.map((item) => {
                        if (item.name == provinces.target.value) {
                            setLsDistrict(item.districts);
                        }
                    });
                });
        }
    }
    return (
        <Container className={cx('order')}>
            <Col sm={5} className={cx('order-info')}>
                <h5>Thông tin liên hệ giao hàng</h5>
                <hr />
                <Form inline>
                    <FormGroup className={cx('')} floating>
                        <Input id="exampleName" name="name" placeholder="Name" type="text" />
                        <Label for="exampleName">Họ và tên</Label>
                    </FormGroup>
                    <FormGroup className={cx('')} floating>
                        <Input id="exampleEmail" name="email" placeholder="Email" type="email" />
                        <Label for="exampleEmail">Email</Label>
                    </FormGroup>
                    <FormGroup className={cx('')} floating>
                        <Input id="examplePhone" name="phone" placeholder="Phone" type="text" />
                        <Label for="examplePhone">Số điện thoại</Label>
                    </FormGroup>
                </Form>
                <h5>Địa chỉ giao hàng</h5>
                <hr />
                <Form inline>
                    <FormGroup className={cx('')} floating>
                        <Input
                            id="options"
                            value={provinces}
                            onChange={handleProvincesChang}
                            name="select"
                            placeholder="select"
                            type="select"
                        >
                            <option value="default">Chọn tỉnh thành</option>
                            {lsProvinces.map((item, index) => (
                                <option value={item.name} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup className={cx('')} floating>
                        <Input
                            id="options"
                            name="select"
                            value={districts}
                            onChange={(e) => setDistrict(e.target.value)}
                            placeholder="select"
                            type="select"
                            disabled={disabledOptions}
                        >
                            <option value="default">Chọn quận huyện</option>
                            {lsDistrict.map((item, index) => (
                                <option value={item.name} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup className={cx('')} floating>
                        <Input id="exampleWards" name="wards" placeholder="wards" type="text" />
                        <Label for="exampleWards">Tên phường/Xã</Label>
                    </FormGroup>
                    <FormGroup className={cx('')} floating>
                        <Input id="exampleStreet " name="street" placeholder="street" type="text" />
                        <Label for="exampleStreet">Số nhà, tên đường</Label>
                    </FormGroup>
                    <FormGroup className={cx('')} floating>
                        <Input id="exampleNote " name="note" placeholder="note" type="textarea" />
                        <Label for="exampleNote">Ghi chú</Label>
                    </FormGroup>
                </Form>
            </Col>
            <Col sm={7} className={cx('order-products')}>
                <h5>Sản phẩm của bạn</h5>
                <hr />
                <Table hover bordered>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Sản phẩm</td>
                            <td>Số lượng</td>
                            <td>Giá</td>
                            <td>Xóa</td>
                        </tr>
                    </thead>
                    <tbody>
                        {productsCart.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index}</th>
                                <td className={cx('order-products-main')}>
                                    <img src={item.img} />
                                    <h6>
                                        {item.title} <br /> <span> Size: {item.sizeOption}</span>
                                    </h6>
                                </td>
                                <td>
                                    <p>{item.amount}</p>
                                </td>
                                <td>
                                    <span>{item.price}</span> đ (1/cái)
                                </td>
                                <td className={cx('btn-delete')}>
                                    <button
                                        onClick={() => {
                                            const actions = removeCart(item);
                                            dispatch(actions);
                                        }}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className={cx('order-total')}>
                    <p>Tổng: </p>
                    <span>{handleTotalMoney()} đ</span>
                </div>
                <hr />
                <button className={cx('btn-order')}>Gửi đơn hàng</button>
            </Col>
        </Container>
    );
};

export default Order;
