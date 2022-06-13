import Home from '../pages/Home/home';
import Shirt from '../pages/Shirt/shirt';
import TutorialSize from '../pages/TutorialSize/tutorialSize';
import Policy from '../pages/Policy/policy';
import Introduce from '../pages/Introduce/introduce';
import NewProducts from '../pages/NewProducts/newProducts';
import Trousers from '../pages/Trousers/trousers';
import Promotion from '../pages/Promotion/promotion';
import Footwear from '../pages/Footwear/footwear';
import Accessory from '../pages/Accessory/accessory';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: 'cach-chon-size', component: TutorialSize },
    { path: 'chinh-sach-khach-vip', component: Policy },
    { path: 'gioi-thieu', component: Introduce },
    { path: 'thoi-trang-moi-nhat', component: NewProducts },
    { path: 'ao-nam', component: Shirt },
    { path: 'quan-nam', component: Trousers },
    { path: 'phu-kien', component: Accessory },
    { path: 'giay-dep', component: Footwear },
    { path: 'khuyen-mai', component: Promotion },
];
