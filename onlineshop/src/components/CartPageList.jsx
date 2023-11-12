import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card} from "antd";
import {changeGoodsInTheCart} from "../store/SliceGoodsInTheCart";

const CartPageList = () => {
        const dispatch = useDispatch()
        const goodsInTheCart = useSelector(state => state.goodsInTheCart.goodsInTheCart)
        const goodsFromServer = useSelector(state => state.goods.goods)
        const goodsInTheCartArrayFromRender = Object.entries(goodsInTheCart)


        const goodsDataList = goodsFromServer.map(goods => {
            if (goods.hasDiscount) {
                const numberInPercent = goods.discountPercent / 100
                const sumDiscount = goods.price * numberInPercent
                const discountPrice = goods.price - sumDiscount
                const roundingPrice = discountPrice.toFixed()
                return {...goods, priceWithDiscount: parseInt(roundingPrice), key: goods.id}
            }
            return {...goods, key: goods.id}
        })

        console.log(goodsDataList)


        function pushCurrentGoodsInTheCart(nameGoods) {
            dispatch(changeGoodsInTheCart({name: nameGoods, count: 1}))
        }


        function deleteCurrentGoodsInTheCart(nameGoods) {
            dispatch(changeGoodsInTheCart({name: nameGoods, count: -1}))
        }

        const currentPrice = (nameGoods, goodsList) => {
            const currentGoods = goodsList.filter(goods => goods.name === nameGoods)
            const [currentPrice] = currentGoods
            console.log(currentPrice)
            return currentPrice.price
        }

        const preliminaryPrice = {}
        const overallBenefit = {}
        const countTotalPriceAndBenefits = (cartListArr, goodList) => {
            cartListArr.forEach(([nameGoods, count]) => {
                const filteredGoods = goodList.find(currentGoodsData => currentGoodsData.name === nameGoods)
                if (!preliminaryPrice[nameGoods] && filteredGoods.priceWithDiscount) {
                    preliminaryPrice[nameGoods] = filteredGoods.priceWithDiscount * count
                } else {
                    preliminaryPrice[nameGoods] = filteredGoods.price * count
                }

                if (!overallBenefit[nameGoods] && filteredGoods.priceWithDiscount) {
                    overallBenefit[nameGoods] = filteredGoods.price - filteredGoods.priceWithDiscount
                }
                if (overallBenefit[nameGoods] && filteredGoods.priceWithDiscount) {
                    overallBenefit[nameGoods] += (filteredGoods.price - filteredGoods.priceWithDiscount) * count
                }
            })
        }

        console.log(overallBenefit)
        countTotalPriceAndBenefits(goodsInTheCartArrayFromRender, goodsDataList)

        const priceDataToArr = Object.values(preliminaryPrice)
        const totalPrice = priceDataToArr.reduce((prev, current) => prev + current, 0)

        const overallBenefitFromRender = Object.values(overallBenefit).reduce((prev, current) => prev + current, 0)
        console.log(overallBenefitFromRender)


        return (
            <div className='cart__page'>
                <div className='cart__page__wrapper'>
                    {goodsInTheCartArrayFromRender.length === 0
                        ? <div>Cart is empty</div>
                        : goodsInTheCartArrayFromRender.map(([nameGoods, count]) => (
                            <Card title={nameGoods} bordered={true}>
                                <h4>Quantity of goods in the cart - {count}</h4>
                                <h3> price from 1 product = {currentPrice(nameGoods, goodsFromServer)}</h3>
                                <h3> total price = {count * currentPrice(nameGoods, goodsFromServer)}</h3>
                                <div className='button__wrap'>
                                    <Button className='button' onClick={() => pushCurrentGoodsInTheCart(nameGoods)}>Add
                                        goods</Button>
                                    <Button onClick={() => deleteCurrentGoodsInTheCart(nameGoods)}>Delete
                                        goods</Button>
                                </div>
                            </Card>
                        ))
                    }
                    <h2>Total price - {totalPrice}</h2>
                    <h3>Total discount - {overallBenefitFromRender}</h3>
                </div>
            </div>
        );
    }
;

export default CartPageList;