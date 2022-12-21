import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Report = () => {
    const { user } = React.useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loggingIn, setLoggingIn] = React.useState(false);
    const navigate = useNavigate();


    const handlesubmit = (data) => {
        setLoggingIn(true);

        fetch('https://swap-hand-server-hasibul240.vercel.app/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Report Submitted')
                    navigate('/home')
                }
                setLoggingIn(false);
            })
    }

    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='bg-green-100 rounded-xl drop-shadow-md w-full p-7'>
                <h2 className='text-3xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handlesubmit)}>

                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Problem</span></label>
                        <input type="text"
                            {...register("problem", {
                                required: "Problem topic is required"
                            })}
                            className="input input-bordered w-full " />
                        {errors.problem && <p className='text-red-600'>{errors.problem?.message}</p>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label className="label"> <span className="label-text">Your Complain</span></label>

                        <textarea className="textarea" placeholder="Write Your Complain"
                            {...register("complain", { required: "Text area is required", })}
                        ></textarea>
                        {errors.complain && <p className='text-red-600'>{errors.complain?.message}</p>}
                    </div>
                    <input disabled={loggingIn ? true : false} className='btn btn-accent w-full' value="Submit" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default Report;