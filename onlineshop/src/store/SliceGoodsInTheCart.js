import {createSlice} from "@reduxjs/toolkit";




const goodsSliceInTheCart = createSlice({
    name: 'goodsInTheCart',
    initialState: {
        goodsInTheCart: [],
        status: null,
    },
    reducers: {
        addGoodsInTheCart(state, action){
            state.goodsInTheCart.push(action.payload)
        }
    }
})

export const {addGoodsInTheCart} = goodsSliceInTheCart.actions


export default goodsSliceInTheCart.reducer