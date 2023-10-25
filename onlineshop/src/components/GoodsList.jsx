import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Image, Modal, Select, Table} from "antd";
import {useSelector} from "react-redux";
import SpinLoading from "./SpinLoading";
import {goodsLoadingState, modalLoadingStateData} from "../const/constLoadingStates";
import {getGoodsDataFromServer} from "../services/URL";
import {paginationSelectValue} from "../const/constPagination";
import AddInfoWindow from "./AddInfoWindow";
import Input from "antd/es/input/Input";

const GoodsList = () => {
    const goodsPreparedData = useSelector(state => state.goods.goods)
    const goodsStates = useSelector(state => state.goods)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addInfoData, setAddInfoData] = useState(null)
    const [modalStatusLoadingData, setModalStatusLoadingData] = useState('')
    const [checkboxFilterPriceWithDiscount, setCheckboxFilterPriceWithDiscount] = useState(false)
    const [newData, setNewData] = useState(null)

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

    useEffect(() => {
        setNewData([...goodsData])
    },[])

    console.log(newData)



    async function showModal(id) {
        try {
            setModalStatusLoadingData(modalLoadingStateData.loading)

            const getModalDataGoods = await getGoodsDataFromServer.getGoodsById(id)

            setAddInfoData(getModalDataGoods.data)
            console.log(getModalDataGoods.data)
            setModalStatusLoadingData(modalLoadingStateData.complete)
            setIsModalOpen(true);
        } catch (error) {
            setModalStatusLoadingData(modalLoadingStateData.reject)
        }

    };

    if (goodsStates.status === goodsLoadingState.reject) {
        return <div>error</div>
    }

    if (goodsStates.status === goodsLoadingState.loading) {
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
            filters: [
                {
                    text: 'Best offers',
                    value: 'N/A',
                },
            ],
            onFilter: (value, record) => record.priceWithDiscount.indexOf(value) === -1,
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

    function findBestOffers() {
        setNewData(prev => prev.filter(goods => goods.hasDiscount === true))
    }

    function toggleCheckbox() {
        if (checkboxFilterPriceWithDiscount === false) {
            setCheckboxFilterPriceWithDiscount(true)
            findBestOffers()
        }
        else{
            setCheckboxFilterPriceWithDiscount(false)
            setNewData([...goodsData])
        }
    }



    return (
        <div className='main'>
            <div className='main__wrapper'>
            <div className='main__filterField'>
                <div className='main__filterField__wrapper'>
                    <Checkbox className='main__filterField__wrapper__checkbox' onChange={toggleCheckbox}>Best offers</Checkbox>
                    <Select className='select' defaultValue="All"
                             style={{
                                 width: 120,
                             }}
                             onChange={handleChange}
                             options={[
                                 {
                                     text: 'All',
                                     value: 'All',
                                 },
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
                             ]}/>
                    <Input className='main__filterField__wrapper__input' placeholder='Find a product'/>
                    <Button>Find</Button>
                </div>
            </div>
            <Table
                className='table'
                dataSource={newData}
                columns={columnsTableData}
                pagination={{
                    pageSize: valuePagination
                }}

            />
            <Modal title="Additional info"
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}>

                <AddInfoWindow data={addInfoData}
                               state={modalStatusLoadingData}/>
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
                        value: paginationSelectValue.middle,
                        label: '5',
                    },
                    {
                        value: paginationSelectValue.little,
                        label: '3',
                    }
                ]}
            />
        </div>
        </div>
    )
        ;
};

export default GoodsList;