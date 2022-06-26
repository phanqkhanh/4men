import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice';
import productsSeen from './productsSeenSlice';

const rootReducer = {
    cart: cartReducer,
    seen: productsSeen,
};
const store = configureStore({
    reducer: rootReducer,
});

export default store;
