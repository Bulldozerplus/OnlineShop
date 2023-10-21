import {createSlice} from "@reduxjs/toolkit";
import {loadingState} from "../const/const";
import {getGoodsDataFromServer} from "../services/URL";


const goodsSlice = createSlice({
    name: 'goods',
    initialState: {
        goods: [],
        status: null,
    },
        reducers: {
            fetchStart(state) {
                state.status = loadingState.loading
            },
            fetchSuccess(state, action) {
                if (state.status === loadingState.loading) {
                    state.status = loadingState.complete
                    state.goods = action.payload
                }
            },
            fetchFail(state) {
                state.status = loadingState.reject
            }
        }
})

 const {fetchStart, fetchSuccess, fetchFail} = goodsSlice.actions

export const fetchGoods = () => async (dispatch) => {
    try {
        dispatch(fetchStart())
        const response = await getGoodsDataFromServer.getAllGoods()
        dispatch(fetchSuccess(response.data))

    } catch (error) {
        dispatch(fetchFail(error))
    }

}

export default goodsSlice.reducer;