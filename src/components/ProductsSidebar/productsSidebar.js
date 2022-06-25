import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './productsSidebarStyles.scss';
import { memo } from 'react';

const cx = classNames.bind(styles);

const ProductsSidebar = (props) => {
    return (
        <div className={cx('sidebar-product')}>
            <div className={cx('sidebar-product-img')}>
                <Link to={props.path}>
                    <img src={props.img} />
                </Link>
            </div>
            <div className={cx('sidebar-product-name')}>
                <Link to={props.path}>{props.title}</Link>
                <p>{props.price} đ</p>
            </div>
        </div>
    );
};

export default memo(ProductsSidebar);
