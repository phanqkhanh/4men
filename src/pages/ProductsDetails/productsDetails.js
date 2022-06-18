import React from 'react';
import classNames from 'classnames/bind';
import styles from './productsDetailsStyles.scss';
import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProductsDetails = () => {
    const par = useParams();
    console.log(par);
    return (
        <div>
            <Breadcrumbs />
            productsDetails
        </div>
    );
};

export default ProductsDetails;
