import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';

const ChackoutForm = ({ data, setPayment, setTransectionId }) => {
    const { user } = React.useContext(AuthContext)
    const [cardError, setCardError] = React.useState(null);

    const [clientSecret, setClientSecret] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const stripe = useStripe();
    const elements = useElements();



    React.useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://swap-hand-server-hasibul240.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('access_token')}`

            },
            body: JSON.stringify({ price: data.price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            });
    }, [data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setCardError(error.message);
        } else {
            setCardError(null);
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirm_error } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: data.buyer,
                        name: user?.displayName
                    },
                },
            },
        );

        if (confirm_error) {
            setCardError(confirm_error.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransectionId(paymentIntent.id)
            setPayment(true)
            toast.success('Payment Successfull')
            setLoading(false);
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    !loading ? <button className='mt-5 btn w-full text-black hover:text-white hover:bg-green-500 hover:border-green-600 bg-green-200 border-green-400' type="submit" disabled={!stripe || !clientSecret}>
                        confirm payment
                    </button> : <button className='mt-5 btn w-full text-black hover:text-white hover:bg-green-200 hover:border-green-600 bg-green-200 border-green-400'>
                        <Loading />
                    </button>
                }


            </form>
            <p className='text-red-500'>{cardError}</p>
        </>
    );
};

export default ChackoutForm;