import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Myorder from './Myorder';

const MyOrders = () => {
    const { user } = React.useContext(AuthContext)

    const { data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`https://swap-hand-server-hasibul240.vercel.app/orders/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 my-5'>
            {
                orders?.map(order => <Myorder key={order._id} order={order} />)
            }
        </div>
    );
};

export default MyOrders;