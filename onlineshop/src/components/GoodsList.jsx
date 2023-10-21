import React, {useState} from 'react';
import {Table, Select, Image, Button, Modal} from "antd";
import {useSelector} from "react-redux";
import SpinLoading from "./SpinLoading";
import {loadingState, paginationSelectValue} from "../const/const";
import {getGoodsDataFromServer} from "../services/URL";


const GoodsList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [valuePagination, setValuePagination] = useState(paginationSelectValue.middle)

    function handleChange(value) {
        setValuePagination(value)
    }


    const goodsPreparedData = useSelector(state => state.goods.goods)
    const goodsStates = useSelector(state => state.goods)

    console.log(goodsPreparedData)

    const goodsData = goodsPreparedData.map(goods => ({...goods, key: goods.id})).map(goods => {
        if (goods.hasDiscount) {
            const numberInPercent = goods.discountPercent / 100
            const sumDiscount = goods.price * numberInPercent
            const discountPrice = goods.price - sumDiscount
            const roundingPrice = discountPrice.toFixed()
            return {...goods, priceWithDiscount: roundingPrice}
        }
        return {...goods, discountPercent: 'N/A', priceWithDiscount: 'N/A'}
    })


    const [addInfoData, setAddInfoData] = useState(null)

    async function showModal(id) {
        const getData = await getGoodsDataFromServer.getGoodsById(id)
        setAddInfoData(getData.data)
        setIsModalOpen(true);
    };

    if (goodsStates.status === loadingState.reject) {
        return <div>error</div>
    }

    if (goodsStates.status === loadingState.loading) {
        return <SpinLoading/>
    }


    const columnsTableData = [
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
            render: (image) => {
                return <Image src={image} alt={'Picture the goods'}/>
            },
        },
        {
            title: 'Add info',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => showModal(record.id)} size="middle">
                    Add Info
                </Button>
            ),
        },

    ]

    return (
        <><Table
            className='table'
            dataSource={goodsData}
            columns={columnsTableData}
            pagination={{
                pageSize: valuePagination
            }}
        />
            <Modal title="Additional info" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {addInfoData === null
                    ? <h3>Loading...</h3>
                    : <h3>{addInfoData.name}</h3>
                }

            </Modal>
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