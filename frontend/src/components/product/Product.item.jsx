import "./Product.item.scss";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link} from "react-router-dom";


const ProductItem = () => {

    const [product, setProduct] = useState({})
    const {id} = useParams();

    const [product_id, setProduct_id] = useState('');
    const [product_name, setProduct_name] = useState('');
    const [product_photo, setProduct_photo] = useState('');
    const [product_price, setProduct_price] = useState('');
    const [count, setCount] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getItem();
    }, [])
    
    const getItem = async () => {
        // const response = await axios.get(`http://localhost:5012/api/user/product-item/${id}`);
        const response = await axios.get(`http://localhost:8000/api/product/${id}/show`);

        const getProductItem = response.data.product;
        
        const Product_id = getProductItem.id;
        setProduct_id(Product_id);
        // console.log(Product_id);
        const name = getProductItem.name_product;
        setProduct_name(name);

        const photo = getProductItem.photo;
        setProduct_photo(photo);
        
        const price = getProductItem.price;
        setProduct_price(price);

        console.log(getProductItem)
        setProduct(getProductItem);
        
    
    }

    const handleAddToCart = async () => {
        //console.log(id)
        try {
            const response = await axios.post(`http://localhost:8000/api/add-to-cart`, {
                // product_id: product.id,
                // product_name: product.name,
                // product_photo: product.photo,
                // product_price: product.price,
                // count: 1,
                // total: 1200
                product_id,
                product_name,
                product_photo,
                product_price,
                count,
                total
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleQuantity = (type) => {
        
        if(type === 'inc') {
            setCount(count + 1);
            
            console.log(count);
            // setProduct_price(total);
        }else {
            // if (quantity === 1) return; // cach 1 
            count > 1 && setCount(count - 1);
        }
    }


    return (
        <>
            <div className="item-page_container simple-product">
            <div className="item-page_row">
                <div className="item-page_col-2">
                    <img src={product.photo} width="100%" alt="" id="productImg"/>
                </div>
    
    
                <div className="item-page_col-2">
                    {/* <p>Home / T-shirt</p> */}

                    <h1>{product.name_product}</h1>
                    <h4>$ {product.price} dove</h4>

                        <i 
                            style={{cursor: "pointer"}}
                            className="fa-solid fa-minus"
                            onClick={() => handleQuantity('dec')}
                        ></i>

                        <span className="product_quantity">{count}</span>

                        <i 
                        style={{cursor: "pointer"}}
                        className="fa-solid fa-plus"
                        onClick={() => handleQuantity('inc')}
                        ></i>

                    <Link to="" >
                        <button 
                            className="btn" 
                            onClick={() => handleAddToCart()}
                            >
                            Add to cart
                            <i className="fa-solid fa-cart-shopping" style={{color: "white"}}></i>
                        </button>

                    </Link>
                    <h3>Product Details <i className="fa-solid fa-indent"></i></h3>
                    <br/>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    </>
    );
};

export default ProductItem;