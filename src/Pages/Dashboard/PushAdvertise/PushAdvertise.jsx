import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import ChackoutAdd from './ChackoutAdd';

const stripePromise = loadStripe(process.env.REACT_APP__Stripe_Pk);

const PushAdvertise = () => {

    useTitle("Push Advertise")
    const data = useLoaderData();
    const { productName, price } = data;
    const push_price = { price: 5 };

    return (
        <div className="card max-w-[500px] mx-auto my-5 shadow-xl bg-green-100">
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <p className='text-lg font-semibold'>Price: ৳{price}</p>
                <p className='text-lg font-semibold'>Push Price: ৳5</p>
                <div className="card-actions w-full">
                    <div className='my-6 w-full'>
                        <Elements stripe={stripePromise}>
                            <ChackoutAdd data={data} push_price={push_price} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PushAdvertise;