import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSeller = () => {

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {  
            const response = await fetch(`https://swap-hand-server-hasibul240.vercel.app/sellers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            });
            const data = await response.json();
            return data;
        }
    })

    const handleverify = (id) => { 

        fetch(`https://swap-hand-server-hasibul240.vercel.app/sellers/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`,
            }
        }).then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success('Seller Verified')
                    refetch();
                }
            })
    }

    const handleDelete = (id) => {
        fetch(`https://swap-hand-server-hasibul240.vercel.app/sellers/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`,
            }
        }).then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success('Seller Deleted')
                    refetch();
                }
            })
    }

    return (
        <div>
            <div className="md:ml-5 overflow-x-auto my-5">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers?.map((seller, index) => <tr key={seller._id}>
                                <th>{index + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                {
                                    seller.isVarify ? <td>
                                        <span className="badge bg-green-500 badge-md">Varified</span>
                                    </td> : <td className="text-red-500">
                                        <span className="badge bg-red-500 badge-md">Not Varified</span>
                                        
                                    </td>
                                }
                                <td>
                                    <button onClick={()=>handleverify(seller._id)} className="btn bg-green-500 hover:bg-green-700 text-white btn-sm">Verify</button>
                                </td>
                                <td>
                                    <button onClick={()=>handleDelete(seller._id)} className='btn btn-sm bg-red-500 hover:bg-red-700 text-white'>delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;