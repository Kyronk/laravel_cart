import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import './Product.list.scss';

const ProductList = () => {
    const [productList, setProductList] = useState("");

    const getProductList = async () => {
        // const paramString = queryString.stringify(filter);
        // console.log(paramString);
        // const response = await axios.get('http://localhost:5000/users');
        // const response = await axios.get('http://localhost:5000/users?page=2&limit=6');
        const response = await axios.get(
            `http://localhost:8000/api/product-list`
        );

        // console.log(response);
        const product = response.data.products;
        // const { product, pagination } = response.data;
        // console.log("list", product);
        // const { totalPage } = pagination;
        // console.log(typeof totalPage)
        // console.log(typeof data);
        // console.log(users);
        if (response.status === 200) {
            setProductList(product);
            // console.log("ProductList", productList);
            // setPagination(pagination);
            // setPageCount(totalPage);
        }
    };

    useEffect(() => {
        getProductList();
    }, []);



    return (
        <>
            <div className="product-list_container">
                <h2 className="product-list_title">Featured Products</h2>
                <div className="product-list_row row-2">
                    <h2>All Products</h2>
                    <select className="" id="">
                        <option value="">Default Shorting</option>
                        <option value="">Short by price</option>
                        <option value="">Short by popularity</option>
                        <option value="">Short by rating</option>
                        <option value="">Short by sale</option>
                    </select>
                </div>

                <div className="product-list_row">
                    
                        {productList &&
                            productList.map((item, index) => {
                                return (
                                    <div className="product-list_col-4" key={item.id}>
                                        <Link to={`item/${item.id}`}>
                                            <img src={item.photo} alt="" />
                                        </Link>
                                        <h4 className="product_list-h4">{item.name_product}</h4>
                                        <p>$ {item.price}</p>
                                    </div>
                                );
                            })}
                    
                </div>
            </div>
        </>
    )
}

export default ProductList;