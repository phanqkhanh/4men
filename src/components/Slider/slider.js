import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './sliderStyles.scss';
import ProductsView from '../ProductsView/productsView';
import Sliders from 'react-slick';

const cx = classNames.bind(styles);
function Slider({ data, categoryItem }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            // {
            //     breakpoint: 480,
            //     settings: {
            //         slidesToShow: 2,
            //         slidesToScroll: 2,
            //     },
            // },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    for (let index = 0; index < data.length; index++) {
        const element1 = data[index];
        for (let j = 0; j < categoryItem.length; j++) {
            const element2 = categoryItem[j];
            if (element1.categoryItemId == element2.id) {
                element1.categoryPath = element2.path;
                break;
            }
        }
    }
    // console.log(categoryItem);
    // console.log(data);
    return (
        <Sliders {...settings}>
            {data &&
                data.map((item, index) => (
                    <div className={cx('item')} key={index}>
                        <ProductsView
                            id={item.id}
                            title={item.title}
                            path={'/' + item.categoryPath + '/' + item.path}
                            img={item.img}
                            price={item.price}
                            key={index}
                            status={item.status}
                            size={item.size}
                        />
                    </div>
                ))}
        </Sliders>
    );
}

export default memo(Slider);
