import React from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';
import ProductModal from './ProductModal';

const Products = ({ products }) => {

    const [modal, setModal] = React.useState(null);

    return (
        <div>
            <h2 className='text-5xl text-center my-10 underline'>Products</h2>
            <div className='flex items-center'>
                <div className="dropdown dropdown-bottom">
                    <label tabIndex={0} className="btn m-1">Search by category</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/category/CPU' className='btn-xs'>CPU/Processor</Link></li>
                        <li><Link to='/category/GPU' className='btn-xs'>GPU/Graphic Card</Link></li>
                        <li><Link to='/category/Motherboard' className='btn-xs'>Motherboard</Link></li>
                        <li><Link to='/category/HDD' className='btn-xs'>HDD</Link></li>
                        <li><Link to='/category/SSD' className='btn-xs'>SSD</Link></li>
                        <li><Link to='/category/RAM' className='btn-xs'>RAM</Link></li>
                        <li><Link to='/category/PSW' className='btn-xs'>PSU/Power Suplly</Link></li>
                        <li><Link to='/category/Colling' className='btn-xs'>Colling Fan</Link></li>
                        <li><Link to='/category/Cables' className='btn-xs'>Connector Cables</Link></li>
                    </ul>
                </div>
                <div>
                    <Link to='/report' className='btn'>Report</Link>
                </div>
            </div>
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

export default Products;