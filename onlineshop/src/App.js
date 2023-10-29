import './App.css';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchGoods} from "./store/sliceGoods";
import {Col, Row} from "antd";
import GoodsList from "./components/GoodsList";


function App() {

    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fetchGoods())
    },[])


    return (
        <div>
            <Row>
                <Col xs={24} md={{span: 12, offset: 6}} >
                    <GoodsList/>
                </Col>
            </Row>
        </div>
    );
}

export default App;
