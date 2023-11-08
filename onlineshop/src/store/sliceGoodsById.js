import {createSlice} from "@reduxjs/toolkit";
import {modalLoadingStateData} from "../const/constLoadingStates";
import {APIservice} from "../services/URL";



const goodsByIdSlice = createSlice({
    name: 'goodsById',
    initialState: {
        currentGoods: {},
        status: null,
    },
    reducers: {
        fetchStart(state) {
            state.status = modalLoadingStateData.loading
        },
        fetchSuccess(state, action) {
            if (state.status === modalLoadingStateData.loading) {
                state.status = modalLoadingStateData.complete
                state.currentGoods = action.payload
            }
        },
        fetchFail(state) {
            state.status = modalLoadingStateData.reject
        }
    }
})

const {fetchStart, fetchSuccess, fetchFail} = goodsByIdSlice.actions

export const fetchGoodsById = (id) => async (dispatch) => {
    try {
        dispatch(fetchStart())
        const getModalDataGoods = await APIservice.getGoodsById(id)
        dispatch(fetchSuccess(getModalDataGoods.data))

    } catch (error) {
        dispatch(fetchFail(error))
    }

}

export default goodsByIdSlice.reducer;