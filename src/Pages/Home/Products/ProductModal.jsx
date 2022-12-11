import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const ProductModal = ({ product, setModal }) => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = React.useContext(AuthContext);

    const [seller_name, setSeller_name] = React.useState('');
    const [seller_image, setSeller_image] = React.useState('');
    const [isvarify, setisvarify] = React.useState('');
    const [seller_info, setSeller_info] = React.useState([]);

    const { _id, productName, price, image, email, discription, condition, number, division, district } = product;



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


    const handleOrder = (data) => {
        const order = {
            buyer: user.email,
            seller: email,
            productId: _id,
            price: price,
            orderDate: new Date().toDateString(),
            orderStatus: 'pending',
            address: data.address,
            delivary: data.delivary,
            number: data.number,
            productName,
        }

        fetch('https://swap-hand-server-hasibul240.vercel.app/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(order)
        }).then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    toast.success('Order placed successfully');
                    setModal(null);
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="order-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className="w-full card card-compact bg-green-100 shadow-xl">
                        <figure><img src={image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{productName}</h2>
                            <p>{discription}</p>
                            <p className='font-semibold'>Product Condition: {condition}</p>
                            <p className='font-semibold'>Contect: {number}</p>
                            <p className='text-lg font-semibold'>Price: ৳{price}</p>
                            <p>Location: {district},{division}</p>
                            <div className="flex-col card-actions ">
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
                                <form className='w-full' onSubmit={handleSubmit(handleOrder)}>
                                    <div className="form-control w-full">
                                        <label className="label"> <span className="label-text">How do you want to Order the product</span></label>
                                        <select
                                            {...register("delivary")}
                                            defaultValue='Pick Up' className="select input-bordered w-full">
                                            <option value="Pick Up">Pick Up</option>
                                            <option value="Cash On Delivery">Cash On Delivery</option>
                                        </select>
                                    </div>
                                    <div className="form-control w-full mb-5 ">
                                        <label className="label"> <span className="label-text">Place you want to pick/Your Address (street, district, divition)</span></label>
                                        <input type="text"
                                            {...register("address", {
                                                required: "address Address is required"
                                            })}
                                            className="input input-bordered w-full " />
                                        {errors.address && <p className='text-red-600'>{errors.address?.message}</p>}
                                    </div>
                                    <div className="form-control w-full mb-5 ">
                                        <label className="label"> <span className="label-text">Your phone number</span></label>
                                        <input type="text"
                                            {...register("number", {
                                                required: "Phone number is required"
                                            })}
                                            className="input input-bordered w-full " />
                                        {errors.number && <p className='text-red-600'>{errors.number?.message}</p>}
                                    </div>

                                    <input className='btn text-black hover:text-white hover:bg-green-500 hover:border-green-600 bg-green-200 border-green-400 w-full' value="Place Order" type="submit" />

                                </form>
                                <label htmlFor="order-modal" className="w-full btn text-black hover:text-white hover:bg-green-500 hover:border-green-600 bg-green-200 border-green-400 btn-sm">
                                    Cancel
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;