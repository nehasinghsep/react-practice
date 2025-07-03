import React, { useState, useEffect } from "react";
import './product.css';
import axios from 'axios';
import Product from './product';
import UpcomingProduct from './upcoming-product';

export default function ProductPage(){
    const [productList, setProductList] = useState([]);
    const [uProductList, setUProductList] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
          const response = await axios.get('/data.json');
          const res = response.data.data;
          setProductList(res.product)
          setUProductList(res.upComProduct)
        //   console.log("res", res.product);
        } catch (error) {
          console.error(error);
        }
    }
    

    return(
        <div className="p-5 mt-4">
            <h1 className="display-5">Product List</h1>
            <div className="row">
                <div className="col-lg-12">
                    <div className="row product-list">
                        {
                            (!!productList.length) ?
                            productList.map((item, k) => {
                                return (
                                    <Product key={k} product={item} />
                                )
                            })
                            : <div className="alert alert-primary text-center" role="alert">No Products</div>
                        }
                    </div>
                </div>
            </div>

            <div className="customer-review">
                <h2 className="mt-5 h4 mb-2">Upcoming Product</h2>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row product-list">
                            {
                                (!!uProductList.length) ?
                                uProductList.map((item, k) => {
                                    return (
                                        <UpcomingProduct key={k} product={item} />
                                    )
                                })
                                : <div className="alert alert-primary text-center" role="alert">No Products</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

