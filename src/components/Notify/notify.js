import React from 'react';
import { useEffect, useState, memo } from 'react';
import styles from './notifyStyles.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Notify = () => {
    return (
        <div className={cx('notify-complete')}>
            <p>Đã thêm</p>
        </div>
    );
};

export default memo(Notify);
