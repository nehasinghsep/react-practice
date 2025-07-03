import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useHistory } from "react-router-dom";
import './payment.css';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

export default function PaymentPage() {
    const history = useHistory();
    
    const CheckoutForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (event) => {
            event.preventDefault();

            if (elements == null) {
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (error) {
                // Show error to your customer (for example, payment details incomplete)
                console.log(error.message);
              } else {
                const paymentObj = JSON.stringify(paymentMethod);
                localStorage.setItem('paymentDetails', paymentObj);
                history.push('/payment-success');
                // console.log('paymentMethod', paymentMethod);
                // Your customer will be redirected to your `return_url`. For some payment
                // methods like iDEAL, your customer will be redirected to an intermediate
                // site first to authorize the payment, then redirected to the `return_url`.
              }
        };

        return (
            <div className='payment-page' style={{marginTop:'100px'}}>
                <form onSubmit={handleSubmit}>
                    <CardElement />
                    <button type="submit" disabled={!stripe || !elements}>
                        Pay
                    </button>
                </form>
            </div>
        );
    };

    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    )
}