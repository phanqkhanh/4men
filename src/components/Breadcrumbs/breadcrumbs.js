import styles from './breadcrumbsStyles.scss';
import classNames from 'classnames/bind';
import { Container } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const Breadcrumbs = (props) => {
    var p1, p2, path1, path2;
    var path = useLocation();
    var str = path.pathname;
    var length = str.lastIndexOf('/');
    if (length > 0) {
        p1 = str.slice(1, length);
        p2 = str.slice(length + 1);
        //path2 = p2.replace(/-/g, ' ');
    } else {
        p1 = str.slice(1);
    }

    //path1 = p1.replace(/-/g, ' ');

    // console.log(path1);
    // console.log(path2);

    return (
        <div className={cx('breadcrumbs')}>
            <Container>
                <Breadcrumb listTag="div">
                    <BreadcrumbItem href="/" tag="a">
                        4MEN
                    </BreadcrumbItem>
                    {props.title == undefined ? (
                        <BreadcrumbItem active tag="span">
                            {props.category}
                        </BreadcrumbItem>
                    ) : (
                        <>
                            <BreadcrumbItem href={p1} tag="a">
                                {props.title}
                            </BreadcrumbItem>
                            <BreadcrumbItem active tag="span">
                                {props.category}
                            </BreadcrumbItem>
                        </>
                    )}
                </Breadcrumb>
            </Container>
        </div>
    );
};

export default Breadcrumbs;
