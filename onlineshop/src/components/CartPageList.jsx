import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card} from "antd";
import {changeGoodsInTheCart} from "../store/SliceGoodsInTheCart";
import {Link} from "react-router-dom";

const CartPageList = () => {
        const dispatch = useDispatch()
        const shoppingCardGoodsData = useSelector(state => state.shoppingCart.shoppingCart)


        const shoppingCardGoodsDataInArray = Object.entries(shoppingCardGoodsData).map(el => el[1]).filter(goods => goods.count > 0)
        const totalSum = shoppingCardGoodsDataInArray.reduce((prev, current) => {
            return prev + (current.price * current.count)
        }, 0)


        const cashback = shoppingCardGoodsDataInArray.map(goods => {
            if (goods.cashbackPercent !== 0) {
                const numberInPercent = goods.cashbackPercent / 100
                const sumDiscountCashback = goods.price * numberInPercent
                console.log(sumDiscountCashback)
                return {
                    ...goods,
                    key: goods.id,
                    cashback: sumDiscountCashback
                }
            }
            console.log(goods, 'without')
            return {
                ...goods,
                cashback: 0
            }
        })

        const totalCashback = cashback.reduce((prev, current) => {
            if (current.cashback !== 0) {
                return Math.round(prev + (current.cashback * current.count))
            } else {
                return Math.round(prev + current.cashback)
            }
        }, 0)


        const totalDiscount = shoppingCardGoodsDataInArray.reduce((prev, current) => {
            if (current.differencePrice) {
                return prev + (current.differencePrice * current.count)
            } else {
                 return prev + 0
            }
        }, 0)

        function pushCurrentGoodsInTheCart(goods) {
            dispatch(changeGoodsInTheCart({...goods, count: +1}))
        }


        function deleteCurrentGoodsInTheCart(goods) {
            dispatch(changeGoodsInTheCart({...goods, count: -1}))
        }

        return (
            <div className='cart__page'>
                <div className='cart__page__wrapper'>
                    {shoppingCardGoodsDataInArray.length === 0
                        ? <h2>Cart is empty - <Link className='cart__link' to='/'>welcome to shopping</Link></h2>
                        : shoppingCardGoodsDataInArray.map(currentGoodsData => (
                            <Card className='card__cart__goods' title={currentGoodsData.name}>
                                <h3>{currentGoodsData.price}</h3>
                                <h4>{currentGoodsData.count}</h4>
                                <Button onClick={() => pushCurrentGoodsInTheCart(currentGoodsData)}>Add goods</Button>
                                <Button onClick={() => deleteCurrentGoodsInTheCart(currentGoodsData)}>Delete goods</Button>
                            </Card>
                        ))
                    }
                    <Card className='card__cart__total'>
                    <h2>Total SUM - {totalSum}</h2>
                    <h2>Total ECONOMY - {totalDiscount}</h2>
                    <h2>Your total CASHBACK - {totalCashback}</h2>
                    </Card>
                </div>
            </div>
        );
    }
;

export default CartPageList;