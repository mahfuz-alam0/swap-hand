import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../../Shared/Loading/Loading';
import SingleProduct from './SingleProduct';

const AllProduct = () => {

    useTitle("All Product")
    const { user } = React.useContext(AuthContext);
    const email = user?.email;

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const response = await fetch(`https://swap-hand-server-hasibul240.vercel.app/my-products/${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            });
            const data = await response.json();
            return data;
        }
    })

    if (isLoading) {
        return <div className='min-h-screen flex justify-center'><Loading /></div>
    }

    return (
        <div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 ml-5 my-5'>
                {
                    products?.map(product => <SingleProduct key={product._id} product={product} />)
                }
            </div>
        </div>

    );
};

export default AllProduct;