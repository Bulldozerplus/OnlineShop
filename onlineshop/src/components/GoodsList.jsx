import React, {useState} from 'react';
import {Table, Select} from "antd";
import {useSelector} from "react-redux";
import SpinLoading from "./SpinLoading";
import {columnsTableData, loadingState, paginationSelectValue} from "../const/const";


const GoodsList = () => {
    const [valuePagination, setValuePagination] = useState(paginationSelectValue.middle)

    function handleChange(value) {
        setValuePagination(value)
    }


    const goodsPrepareData = useSelector(state => state.goods.goods)
    console.log(goodsPrepareData)
    const goodsStates = useSelector(state => state.goods)

    const goodsData = goodsPrepareData.map(goods => ({...goods, key: goods.id})).map(goods => {
        if (goods.hasDiscount) {
            const numberInPercent = goods.discountPercent / 100
            const sumDiscount = goods.price * numberInPercent
            const discountPrice = goods.price - sumDiscount
            const roundingPrice = discountPrice.toFixed()
            return {...goods, priceWithDiscount: roundingPrice}
        }
        return {...goods, discountPercent: 'N/A', priceWithDiscount: 'N/A'}
    })
    console.log(goodsStates)





    if (goodsStates.error) {
        return <div>error</div>
    }

    if (goodsStates.status === loadingState.loading) {
        return <SpinLoading/>
    }

    return (
        <><Table
            dataSource={goodsData}
            columns={columnsTableData}
            pagination={{
                pageSize: valuePagination
            }}
        />
            <Select
                defaultValue="5"
                style={{
                    width: 120,
                }}
                onChange={handleChange}
                options={[
                    {
                        value: paginationSelectValue.large,
                        label: '10',
                    },
                    {
                        value: paginationSelectValue.little,
                        label: '3',
                    }
                ]}
            />
        </>
    );
};

export default GoodsList;