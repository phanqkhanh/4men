import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './sliderStyles.scss';
import ProductsView from '../ProductsView/productsView';

const cx = classNames.bind(styles);
function Slider(props) {
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
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(props.data);
    }, [props.data]);
    return (
        <OwlCarousel className={cx('owl-theme owl-carousel')} {...options}>
            {props.data.map((item, index) => (
                <div className={cx('item')} key={index}>
                    <ProductsView
                        title={item.title}
                        path={item.categoryItemPath + item.path}
                        img={item.img}
                        price={item.price}
                        key={item}
                        size={item.size}
                        status={item.status}
                    />
                </div>
            ))}
        </OwlCarousel>
    );
}

export default memo(Slider);
