import {createSlice} from "@reduxjs/toolkit";


const goodsSliceInTheCart = createSlice({
    name: 'goodsInTheCart',
    initialState: {
        goodsInTheCart: {},
        status: null,
    },
    reducers: {
        changeGoodsInTheCart(state, action) {
            if (!state.goodsInTheCart[action.payload.name]) {
                state.goodsInTheCart[action.payload.name] = action.payload.count
            } else {
                state.goodsInTheCart[action.payload.name] += action.payload.count
            }
        }
    }
})

export const {changeGoodsInTheCart} = goodsSliceInTheCart.actions


export default goodsSliceInTheCart.reducer