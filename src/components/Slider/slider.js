import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './sliderStyles.scss';
import ProductsView from '../ProductsView/productsView';
import DataFake from '../../assets/DataFake';

const cx = classNames.bind(styles);
function Slider() {
    var lsSlider = [];

    DataFake.map((item) => {
        if (item.status == '') {
            lsSlider.push(item);
        }
    });
    //console.log(lsSlider);
    const options = {
        items: 4,
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        autoplay: false,
        autoplayTimeout: 3000,
        // responsive: {
        //     0: {
        //         items: 1,
        //     },
        //     400: {
        //         items: 1,
        //     },
        //     600: {
        //         items: 2,
        //     },
        //     700: {
        //         items: 3,
        //     },
        //     1000: {
        //         items: 5,

        //     }
        // },
    };
    return (
        <OwlCarousel className={cx('owl-theme owl-carousel')} {...options}>
            {lsSlider.map((item, index) => (
                <div className={cx('"item"')} key={index}>
                    <ProductsView
                        title={item.title}
                        path={item.path}
                        img={item.img}
                        price={item.price}
                        key={index}
                        status={item.status}
                    />
                </div>
            ))}
            {console.log(lsSlider)}
        </OwlCarousel>
        // <div>s</div>
    );
}

export default Slider;
