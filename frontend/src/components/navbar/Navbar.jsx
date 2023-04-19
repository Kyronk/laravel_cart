import  React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";


import axios from "axios";
import { useNavigate } from "react-router";
// redux cart quantity
// import { useSelector } from "react-redux";

import "./Navbar.scss";

const Navbar = () => {

    // const quantity = useSelector((state) => state.cart.quantity);

    const [quantity, setQuantity] = useState(0);

    const navigate = useNavigate();

    useEffect (() => {
        getCart();
    }, [])


    const getCart = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/view-cart`);
            
            const cart = response.data.cart;
        
            const quantity = cart.length;
            // console.log(quantity);
            setQuantity(quantity);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="body">
                <header>
                    <NavLink href="/home" className="logo">
                        <i className="ri-home-heart-fill"></i>
                        <span>Logo</span>
                    </NavLink>


                    {/* <NavLink href="/home">
                        <i className="ri-home-heart-fill"></i>
                        <span>Logo</span>
                    </NavLink>

                    <i className="ri-home-heart-fill"></i> */}



                    <ul className="navbar">
                        <li>
                            <NavLink  to="/home">
                                <p>Home</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/product-list">
                                <p>Products</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Us">
                                <p>Us</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">
                                <p>About</p>
                            </NavLink>
                        </li>
                    </ul>

                    <div className="main">
                        <div className="user">
                            <NavLink to="/user-profile">
                                <i className="ri-user-fill"></i>
                            </NavLink>
                        </div>

                        <div className="user">
                            <NavLink to="/cart">
                                <div className="count-container">
                                    {
                                        quantity === 0 ? "" : <span className="count">{quantity}</span>
                                    }
                                    
                                <i className="fa-solid fa-cart-shopping"></i>
                                </div>
                            </NavLink>
                        </div>
                        
                        <div className="bx bx-menu" id="menu-icon"></div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Navbar;
