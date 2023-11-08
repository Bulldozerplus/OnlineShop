import React from 'react';
import {Col, Row} from "antd";
import GoodsList from "../components/GoodsList";

const MainMenuPage = () => {
    return (
        <div>
            <Row>
                <Col xs={24} md={{span: 12, offset: 6}} >
                    <GoodsList/>
                </Col>
            </Row>
            
        </div>
    );
};

export default MainMenuPage;