import {Image} from "antd";
import React from "react";

export const paginationSelectValue = {
    little: '3',
    middle: '5',
    large: '10'
}

export const loadingState = {
    loading: 'pending',
    complete: 'complete',
    reject: 'reject'
}

export const columnsTableData = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        filters: [
            {
                text: 'phones',
                value: 'phones',
            },
            {
                text: 'TV',
                value: 'TV',
            },
            {
                text: 'kitchen',
                value: 'kitchen',
            },
            {
                text: 'computers',
                value: 'computers',
            },

        ],
        onFilter: (value, record) => record.category.indexOf(value) === 0,

    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'DiscountPercent',
        dataIndex: 'discountPercent',
        key: 'discountPercent',
    },
    {
        title: 'Price with Discount',
        dataIndex: 'priceWithDiscount',
        key: 'priceWithDiscount',
    },
    {
        title: 'Currency',
        dataIndex: 'currency',
        key: 'currency',
    },
    {
        title: 'Cashback percent',
        dataIndex: 'cashbackPercent',
        key: 'cashbackPercent',
    },
    {
        title: 'Image',
        dataIndex: 'imgSource',
        key: 'imgSource',
        render: (image) => <Image src={image} alt={'Picture the goods'}/>
    }

]