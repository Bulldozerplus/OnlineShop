import {configureStore} from "@reduxjs/toolkit";
import goodsReducer from "./sliceGoods"
export const store = configureStore({
    reducer: {
        goods: goodsReducer,
    },
})
