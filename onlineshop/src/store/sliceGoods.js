import {createSlice} from "@reduxjs/toolkit";
import {goodsLoadingState} from "../const/constLoadingStates";
import {APIservice} from "../services/URL";


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
                state.goods = action.payload.map(goods => {
                    if (goods.hasDiscount) {
                        const numberInPercent = goods.discountPercent / 100
                        const sumDiscount = goods.price * numberInPercent
                        const discountPrice = goods.price - sumDiscount
                        const roundingPrice = parseInt(discountPrice.toFixed())
                        const priceDifferenceWithoutDiscount = goods.price - roundingPrice
                        return {
                            ...goods,
                            priceWithDiscount: roundingPrice,
                            differencePrice: priceDifferenceWithoutDiscount,
                            key: goods.id
                        }
                    }
                    return {...goods, key: goods.id, discountPercent: 0, priceWithDiscount: 'N/A'}
                })
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
        const response = await APIservice.getAllGoods()
        dispatch(fetchSuccess(response.data))

    } catch (error) {
        dispatch(fetchFail(error))
    }

}

export default goodsSlice.reducer;