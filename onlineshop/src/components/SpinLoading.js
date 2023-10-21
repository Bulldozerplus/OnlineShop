import React from 'react';
import { Spin } from 'antd';
import {LoadingOutlined} from "@ant-design/icons";



const SpinLoading = () => {

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 150,
            }}
            spin
        />
    );

    return (
        <div className='spin__box'>
        <Spin className='spin' indicator={antIcon}/>
            <h2 className='spin__text'>Loading data...Please wait.</h2>
        </div> );
};

export default SpinLoading;