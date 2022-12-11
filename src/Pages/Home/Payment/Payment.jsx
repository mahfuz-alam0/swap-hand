import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import ChackoutForm from './ChackoutForm';

const stripePromise = loadStripe(process.env.REACT_APP__Stripe_Pk);

const Payment = () => {
    useTitle('Payment');
    const [transectionId, setTransectionId] = React.useState(null);
    const [product, setProduct] = React.useState([]);
    const [payment, setPayment] = React.useState(false);
    const data = useLoaderData();
    const navigate = useNavigate();
    const { _id, productId, price, buyer,  } = data
    useEffect(() => {
        fetch(`https://swap-hand-server-hasibul240.vercel.app/products/${productId}`, {
            headers: {
                authoraiton: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, [productId])

    if (payment) {
        const payment_data = {
            transectionId,
            productId,
            price,
            buyer,
            orderId: _id
        }
        fetch(`https://swap-hand-server-hasibul240.vercel.app/payment-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(payment_data)
        }).then(res => res.json())
            .then(data => {
                navigate('/my-orders')
            })
    }

    return (
        <div className='min-h-[500px]'>
            <div className='max-w-[500px] bg-green-100 my-5 rounded-lg mx-auto p-5'>
                <div className=''>
                    <p className="card-title text-center ">Product Name: {product.productName}</p>
                    <p className='text-lg font-semibold'>Price: ৳{price}</p>
                </div>
                <div className='my-6'>
                    <Elements stripe={stripePromise}>
                        <ChackoutForm data={data} setPayment={setPayment} setTransectionId={setTransectionId} />
                    </Elements>
                </div>

            </div>
        </div>
    );
};

export default Payment;