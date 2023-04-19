import React, { useState, useEffect } from "react";
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Cart from "../../components/cart/Cart";

const CartPage = () => {
    return (
        <>
            <Navbar />
            
            <Cart />
            <Footer />
        </>
    )
}

export default CartPage;