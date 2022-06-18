import banner from '../../assets/banner-top.jpg';
import classNames from 'classnames/bind';
import styles from './homeStyles.scss';
import ProductsView from '../../components/ProductsView/productsView';
import { Container } from 'reactstrap';
import { useEffect, useState } from 'react';
import Slider from '../../components/Slider/slider';
import PolicyHome from '../../components/PolicyHome/policyHome';
import DataFake from '../../assets/DataFake';

const cx = classNames.bind(styles);

const Home = () => {
    const [dataHot, setDataHot] = useState([]);
    const [dataNew, setDataNew] = useState([]);

    useEffect(() => {
        var lsHot = [];
        DataFake.map((item) => {
            if (item.status == 'hot') {
                lsHot.push(item);
            }
        });
        setDataHot(lsHot);
    }, []);

    useEffect(() => {
        var lsNew = [];
        DataFake.map((item) => {
            if (item.status == 'new') {
                lsNew.push(item);
            }
        });

        setDataNew(lsNew);
    }, []);
    return (
        <div className={cx('home-content')}>
            <img className={cx('banner')} src={banner}></img>
            <h5 className={cx('home-title')}>THỜI TRANG BÁN CHẠY</h5>
            <Container id="container-product">
                <Slider />
                <hr className={cx('hr-home')} />
            </Container>
            <h5 className={cx('home-title')}>THỜI TRANG HOT NHẤT</h5>
            <Container id="container-product">
                {dataHot.map((item, index) => (
                    <ProductsView
                        title={item.title}
                        path={item.path}
                        img={item.img}
                        price={item.price}
                        key={index}
                        status={item.status}
                    />
                ))}
                <hr className={cx('hr-home')} />
            </Container>
            <h5 className={cx('home-title')}>THỜI TRANG MỚI NHẤT</h5>
            <Container id="container-product">
                {dataNew.map((item, index) => (
                    <ProductsView
                        title={item.title}
                        path={item.path}
                        img={item.img}
                        price={item.price}
                        key={index}
                        status={item.status}
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
