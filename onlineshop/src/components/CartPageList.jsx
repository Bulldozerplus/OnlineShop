import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button, Card, Image, Select} from "antd";
import {paginationSelectValue} from "../const/constPagination";

const CartPageList = () => {
    const [valuePagination, setValuePagination] = useState(paginationSelectValue.middle)

    const goodsInTheCart = useSelector(state => state.goodsInTheCart.goodsInTheCart)

    const goodsCartListFromUser = goodsInTheCart.map(g => {
        return {...g, count: 0 }
    }).forEach(g => {
        if (g.id )
    })

    const goods = []



    function handleChange(value) {
        setValuePagination(value)
    }


    return (
        <div className='cart__page'>
            <div className='cart__page__wrapper'>
                {goodsCartListFromUser.length === 0
                    ? <div>Cart is empty</div>
                    : goodsCartListFromUser.map(goods => (


                    ))
                }
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

export default CartPageList;