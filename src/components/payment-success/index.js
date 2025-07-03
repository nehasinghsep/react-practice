import React, {useEffect, useState} from "react";

export default function PaymentSuccess() {
    const [orderData, setOrderData] = useState({});
    const [paymentData, setPaymentData] = useState({});

    useEffect(() => {
        let cartObj = localStorage.getItem('cartItem');
        let cartData = JSON.parse(cartObj || '{}') ;
        if(cartData.name){
            setOrderData(cartData);
        }

        let paymentObj = localStorage.getItem('paymentDetails');
        let payData = JSON.parse(paymentObj || '{}') ;
        if(payData.id){
            setPaymentData(payData);
        }
    },[])

    return (
        <>
            <section className="payment-success" style={{marginTop:'100px'}}>
                <h1 className="display-6 text-success">Your order has been placed successfully</h1>

                <h5 className="h5 mt-5 mb-3">Payment Details</h5>
                {
                    !!paymentData.card ?
                    <div>
                        <p className="mb-1">Payment Id : <strong>{paymentData.id}</strong></p>
                        <p className="mb-1">Payment Type: <strong>{paymentData.card.brand} {paymentData.type}</strong></p>
                        <p className="mb-1">Last 4 digit : <strong>{paymentData.card.last4}</strong></p>
                    </div>: null
                }
                

                <h5 className="h5 mt-5">Order Product</h5>
                {
                    !!orderData.image ?
                    <div>
                        <div className="card table-responsive">
                            <table className="table">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Product Details</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col" className="text-end">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <img className="order-img" src={orderData.image} alt="" />
                                        </th>
                                        <td>
                                            <p><strong>{orderData.name}</strong></p>
                                            <p>{orderData.listingType}</p>
                                            <p>{orderData.grade}</p>
                                        </td>
                                        <td>
                                            <p className="qty">1</p>
                                        </td>
                                        <td align="right">
                                            <p className="price">{orderData.price}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div> : null
                } 
            </section>
        </>
    )
}