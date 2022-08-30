import styles from './breadcrumbsStyles.scss';
import classNames from 'classnames/bind';
import { Container } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Breadcrumbs = (props) => {
    return (
        <div className={cx('breadcrumbs')}>
            <Container>
                <Breadcrumb listTag="div">
                    <BreadcrumbItem tag="div">
                        <Link to="/">4MEN</Link>
                    </BreadcrumbItem>
                    {props.name == undefined ? (
                        <BreadcrumbItem active tag="span">
                            {props.category} {props.page > 1 ? ' - Trang ' + props.page : ''}
                        </BreadcrumbItem>
                    ) : (
                        <>
                            <BreadcrumbItem tag="div">
                                <Link to={'/' + props.categoryItemPath}>{props.category}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active tag="span">
                                {props.name}
                            </BreadcrumbItem>
                        </>
                    )}
                </Breadcrumb>
            </Container>
        </div>
    );
};

export default memo(Breadcrumbs);
