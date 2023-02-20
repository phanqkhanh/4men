import Home from '../pages/Home/home';
import TutorialSize from '../pages/TutorialSize/tutorialSize';
import PolicyVip from '../pages/PolicyVip/policyVip';
import Introduce from '../pages/Introduce/introduce';
import Promotion from '../pages/Promotion/promotion';
import ProductsDetails from '../pages/ProductsDetails/productsDetails';
import ProductsCategories from '../pages/ProductsCategories/productsCategories';
import Order from '../pages/Order/order';
import Layout from '../components/Layout/layout';

import Login from '../pages/Admin/Login';
import LayoutAdmin from '../pages/Admin/components/Layouts/LayoutAdmin';
import Account from '../pages/Admin/Account';
import ProductsAdmin from '../pages/Admin/ProductsAdmin';
import SettingsAdmin from '../pages/Admin/SettingsAdmin';
import AddProductsAdmin from '../pages/Admin/AddProductsAdmin';
import OrderAdmin from '../pages/Admin/Order';

export const publicRoutes = [
    { path: '/', component: Home, layout: Layout },
    // { path: 'cach-chon-size', component: TutorialSize, layout: Layout },
    // { path: 'chinh-sach-khach-vip', component: PolicyVip, layout: Layout },
    // { path: 'gioi-thieu', component: Introduce, layout: Layout },
    // { path: 'khuyen-mai', component: Promotion, layout: Layout },
    // { path: 'tim-kiem', component: Search, layout: Layout },
    { path: 'dat-hang', component: Order, layout: Layout },
    { path: 'login', component: null, layout: Login },
    { path: 'cai-dat', component: SettingsAdmin, layout: LayoutAdmin },
    { path: 'san-pham', component: ProductsAdmin, layout: LayoutAdmin },
    { path: 'them-san-pham', component: AddProductsAdmin, layout: LayoutAdmin },
    { path: 'don-hang', component: OrderAdmin, layout: LayoutAdmin },
    { path: ':tag/:tag', component: ProductsDetails, layout: Layout },
    { path: ':tag', component: ProductsCategories, layout: Layout },
];
