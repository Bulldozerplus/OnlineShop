import {configureStore} from "@reduxjs/toolkit";
import goodsReducer from "./sliceGoods"
import goodsByIdReducer from './sliceGoodsById'
import goodsSliceInTheCart from './SliceGoodsInTheCart'
export const store = configureStore({
    reducer: {
        goods: goodsReducer,
        currentGoods: goodsByIdReducer,
        goodsInTheCart: goodsSliceInTheCart
    },
})
