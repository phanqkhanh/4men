import Home from '../pages/Home/home';
import TutorialSize from '../pages/TutorialSize/tutorialSize';
import PolicyVip from '../pages/PolicyVip/policyVip';
import Introduce from '../pages/Introduce/introduce';
import Promotion from '../pages/Promotion/promotion';
import ProductsDetails from '../pages/ProductsDetails/productsDetails';
import ProductsCategories from '../pages/ProductsCategories/productsCategories';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: 'cach-chon-size', component: TutorialSize },
    { path: 'chinh-sach-khach-vip', component: PolicyVip },
    { path: 'gioi-thieu', component: Introduce },
    { path: 'khuyen-mai', component: Promotion },
    { path: ':tag', component: ProductsCategories },
    { path: ':tag/:tag', component: ProductsDetails },
];
