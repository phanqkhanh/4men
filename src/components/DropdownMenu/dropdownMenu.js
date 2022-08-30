import classNames from 'classnames/bind';
import styles from './dropdownMenuStyles.scss';
import { Link } from 'react-router-dom';

const Menu1 = [
    { title: 'Áo sơ mi', path: '/ao-so-mi' },
    { title: 'Áo thun', path: '/ao-thun' },
    { title: 'Áo polo', path: '/ao-polo' },
    { title: 'Áo khoác', path: '/ao-khoac' },
    { title: 'Áo vest', path: '/ao-vest' },
    { title: 'Áo ghi lê', path: '/ao-ghi-le' },
    { title: 'Áo len', path: '/ao-len' },
];
const Menu2 = [
    { title: 'Quần jeans', path: '/quan-jeans' },
    { title: 'Quần tây', path: '/quan-tay' },
    { title: 'Quần kaki', path: '/quan-kaki' },
    { title: 'Quần jogger', path: '/quan-jogger' },
    { title: 'Quần short', path: '/quan-short' },
    { title: 'Quần lót', path: '/quan-lot' },
];
const Menu3 = [
    { title: 'Thắt lưng', path: '/that-lung' },
    { title: 'Ví da', path: '/vi-da' },
    { title: 'Cà vạt', path: '/ca-vat' },
    { title: 'Nơ', path: '/no-nam' },
    { title: 'Vớ nam', path: '/vo-nam' },
    { title: 'Mũ nón', path: '/mu-non' },
    { title: 'Túi xách', path: '/tui-xach' },
    { title: 'Mắt kính', path: '/mat-kinh' },
];
const Menu4 = [
    { title: 'Giày', path: '/giay' },
    { title: 'Sandal', path: '/sandal' },
    { title: 'Dép nam', path: '/dep-nam' },
];
const cx = classNames.bind(styles);
const DropdownMenu = (props) => {
    var ls;
    switch (props.menu) {
        case 'menu1':
            ls = Menu1;
            break;
        case 'menu2':
            ls = Menu2;
            break;
        case 'menu3':
            ls = Menu3;
            break;
        case 'menu4':
            ls = Menu4;
            break;
    }
    return (
        <div className={cx('dropdown-Menu')}>
            <ul>
                {ls.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path}>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default DropdownMenu;
