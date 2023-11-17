import React from 'react';
import {Link, Outlet} from "react-router-dom";


const NavigateMenu = () => {

    return (
        <div>
            <header className='navigate'>
                <Link className='navigate__link' to='/'>Goods</Link>
                <Link className='navigate__link' to='/cart'>Cart</Link>
                <Link className='navigate__link' to='/payment'>Payment</Link>
                <Link className='navigate__link' to='/authorization'>Authorization</Link>
            </header>
            <Outlet/>
        </div>
    );
};

export default NavigateMenu;