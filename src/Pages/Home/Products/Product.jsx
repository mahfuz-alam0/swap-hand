import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useAuthor from '../../../hooks/useAuthor';

const Product = ({ product, setModal }) => {

    const { user } = React.useContext(AuthContext);

    const [isSeller] = useAuthor(product.email, user?.email);
    const [seller_name, setSeller_name] = React.useState('');
    const [seller_image, setSeller_image] = React.useState('');
    const [isvarify, setisvarify] = React.useState('');
    const [seller_info, setSeller_info] = React.useState([]);

    const { _id, productName, price, image, email, discription, condition, number, division, district, isAdvertisement } = product;



    React.useEffect(() => {
        fetch(`https://swap-hand-server-hasibul240.vercel.app/seller-info/${email}`, {
            headers: {
                authoraiton: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => res.json())
            .then(data => {
                setSeller_info(data);
            })
    }, [email])

    //seller name from seller_info
    React.useEffect(() => {
        for (const key in seller_info) {
            setSeller_name(seller_info[key].name);
            setSeller_image(seller_info[key].image);
            setisvarify(seller_info[key].isVarify);
        }
    }, [seller_info]);

    return (
        <div className="w-full card card-compact bg-green-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <p>{discription}</p>
                <p className='font-semibold'>Product Condition: {condition}</p>
                <p className='font-semibold'>Contect: {number}</p>
                <p className='text-lg font-semibold'>Price: ৳{price}</p>
                <p>Location: {district},{division}</p>
                <div className="card-actions items-center justify-between">
                    <div className='flex items-center'>
                        <div className="avatar mr-3">
                            <div className="w-12 rounded-full">
                                <img src={seller_image} alt='' />
                            </div>
                        </div>
                        <div>
                            <p className='text-sm font-semibold'>{seller_name}</p>
                            {
                                isvarify ? <>
                                    <div className='flex items-center'>
                                        <div className="avatar">
                                            <div className="w-5 rounded-full mr-1">
                                                <img src='/tick.png' alt='' />
                                            </div>
                                        </div>
                                        <p className='text-sm font-semibold text-green-500'>Verified</p>
                                    </div>

                                </> : <p className='text-md text-semibold text-red-500'>Not Varified</p>
                            }
                        </div>
                    </div>
                    {isSeller ?
                        <>
                            {
                                !isAdvertisement ? <Link to={`/push-advertise/${_id}`} className="btn btn-primary text-black hover:text-white hover:bg-green-500 hover:border-green-600 bg-green-200 border-green-400 btn-sm">
                                    Push Now
                                </Link> : <button className="btn btn-primary text-black hover:text-white hover:bg-green-500 hover:border-green-600 bg-green-200 border-green-400 btn-sm">
                                    Pushed
                                </button>
                            }
                            
                        </>
                        :
                        <label onClick={() => setModal(product)} htmlFor="order-modal" className="btn btn-primary text-black hover:text-white hover:bg-green-500 hover:border-green-600 bg-green-200 border-green-400 btn-sm">
                            Order Now
                        </label>
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;