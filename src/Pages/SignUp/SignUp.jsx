import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';
import SocialLogin from '../SocialLogin/SocialLogin';

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = React.useContext(AuthContext);
    const [signUpError, setSignUPError] = React.useState('');
    const [userEmail, setUserEmail] = React.useState(null);
    const [token] = useToken(userEmail);
    const [signInLoading, setSignInLoading] = React.useState(false);

    const navigate = useNavigate();
    const img_host_key = process.env.REACT_APP_imgbb_key;

    if (token) {
        navigate('/home');
    }

    const handleSignUp = (data) => {
        loading_true()

        setSignUPError('');
        const image = data.image[0];

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${img_host_key}`;
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(imgdata => {
                if (imgdata.success) {
                    const userDB = {
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        image: imgdata.data.url,
                        isVarify: false
                    }
                    createUser(data.email, data.password)
                        .then(result => {
                            const userInfo = {
                                displayName: data.name
                            }
                            updateUser(userInfo)
                                .then(() => {
                                    save_user(userDB)
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(error => {
                            setSignUPError(error.message)
                        });
                }
            })
    }

    const save_user = (userDB) => {

        fetch('https://swap-hand-server-hasibul240.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userDB)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Account Created Successfully')
                    set_email_for_token(userDB.email)
                    loading_false()
                }
            })
    }

    const set_email_for_token = (email) => {
        setUserEmail(email)
    }

    const loading_true = () => setSignInLoading(true);
    const loading_false = () => setSignInLoading(false);

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='bg-green-100 rounded-xl drop-shadow-md w-96 p-7'>
                <h2 className='text-3xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", { required: "Name is Required" })}
                            className="input input-bordered w-full " />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", { required: true })}
                            className="input input-bordered w-full " />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required", minLength: { value: 6, message: "Password must be 6 characters long" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })} className="input input-bordered w-full " />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Join As</span></label>
                        <select
                            {...register("role", { required: "role is Required" })}
                            defaultValue='Buyer' className="select input-bordered w-full">
                            <option value="Buyer">Buyer</option>
                            <option value="Seller">Seller</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Upload Profile Picture</span>
                        </label>
                        <input {...register("image", { required: "Image must be uploaded" })} type="file" className="file-input w-full" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>

                    <input disabled={signInLoading ? true : false} className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account? <Link className='text-primary hover:underline' to="/login">Please Login</Link></p>
                <div className="divider">OR</div>
                <SocialLogin />
            </div>
        </div>
    );
};

export default SignUp;