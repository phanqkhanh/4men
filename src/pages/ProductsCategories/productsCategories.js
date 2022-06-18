import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs';
import { Container } from 'reactstrap';

const ProductsCategories = (props) => {
    return (
        <div>
            <Breadcrumbs category={props.category} />
            <Container>ProductsCategories {props.title}</Container>
        </div>
    );
};

export default ProductsCategories;
