import {configureStore} from "@reduxjs/toolkit";
import goodsReducer from "./sliceGoods"
import goodsByIdReducer from './sliceGoodsById'
export const store = configureStore({
    reducer: {
        goods: goodsReducer,
        currentGoods: goodsByIdReducer
    },
})
