import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const AddProduct = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = React.useContext(AuthContext);
    const [uploading, setUpLoading] = React.useState(false);

    const navigate = useNavigate();
    const img_host_key = process.env.REACT_APP_imgbb_key;

    const email = user?.email;

    const handleAddProduct = (data) => {
        loading_true()
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${img_host_key}`;
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(imgdata => {
                const product = {
                    productName: data.productName,
                    price: data.price,
                    condition: data.condition,
                    category: data.category,
                    discription: data.discription,
                    district: data.district,
                    image: imgdata.data.url,
                    division: data.division,
                    number: data.number,
                    email: email,
                }

                if (imgdata.success) {
                    fetch("https://swap-hand-server-hasibul240.vercel.app/products", {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('access_token')}`
                        },
                        body: JSON.stringify(product)
                    }).then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Product added successfully');
                                navigate('/dashboard/all-products');
                                loading_false()
                            }
                        })
                }
            })
    }

    const loading_true = () => setUpLoading(true);
    const loading_false = () => setUpLoading(false);

    return (
        <div className='flex justify-center items-center ml-5 mt-5'>
            <div className='bg-green-100 rounded-xl drop-shadow-md w-full p-7'>
                <h2 className='text-3xl text-center'>Add Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className='lg:flex gap-5'>
                        <div className='lg:w-1/2 '>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Product Name</span></label>
                                <input type="text" {...register("productName", { required: "Product name is required" })}
                                    className="input input-bordered w-full " />
                                {errors.productName && <p className='text-red-500'>{errors.productName.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Product Price</span>
                                </label>
                                <input type="text" {...register("price", { required: "Must add product price" })}
                                    className="input input-bordered w-full " />
                                {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label"> <span className="label-text">Product Condition</span></label>
                                <select
                                    {...register("condition", { required: "condition is Required" })}
                                    defaultValue="select" className="select input-bordered w-full">
                                    <option disabled value='select'>Select One....</option>
                                    <option value="Excellent">Excellent</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                </select>
                                {errors.condition && <p className='text-red-500'>{errors.condition.message}</p>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label"> <span className="label-text">Product Category</span></label>
                                <select
                                    {...register("category", { required: "Category is Required" })}
                                    defaultValue="select" className="select input-bordered w-full">
                                    <option disabled value='select'>Select One....</option>
                                    <option value="CPU">CPU/Processor</option>
                                    <option value="GPU">GPU/Graphic Card</option>
                                    <option value="Motherboard">Motherboard</option>
                                    <option value="HDD">HDD</option>
                                    <option value="SSD">SSD</option>
                                    <option value="RAM">RAM</option>
                                    <option value="PSW">PSU/Power Suplly</option>
                                    <option value="Colling">Colling Fan</option>
                                    <option value="Cables">Connector Cables</option>
                                </select>
                                {errors.condition && <p className='text-red-500'>{errors.condition.message}</p>}
                            </div>


                        </div>
                        {/* // <div className='lg:w-1/2'> */}
                        <div className='lg:w-1/2 '>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Location (Division)</span></label>
                                <input type="text" {...register("division", { required: "Product Name is Required" })}
                                    className="input input-bordered w-full " />
                                {errors.division && <p className='text-red-500'>{errors.division.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Location (District)</span></label>
                                <input type="text" {...register("district", { required: "Product Name is Required" })}
                                    className="input input-bordered w-full " />
                                {errors.district && <p className='text-red-500'>{errors.district.message}</p>}
                            </div>

                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Mobial Number</span>
                                </label>
                                <input type="text" {...register("number", { required: "Number is Required" })}
                                    className="input input-bordered w-full " />
                                {errors.number && <p className='text-red-500'>{errors.number.message}</p>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Upload Product Picture</span>
                                </label>
                                <input {...register("image", { required: "Image must be uploaded" })} type="file" className="file-input w-full" />
                                {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                            </div>

                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Write Something about your product</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24"
                            {...register("discription", { required: "Discription is Required" })}
                            placeholder="Write something">
                        </textarea>
                        {errors.discription && <p className='text-red-500'>{errors.discription.message}</p>}
                    </div>
                    <input disabled={uploading ? true : false} className='btn btn-accent w-full mt-4' value="Add Product" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;