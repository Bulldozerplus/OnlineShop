import React, {useState} from 'react';
import {Button, Checkbox, Image, Modal, Select, Space, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import SpinLoading from "./SpinLoading";
import {goodsLoadingState} from "../const/constLoadingStates";
import {paginationSelectValue} from "../const/constPagination";
import AddInfoWindow from "./AddInfoWindow";
import Input from "antd/es/input/Input";
import {fetchGoodsById} from "../store/sliceGoodsById";
import MySelect from "./MySelect";
import {changeGoodsInTheCart} from "../store/SliceGoodsInTheCart";

const GoodsList = () => {
    const goodsDataFromStore = useSelector(state => state.goods.goods)
    const goodsStates = useSelector(state => state.goods.status)
    const goodsInTheCart = useSelector(state => state.goodsInTheCart.goodsInTheCart)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valuePagination, setValuePagination] = useState(paginationSelectValue.middle)
    const [filterBestOffers, setFilterBestOffers] = useState(false)
    const [inputFilterValue, setInputFilterValue] = useState('')
    const [filterByCategoryValue, setFilterByCategoryValue] = useState('All')

    const filterByBestOffers = (g) => {
        return filterBestOffers ? g.hasDiscount : true
    }

    const filterByInput = (g) => {
        if (g.name.toLowerCase().includes(inputFilterValue.toLowerCase())) {
            return true
        }
        return false
    }

    const filterByCategory = (g) => {
        if (filterByCategoryValue === 'All') {
            return true
        }

        if (filterByCategoryValue === g.category) {
            return true
        }
        return false
    }


    const goodsData = goodsDataFromStore.map(goods => {
        if (goods.hasDiscount) {
            const numberInPercent = goods.discountPercent / 100
            const sumDiscount = goods.price * numberInPercent
            const discountPrice = goods.price - sumDiscount
            const roundingPrice = discountPrice.toFixed()
            return {...goods, priceWithDiscount: roundingPrice, key: goods.id}
        }
        return {...goods, key: goods.id, discountPercent: 'N/A', priceWithDiscount: 'N/A'}
    }).filter(goods => {
        return filterByInput(goods) && filterByBestOffers(goods) && filterByCategory(goods)
    })

    function changeToggle() {
        if (filterBestOffers === false) {
            setFilterBestOffers(prevState => !prevState)
        } else {
            setFilterBestOffers(prevState => !prevState)
        }
    }

    const handleOk = () => {
        setIsModalOpen(false);

    };


    function handleChange(value) {
        setValuePagination(value)
    }


    function showModal(id, goods) {
        setIsModalOpen(true);
        dispatch(fetchGoodsById(id))
    }


    if (goodsStates === goodsLoadingState.reject) {
        return <div>error</div>
    }

    if (goodsStates === goodsLoadingState.loading) {
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
            title: 'Add info and buy',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record.id, record)} size="middle">
                        Add Info
                    </Button>
                    <Button onClick={() => pushCurrentGoodsInTheCart(record)}>
                        Add goods in the cart
                    </Button>
                    <Button onClick={() => deleteCurrentGoodsInTheCart(record)}>
                        Delete
                    </Button>
                </Space>

            ),
        },

    ]

    function pushCurrentGoodsInTheCart(goods) {
        dispatch(changeGoodsInTheCart({name: goods.name, count: 1}))
    }


    function deleteCurrentGoodsInTheCart(goods) {
        dispatch(changeGoodsInTheCart({name: goods.name, count: -1}))
    }



    return (
        <div className='main'>
            <div className='main__wrapper'>
                <div className='main__filterField'>
                    <div className='main__filterField__wrapper'>
                        <Checkbox className='main__filterField__wrapper__checkbox' onChange={changeToggle}>Best
                            offers</Checkbox>
                        <MySelect className='select__category' value={filterByCategoryValue}
                                  onChange={setFilterByCategoryValue} defaultValue='All' options={[
                            {
                                name: 'phones',
                                value: 'phones'
                            },
                            {
                                name: 'TV',
                                value: 'TV'
                            },
                            {
                                name: 'kitchen',
                                value: 'kitchen'
                            },
                            {
                                name: 'computers',
                                value: 'computers'
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
                       onOk={handleOk}>
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