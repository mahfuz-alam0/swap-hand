import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBuyers = () => {

    const { data: buyers = [] } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const response = await fetch(`https://swap-hand-server-hasibul240.vercel.app/buyers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            });
            const data = await response.json();
            return data;
        }
    })

    return (
        <div>
            <div className="md:ml-5 my-5 overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, index) => <tr key={buyer._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={buyer.image} alt='' />
                                        </div>
                                    </div>
                                    {/* {buyer.name} */}
                                </td>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;