import React from 'react';

const MyBuyer = ({ order }) => {

    const [user, setuser] = React.useState({});
    const { payment, price, address, buyer, productName } = order;
    
    React.useEffect(() => {
        fetch(`https://swap-hand-server-hasibul240.vercel.app/user/${buyer}`)
            .then(res => res.json())
            .then(data => setuser(data))
    }, [buyer])

    return (
        <tr className="hover">

            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={user.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{buyer}</div>
                    </div>
                </div>
            </td>
            <td>
                {productName}
                <br />
                <span className="badge badge-ghost badge-sm">{address}</span>
            </td>
            {
                payment ? <td >
                    <span className="badge bg-green-500 badge-md">Paid</span>
                </td> : <td className="">
                    <span className="badge bg-red-500 badge-md">UnPaid</span>
                </td>
            }

            <th>
                <p>{price}</p>
            </th>
            <th>
                <button className="btn btn-ghost btn-xs">{price}</button>
            </th>
        </tr>
    );
};

export default MyBuyer;