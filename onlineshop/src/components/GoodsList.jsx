import React, {useState} from 'react';
import {Button, Checkbox, Image, Modal, Select, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import SpinLoading from "./SpinLoading";
import {goodsLoadingState} from "../const/constLoadingStates";
import {paginationSelectValue} from "../const/constPagination";
import AddInfoWindow from "./AddInfoWindow";
import Input from "antd/es/input/Input";
import {fetchGoodsById} from "../store/sliceGoodsById";

const GoodsList = () => {
    const goodsDataFromStore = useSelector(state => state.goods.goods)
    const goodsStates = useSelector(state => state.goods)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valuePagination, setValuePagination] = useState(paginationSelectValue.middle)
    const [filterBestOffers, setFilterBestOffers] = useState(false)
    const [inputFilterValue, setInputFilterValue] = useState('')
    const [filterByCategory, setFilterByCategory] = useState('')
    console.log(filterByCategory)

    const filterByBestOffers = (g) => {
        return filterBestOffers ? g.hasDiscount : true
    }

    const filterByInput = (g) => {
        if (g.name.toLowerCase().includes(inputFilterValue.toLowerCase())) {
            return g
        }
    }


    const goodsData = goodsDataFromStore.map(goods => {
        if (goods.hasDiscount) {
            const numberInPercent = goods.discountPercent / 100
            const sumDiscount = goods.price * numberInPercent
            const discountPrice = goods.price - sumDiscount
            const roundingPrice = discountPrice.toFixed()
            return {...goods, priceWithDiscount: roundingPrice, key: goods.id}
        }
        return {...goods,key: goods.id, discountPercent: 'N/A', priceWithDiscount: 'N/A'}
    }).filter(goods => {
        if (filterBestOffers && inputFilterValue.length > 0) {
            return filterByBestOffers(goods) && filterByInput(goods)
        }
        if (filterBestOffers) {
            return filterByBestOffers(goods)
        }
        if (inputFilterValue.length > 0) {
            return filterByInput(goods)
        }

        else return goods
    })

    function changeToggle() {
        if (filterBestOffers === false) {
            setFilterBestOffers(true)
        } else {
            setFilterBestOffers(false)
        }
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    function handleChange(value) {
        setValuePagination(value)
    }


    function showModal(id) {
        setIsModalOpen(true);
        dispatch(fetchGoodsById(id))
    }


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


    return (
        <div className='main'>
            <div className='main__wrapper'>
                <div className='main__filterField'>
                    <div className='main__filterField__wrapper'>
                        <Checkbox className='main__filterField__wrapper__checkbox' onChange={changeToggle}>Best
                            offers</Checkbox>
                        <Select value={filterByCategory} onChange={e => setFilterByCategory(e.target.value)} className='select' defaultValue="All"
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
                        <Input className='main__filterField__wrapper__input' placeholder='Find a product'
                               value={inputFilterValue} onChange={e => setInputFilterValue(e.target.value)}/>
                    </div>
                </div>
                <Table
                    className='table'
                    dataSource={goodsData}
                    columns={columnsTableData}
                    pagination={{
                        pageSize: valuePagination
                    }}

                />
                <Modal title="Additional info"
                       open={isModalOpen}
                       onOk={handleOk}
                       onCancel={handleCancel}>
                    <AddInfoWindow/>
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