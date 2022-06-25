import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addCart: (state, action) => {
            const addProduct = action.payload;
            if (state.length > 0) {
                const cartIndex = state.findIndex(
                    (product) => product.sizeOption == addProduct.sizeOption && product.title == addProduct.title,
                );

                if (cartIndex >= 0) {
                    // console.log(state[cartIndex].amount);
                    state[cartIndex].amount = state[cartIndex].amount + addProduct.amount;
                } else {
                    state.push(addProduct);
                }
            } else {
                state.push(addProduct);
            }
        },
        removeCart: (state, action) => {
            const removeProduct = action.payload;

            return state.filter((product) => {
                if (product.title !== removeProduct.title) {
                    return product;
                } else {
                    if (product.sizeOption !== removeProduct.sizeOption) {
                        return product;
                    }
                }
            });
        },
    },
});

const { reducer, actions } = cart;
export const { addCart, removeCart } = actions;
export default reducer;
