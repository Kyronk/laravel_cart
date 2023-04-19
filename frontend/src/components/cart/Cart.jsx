import "./Cart.scss";
import React, { useState, useEffect } from "react";


import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Cart = () => {

    const [cart, setCart] = useState();
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    useEffect (() => {
        getCart();
    }, [])


    const getCart = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/view-cart`);
            // console.log(response);
            const total = response.data.total;
            const cart = response.data.cart;
            // console.log(cart.length);
            setCart(cart);
            setTotal(total);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteItem = async (id) => {
        // console.log(id);
        if (
            window.confirm(
                "are you sure that you wanted to delete that user record"
            )
        ) {
            const response = await axios.delete(
                `http://localhost:8000/api/cart/${id}/delete`
            );
            if (response.status === 200) {
                
            }
            getCart();
        }
    };






    // const list = useSelector((state) => state.cart.products);
    // const quantityInCart = useSelector((state) => state.cart.quantity);
    // const totalCart = useSelector((state) => state.cart.total);
    // console.log("list", totalCart);

    // const [products, setProducts] = useState([]);
    // const [quantity, setQuantity] = useState(0);
    // const [total, setTotal] = useState(0);
    // const isAccept = false;

    // const list = cart.products;
    // console.log(list);

    // setProducts(cart.products);
    // console.log("product", products);



    // const listCart = cart.products;
    
    const handleQuantityUpdate = (id, item, type) => {
        console.log(id);
        console.log(item);
        

        const oldCount = item.count;
        console.log('cont in item', oldCount);
        setCount(oldCount);
        console.log('count in state react', count);

        if(type === 'inc') {
            setCount(count + 1);
            console.log('count after update',count);
            // setProduct_price(total);
        }else {
            // if (quantity === 1) return; // cach 1 
            count > 1 && setCount(count - 1);
        }
    }


    return ( 
        <>
            <div className="wrapper">
                <h1>Shopping Cart</h1>
                <div className="project">
                    <div className="shop">
                        {cart &&  
                            cart.map((item, index) => (
                                <div className="box" key={index}> 
                                    <img src={item.product_photo} alt="" />
                                    <div className="content">
                                        <h3>{item.product_name}</h3>
                                        <h4>Price of item: ${item.product_price}</h4>
                                        <h4>Quantity:</h4>
                                        <i 

                                            style={{cursor: "pointer"}}
                                            className="fa-solid fa-minus"
                                            onClick={() => handleQuantityUpdate(item.id, item, 'dec')}
                                        ></i>

                                        
                                        <span className="product_quantity">{item.count}</span>

                                        <i 
                                            style={{cursor: "pointer"}}
                                            className="fa-solid fa-plus"
                                            onClick={() => handleQuantityUpdate( item.id, item, 'inc')}
                                        ></i>

                                        <h4 style={{marginTop: "19px"}}>Price all item: ${item.total}</h4>
                                    <button
                                        onClick={() =>
                                            handleDeleteItem(item.id)}
                                    >
                                        <p className="btn-area">
                                            <i
                                                aria-hidden="true"
                                                className="fa fa-trash"
                                                ></i>{" "}
                                            <span className="btn2">Remove</span>
                                        </p>
                                    </button>
                                    

                                    </div>
                                </div>
                            ))}

                    </div>
                    <div className="right-bar">
                        <p>
                            <span>Subtotal</span> <span>$ {total}</span>
                        </p>
                        <hr />
                        <p>
                            {/* <span>Tax (5%)</span> <span>$6</span> */}
                        </p>
                        <hr />
                        <p>
                            {/* <span>Shipping</span> <span>$15</span> */}
                        </p>
                        <hr />
                        <p>
                            {/* <span>All item</span> <span>{cart.quantity}</span> */}
                        </p>
                        <hr />
                        <p>
                            {/* <span>Total</span> <span>${cart.total}</span> */}
                        </p>
                        <button 
                            className="cart-btn-checkout"
                            // onClick={checkOut}
                            >
                            <i className="fa fa-shopping-cart"></i>Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
