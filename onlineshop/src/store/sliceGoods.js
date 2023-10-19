import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {loadingState} from "../const/const";


const goodsSlice = createSlice({
    name: 'goods',
    initialState: {
        goods: [],
        status: null,
    },

    fetchStart(state, action) {
        state.status = loadingState.loading
    },
    fetchSuccess(state, action) {
        if (state.status === loadingState.loading) {
            state.status = loadingState.complete
            state.goods = action.payload
        }
    },
    fetchFail(state, action) {
        state.status = loadingState.reject
    }

})

 const {fetchStart, fetchSuccess, fetchFail} = goodsSlice.actions

export const fetchGoods = () => async (dispatch) => {
    try {
        dispatch(fetchStart())
        const response = await axios.get('http://localhost:4002/goods')
        console.log(response)
        dispatch(fetchSuccess(response.data))
    } catch (error) {
        dispatch(fetchFail(error))
    }

}

export default goodsSlice.reducer;