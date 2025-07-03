import React, { useState, useEffect, useRef, useMemo, useCallback, useContext, Suspense } from "react";
import { Link } from 'react-router-dom'
import { useHistory,useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import './cart.css';
import CountComp from './count';
// import SimProduct from './sim-product';
import {updateCart, removeCart, clearCart, similarProductList} from '../../redux/action/cartAction';
import {projectContext} from '../../redux/project-context';


const SimProduct = React.lazy(() => import('./sim-product'));

export default function CartPage() {
    const history = useHistory();
    const [count, setCount] = useState(0);
    const calculation = useMemo(() => CountComp(count));
    const projectType = useContext(projectContext);
    // let pId = useParams();
    const isLoading = useSelector((state) => state.cartReducer.showLoading)
    // const [productCart, setProductCart] = useState({});
    const dispatch = useDispatch();
    const simInpuText = useRef();
    const cartItmes = useSelector((state) => {
        return state.cartReducer.cartItems;
    })

    const similarProducts = useSelector((state) => {
        // console.log(state.cartReducer.similarProduct, 'sim')
        return state.cartReducer.similarProduct;
    })

    useEffect(() => {
        handleSimilarProductList();
    },[])

    const handleSimProd = () => {
        // simInpuText.current.focus();
        setCount((count) => count + 1);
        // console.log(count, 'count')
    }


    /* useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('/data.json');
                const productList = response.data.data.product;
                let product = productList.find((item) => {
                    let itemId = item.id.toString();
                    let currId = pId.pId.toString();
                    // console.log ('product', itemId, pId.pId)
                    return itemId === currId;
                })
                setProductCart(product);
            } catch (error) {
                console.error(error);
            }
        }
        getProducts();
    }, []); */

    const removeProduct = (indx) => {
        dispatch(removeCart(indx));
        // setProductCart({});
    }

    const productIncrement = (indx, qty) => {
        if(qty < 10){
            let data = {indx, qty : qty + 1};
            dispatch(updateCart(data));
        }
    }

    const productDecrement = (indx, qty) => {
        if(qty > 1){
            let data = {indx, qty : qty - 1};
            dispatch(updateCart(data));
        }
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleSimilarProductList = () => {
        dispatch(similarProductList());
    }

    const proceedCheckout = () => {
        // const cartItem = JSON.stringify(productCart);
        // localStorage.setItem('cartItem', cartItem);
        history.push('/payment');
    }

    const goToDetails = useCallback((pId) => {
        history.push(`/product-details/${pId}`);
    },[])

    return (
        <>
            <section className="p-5 mt-4 product-cart">
                <h1 className="display-5">Product Cart</h1>
                {
                    cartItmes.length > 0 ?
                    <div>
                        <div className="card table-responsive">
                            <table className="table">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Product Details</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col" className="text-end">Price</th>
                                        <th scope="col" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItmes.map((cartItem, k) => {
                                            return <tr key={k}>
                                                <th scope="row">
                                                    <img className="cart-img" src={cartItem.image} alt="" />
                                                </th>
                                                <td>
                                                    <p><strong>{cartItem.name}</strong></p>
                                                    <p>{cartItem.listingType}</p>
                                                    <p>{cartItem.grade}</p>
                                                </td>
                                                <td>
                                                    <div className="qty d-flex align-items-center">
                                                        <button onClick={() => productDecrement(k, cartItem.cartQty)} className="btn btn-light me-1">-</button>
                                                        <div className="form-control p-1 text-center pt-2" style={{width:'50px', height:'40px'}}>
                                                            {cartItem.cartQty}
                                                        </div>
                                                        <button onClick={() => productIncrement(k, cartItem.cartQty)} className="btn btn-light ms-1">+</button>
                                                    </div>
                                                </td>
                                                <td align="right">
                                                    <p className="price">{cartItem.price}</p>
                                                </td>
                                                <td align="center">
                                                    <button type="button" onClick={() => removeProduct(k)} className="btn btn-secondary">X</button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button onClick={handleClearCart} className="btn btn-secondary mt-3">Clear Cart</button>
                            <button onClick={() => proceedCheckout()} className="btn btn-primary mt-3">Proceed to Checkout</button>
                        </div>
                    </div> :
                    <div className="text-center">
                        <div className="alert alert-primary text-center mt-3" role="alert">No Products in the cart</div>
                        <Link to="/product-list">
                            <button type="button" className="btn btn-primary mt-3">Shop Now</button>
                        </Link>
                    </div>
                }                
            </section>

            <section className="p-5 mt-4 product-cart">
                <h2 className="display-5">Similar Product</h2>
                <div className=" col-6 mb-3">
                    <p>Count : {count}</p>
                    <p>MemoCount : {calculation}</p>
                    <p>Project : {projectType.ProjectName}</p>
                    {/* <input className="form-control mb-1" ref={simInpuText} /> */}
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleSimProd}
                    >
                        Force render
                    </button>
                </div>
                {
                    !!isLoading ? <div className="alert alert-light text-center mt-3" >
                        <div className="spinner-grow text-primary" style={{width: '3rem', height: '3rem'}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : null
                }
                
                {
                    !!similarProducts && similarProducts.length > 0 ?
                    <div className="row">
                        <Suspense fallback={<div>Loading...</div>}>
                            <SimProduct goToDetails={goToDetails} similarProducts={similarProducts} />
                        </Suspense>
                    </div>
                    : null
                }
            </section>
        </>
    )
}