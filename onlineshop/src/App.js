import './App.css';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchGoods} from "./store/sliceGoods";
import {Route, Routes} from "react-router-dom";
import NavigateMenu from "./components/NavigateMenu";
import MainMenuPage from "./Pages/MainMenuPage";
import Authorization from "./Pages/Authorization";
import Payment from "./Pages/Payment";
import CartPage from "./Pages/CartPage";


function App() {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchGoods())
    }, [])


    return (
        <>
            <Routes>
                <Route path="/" element={<NavigateMenu/>}>
                    <Route index element={<MainMenuPage/>}/>
                    <Route path='/cart' element={<CartPage/>}/>
                    <Route path='/payment' element={<Payment/>}/>
                    <Route path='/authorization' element={<Authorization/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
