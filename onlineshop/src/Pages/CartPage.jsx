import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addGoodsInTheCart} from '../store/SliceGoodsInTheCart'
import {Col, Image, Row, Select, Table} from "antd";
import {paginationSelectValue} from "../const/constPagination";

const CartPage = () => {
    const [valuePagination, setValuePagination] = useState(paginationSelectValue.middle)

    const goodsInTheCart = useSelector(state => state.goodsInTheCart.goodsInTheCart)

    function handleChange(value) {
        setValuePagination(value)
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
    ]


    return (
        <div className='cart__page'>
            <div className='cart__page__wrapper'>
                <Row>
                    <Col xs={24} md={{span: 12, offset: 6}} >
                <Table
                    className='table'
                    dataSource={goodsInTheCart}
                    columns={columnsTableData}
                    size="middle"
                    pagination={{
                        pageSize: valuePagination
                    }}
                />
                    </Col>
                        </Row>
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
    );
};

export default CartPage;