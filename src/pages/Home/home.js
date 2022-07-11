import banner from '../../assets/banner-top.jpg';
import classNames from 'classnames/bind';
import styles from './homeStyles.scss';
import ProductsView from '../../components/ProductsView/productsView';
import { Container } from 'reactstrap';
import { useEffect, useState, useRef } from 'react';
import Slider from '../../components/Slider/slider';
import PolicyHome from '../../components/PolicyHome/policyHome';
import getData from '../../api/getData';
import ModalLink from '../../components/Modal/modalLink';

const cx = classNames.bind(styles);
const Home = () => {
    let lsHot = useRef([]);
    let lsNew = useRef([]);
    let lsSlider = useRef([]);

    const [dataHot, setDataHot] = useState([]);
    const [dataNew, setDataNew] = useState([]);
    const [dataSlider, setDataSlider] = useState([]);

    useEffect(() => {
        getData(function (list) {
            list.map((item) => {
                if (item.status == 'hot') {
                    lsHot.current.push(item);
                }
                if (item.status == 'new') {
                    lsNew.current.push(item);
                }
                if (item.status == '') {
                    lsSlider.current.push(item);
                }
            });
            setDataHot(lsHot.current);
            setDataNew(lsNew.current);
            setDataSlider(lsSlider.current);
        });
    }, []);
    return (
        <div className={cx('home-content')}>
            <img className={cx('banner')} src={banner}></img>
            <h5 className={cx('home-title')}>THỜI TRANG BÁN CHẠY</h5>
            <Container id="container-product">
                <Slider data={dataSlider} />
                {/* <Slider /> */}
                <hr className={cx('hr-home')} />
            </Container>
            <h5 className={cx('home-title')}>THỜI TRANG HOT NHẤT</h5>
            <Container id="container-product">
                {lsHot.current.map((item, index) => (
                    <ProductsView
                        title={item.title}
                        path={item.categoryItemPath + item.path}
                        img={item.img}
                        price={item.price}
                        key={index}
                        status={item.status}
                        size={item.size}
                        lg={3}
                        md={4}
                        xs={6}
                    />
                ))}
                <hr className={cx('hr-home')} />
            </Container>
            <h5 className={cx('home-title')}>THỜI TRANG MỚI NHẤT</h5>
            <Container id="container-product">
                {dataNew.map((item, index) => (
                    <ProductsView
                        title={item.title}
                        path={item.categoryItemPath + item.path}
                        img={item.img}
                        price={item.price}
                        key={index}
                        status={item.status}
                        size={item.size}
                        lg={3}
                        md={4}
                        xs={6}
                    />
                ))}
            </Container>
            <div className={cx('wrapper-policy-home')}>
                <PolicyHome />
            </div>
        </div>
    );
};

export default Home;
