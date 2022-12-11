import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from '../Products/Product';
import ProductModal from '../Products/ProductModal';

const ProductByCategory = () => {
    const products = useLoaderData();
    const [modal, setModal] = React.useState(null);

    return (
        <div>

            <div className='grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 my-5'>
                {
                    products?.map(product => <Product key={product._id} setModal={setModal} product={product} />)
                }
            </div>
            {
                modal && <ProductModal product={modal} setModal={setModal} />
            }
        </div>
    );
};

export default ProductByCategory;