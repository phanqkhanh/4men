import { createSlice } from '@reduxjs/toolkit';

const ProductsSeen = createSlice({
    name: 'seen',
    initialState: [],
    reducers: {
        addProductSeen: (state, action) => {
            //console.log(state.length);
            const addProduct = action.payload;
            if (state.length > 0) {
                const productIndex = state.findIndex((product) => product.title == addProduct.title);
                console.log(productIndex);
                if (productIndex == -1) {
                    if (state.length > 3) {
                        var ls = state;
                        state.shift();
                        state.push(action.payload);
                    } else {
                        state.push(action.payload);
                    }
                }
            } else {
                state.push(action.payload);
            }
        },
    },
});

const { reducer, actions } = ProductsSeen;
export const { addProductSeen } = actions;
export default reducer;
