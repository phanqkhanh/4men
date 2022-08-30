import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './productsSidebarStyles.scss';
import { memo } from 'react';
import API from '../../API';

const cx = classNames.bind(styles);

const ProductsSidebar = ({ data, categoryItem }) => {
    var arr = [];
    if (categoryItem != null) {
        for (let index = 0; index < data.length; index++) {
            const element1 = data[index];
            for (let j = 0; j < categoryItem.length; j++) {
                const element2 = categoryItem[j];
                if (element1.categoryItemId == element2.id) {
                    // element1.categoryPath = element2.path;
                    // console.log(element2.path);
                    arr.push(element2.path);
                    break;
                }
            }
        }
    }
    return (
        <>
            {data.map((item, index) => (
                <div className={cx('sidebar-product')} key={index}>
                    <div className={cx('sidebar-product-img')}>
                        <Link to={'/' + arr[index] + '/' + item.path}>
                            <img src={API.imgURL + item.img} />
                        </Link>
                    </div>
                    <div className={cx('sidebar-product-name')}>
                        <Link to={'/' + arr[index] + '/' + item.path}>{item.title}</Link>
                        <p>{item.price} đ</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default memo(ProductsSidebar);
