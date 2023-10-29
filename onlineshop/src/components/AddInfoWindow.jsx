import React from 'react';
import {modalLoadingStateData} from "../const/constLoadingStates";
import {Card, Image, Space, Spin} from "antd";
import SpinLoading from "./SpinLoading";
import {useSelector} from "react-redux";

const AddInfoWindow = () => {
    const goodsDataByIdFromStorage = useSelector(state => state.currentGoods.currentGoods)
    const goodsModalDataState = useSelector(state => state.currentGoods)


    if (goodsModalDataState.status === modalLoadingStateData.loading) {
        return <SpinLoading/>
    }

    if (goodsModalDataState.status === modalLoadingStateData.reject) {
        return <div>ERROR</div>
    }

    if (goodsModalDataState.status === modalLoadingStateData.complete)
        return (
            <div>
                <Card title={goodsDataByIdFromStorage.name} style={{width: 400}}>
                    <Image src={goodsDataByIdFromStorage.imgSource}/>
                    <h2>Price: {goodsDataByIdFromStorage.price} {goodsDataByIdFromStorage.currency}</h2>
                    {goodsDataByIdFromStorage.hasDiscount
                    ? <h3>Discount: {goodsDataByIdFromStorage.discountPercent} %</h3>
                    : <h3>Discount: 0</h3>
                }
                    <h4> Cashback: {goodsDataByIdFromStorage.cashbackPercent} %</h4>
                    <h3>Category: {goodsDataByIdFromStorage.category}</h3>
                    <p>{goodsDataByIdFromStorage.description}</p>
                    {goodsDataByIdFromStorage.hasFreeDelivery
                        ? <p>Delivery: FREE</p>
                        : <p>Delivery: Paid</p>
                    }
                    <h3>Colors:</h3><p className='colors__phones'>[{goodsDataByIdFromStorage.colors.map(color => (

                    <p className='colors__phones__color'>{color},</p>
                ))}]</p>
                    <p>Producing country: {goodsDataByIdFromStorage.country}</p>
                    <h4>Guarantee: {goodsDataByIdFromStorage.guarantee.period} {goodsDataByIdFromStorage.guarantee.unit} </h4>
                    <h2>Reviews:</h2><p className='reviews'>{goodsDataByIdFromStorage.reviews.map(fields => (
                        <>
                            <hr/>
                            <p className='reviews__name'>{fields.name}:</p>
                            <p>{fields.text}</p>
                            <p className='reviews__rate'>Rate: {fields.rate}</p>
                            <p className='reviews__data'>{fields.sentTimeStamp}</p>
                            <hr/>
                        </>
                    ))}</p>


                </Card>
            </div>
        );
};

export default AddInfoWindow;