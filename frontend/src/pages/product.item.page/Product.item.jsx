import React, { useState, useEffect } from "react";
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import ProductItem from "../../components/product/Product.item";

const ProductItemPage = () => {
    return (
        <>
            <Navbar />
            <ProductItem />
            <Footer />
        </>
    )
}

export default ProductItemPage;