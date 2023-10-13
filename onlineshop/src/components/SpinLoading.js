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
        <Spin indicator={antIcon} tip="Loading data..."/>
            );
};

export default SpinLoading;