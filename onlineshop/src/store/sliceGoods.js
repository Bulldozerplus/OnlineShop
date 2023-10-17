import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {loadingState} from "../const/const";

export const fetchGoodsData = createAsyncThunk(
    'goods/fetchGoods',
    async function () {
        const responseDataGoods = await axios.get('http://localhost:4002/goods')
        return responseDataGoods.data
    }
)


const goodsSlice = createSlice({
    name: 'goods',
    initialState: {
        goods: [],
        status: null,
        error: null
    },
    extraReducers: {
        [fetchGoodsData.pending]: (state) => {
            state.status = loadingState.loading
            state.error = null
        },
        [fetchGoodsData.rejected]: (state, action) => {
            state.error = true
            state.status = loadingState.reject
        },
        [fetchGoodsData.fulfilled]: (state, action) => {
            state.status = loadingState.complete
            state.goods = action.payload
            state.error = null
            console.log(action.payload)
        },
    }

})

export default goodsSlice.reducer;