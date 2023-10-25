import {createSlice} from "@reduxjs/toolkit";
import {goodsLoadingState} from "../const/constLoadingStates";
import {getGoodsDataFromServer} from "../services/URL";


const goodsSlice = createSlice({
    name: 'goods',
    initialState: {
        goods: [],
        status: null,
    },
        reducers: {
            fetchStart(state) {
                state.status = goodsLoadingState.loading
            },
            fetchSuccess(state, action) {
                if (state.status === goodsLoadingState.loading) {
                    state.status = goodsLoadingState.complete
                    state.goods = action.payload

                }
            },
            fetchFail(state) {
                state.status = goodsLoadingState.reject
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