import Home from '../pages/Home/home';
import MensShirt from '../pages/MensShirt/mensShirt';
import TutorialSize from '../pages/TutorialSize/tutorialSize';
import PolicyVip from '../pages/PolicyVip/policyVip';
import Introduce from '../pages/Introduce/introduce';
import NewProducts from '../pages/NewProducts/newProducts';
import Trousers from '../pages/Trousers/trousers';
import Promotion from '../pages/Promotion/promotion';
import Footwear from '../pages/Footwear/footwear';
import Accessory from '../pages/Accessory/accessory';
import ProductsDetails from '../pages/ProductsDetails/productsDetails';
import Shirt from '../pages/Shirt/shirt';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: 'cach-chon-size', component: TutorialSize },
    { path: 'chinh-sach-khach-vip', component: PolicyVip },
    { path: 'gioi-thieu', component: Introduce },
    { path: 'thoi-trang-moi-nhat', component: NewProducts },
    { path: 'ao-nam', component: MensShirt },
    { path: 'quan-nam', component: Trousers },
    { path: 'phu-kien', component: Accessory },
    { path: 'giay-dep', component: Footwear },
    { path: 'khuyen-mai', component: Promotion },
    { path: ':tag/:tag', component: ProductsDetails },
    { path: ':tag', component: ProductsDetails },
];
