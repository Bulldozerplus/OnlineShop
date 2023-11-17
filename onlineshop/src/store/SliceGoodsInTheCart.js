import {createSlice} from "@reduxjs/toolkit";


const goodsSliceInTheCart = createSlice({
        name: 'shoppingCart',
        initialState: {
            shoppingCart: {},
            status: null,
        },
        reducers: {
            changeGoodsInTheCart(state, action) {
                if (!state.shoppingCart[action.payload.name]) {
                    state.shoppingCart[action.payload.name] = {
                        ...action.payload,
                    }
                } else {
                    console.log(action.payload)
                    state.shoppingCart[action.payload.name] = {
                        ...state.shoppingCart[action.payload.name],
                        count: state.shoppingCart[action.payload.name].count += action.payload.count
                    }
                }
            }
        }
    }
)


export const {changeGoodsInTheCart} = goodsSliceInTheCart.actions


export default goodsSliceInTheCart.reducer