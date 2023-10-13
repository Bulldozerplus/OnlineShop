import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

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
            state.status = 'loading'
            state.error = null
        },
        [fetchGoodsData.rejected]: (state, action) => {
        },
        [fetchGoodsData.fulfilled]: (state, action) => {
            state.status = 'resolve'
            state.goods = action.payload
            console.log(action.payload)
        },
    }

})

export default goodsSlice.reducer;