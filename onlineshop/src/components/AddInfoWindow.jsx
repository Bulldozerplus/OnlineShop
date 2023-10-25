import React from 'react';
import {modalLoadingStateData} from "../const/constLoadingStates";
import {Card, Image, Space, Spin} from "antd";
import SpinLoading from "./SpinLoading";

const AddInfoWindow = (props) => {
    if (props.state === modalLoadingStateData.loading) {
        return <SpinLoading/>
    }

    if (props.state === modalLoadingStateData.reject) {
        return <div>ERROR</div>
    }

    if (props.state === modalLoadingStateData.complete)
        return (
            <div>
                <Card title={props.data.name} style={{width: 400}}>
                    <Image src={props.data.imgSource}/>
                    <h2>Price: {props.data.price} {props.data.currency}</h2>
                    {props.data.hasDiscount
                    ? <h3>Discount: {props.data.discountPercent} %</h3>
                    : <h3>Discount: 0</h3>
                }
                    <h4> Cashback: {props.data.cashbackPercent} %</h4>
                    <h3>Category: {props.data.category}</h3>
                    <p>{props.data.description}</p>
                    {props.data.hasFreeDelivery
                        ? <p>Delivery: FREE</p>
                        : <p>Delivery: Paid</p>
                    }
                    <h3>Colors:</h3><p className='colors__phones'>[{props.data.colors.map(color => (

                    <p className='colors__phones__color'>{color},</p>
                ))}]</p>
                    <p>Producing country: {props.data.country}</p>
                    <h4>Guarantee: {props.data.guarantee.period} {props.data.guarantee.unit} </h4>
                    <h2>Reviews:</h2><p className='reviews'>{props.data.reviews.map(fields => (
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