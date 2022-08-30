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
import API from '../../API';
import axios from 'axios';
const cx = classNames.bind(styles);
const Home = () => {
    let lsHot = useRef([]);
    let lsNew = useRef([]);
    let lsSlider = useRef([]);

    const [dataHot, setDataHot] = useState([]);
    const [dataNew, setDataNew] = useState([]);
    const [dataSlider, setDataSlider] = useState();
    const [categoryItem, setCategoryItem] = useState();

    useEffect(() => {
        getData(function (list) {
            // console.log(list);
            list.map((item, index) => {
                if (item.status == 'hot') {
                    lsHot.current.push(item);
                }
                if (item.status == 'new') {
                    lsNew.current.push(item);
                }
                if (item.sold > 20) {
                    lsSlider.current.push(item);
                }
            });
            setDataHot(lsHot.current);
            setDataNew(lsNew.current);
            setDataSlider(lsSlider.current);
            // console.log(lsSlider.current);
        });
        GetAllCategoryItem();
    }, []);

    function GetAllCategoryItem() {
        var config = {
            method: 'get',
            url: `${API.baseURL}categoriesItem`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setCategoryItem(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className={cx('home-content')}>
            <img className={cx('banner')} src={banner}></img>
            <h5 className={cx('home-title')}>THỜI TRANG BÁN CHẠY</h5>
            <Container id="container-product">
                {categoryItem && dataSlider && <Slider data={dataSlider} categoryItem={categoryItem} />}

                <hr className={cx('hr-home')} />
            </Container>
            <h5 className={cx('home-title')}>THỜI TRANG HOT NHẤT</h5>
            <Container id="container-product">
                {lsHot.current &&
                    lsHot.current.map(
                        (item, index) =>
                            categoryItem &&
                            categoryItem.map(
                                (cate, i) =>
                                    item.categoryItemId == cate.id &&
                                    index < 8 && (
                                        <ProductsView
                                            title={item.title}
                                            path={'/' + cate.path + '/' + item.path}
                                            img={item.img}
                                            price={item.price}
                                            key={index}
                                            status={item.status}
                                            size={item.size}
                                            lg={3}
                                            md={4}
                                            xs={6}
                                        />
                                    ),
                            ),
                    )}

                <hr className={cx('hr-home')} />
            </Container>
            <h5 className={cx('home-title')}>THỜI TRANG MỚI NHẤT</h5>
            <Container id="container-product">
                {dataNew &&
                    dataNew.map(
                        (item, index) =>
                            categoryItem &&
                            categoryItem.map(
                                (cate, i) =>
                                    item.categoryItemId == cate.id &&
                                    index < 8 && (
                                        <ProductsView
                                            title={item.title}
                                            path={'/' + cate.path + '/' + item.path}
                                            img={item.img}
                                            price={item.price}
                                            key={index}
                                            status={item.status}
                                            size={item.size}
                                            lg={3}
                                            md={4}
                                            xs={6}
                                        />
                                    ),
                            ),
                    )}
            </Container>
            <div className={cx('wrapper-policy-home')}>
                <PolicyHome />
            </div>
        </div>
    );
};

export default Home;
