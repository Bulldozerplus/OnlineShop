import React, {useState} from 'react';
import {Table, Image, Select} from "antd";
import {useSelector} from "react-redux";
import SpinLoading from "./SpinLoading";
import {paginationSelectValue} from "../const/const";


const GoodsList = () => {
    const [valuePagination, setValuePagination] = useState(paginationSelectValue.middle)

    function handleChange(value) {
        setValuePagination(value)
    }

    const goodsPrepareData = useSelector(state => state.goods.goods)
    const goodsData = goodsPrepareData.map(goods => ({...goods, key: goods.id}))
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'DiscountPercent',
            dataIndex: 'discountPercent',
            key: 'discountPercent',
        },
        {
            title: 'Image',
            dataIndex: 'imgSource',
            key: 'imgSource',
            render: (image) => <Image src={image} alt={'Picture the goods'}/>
        }
    ]

    return (
        goodsData.length === 0
            ? <SpinLoading/>
            : <><Table
                dataSource={goodsData}
                columns={columns}
                pagination={{
                    pageSize : valuePagination
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