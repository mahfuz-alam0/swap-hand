import React from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import MyBuyer from './MyBuyer';

const MyBuyers = () => {

    const { user } = React.useContext(AuthContext);
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        fetch(`https://swap-hand-server-hasibul240.vercel.app/buyers-orders/${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
        }).then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, [user?.email])

    return (
        <div>
            <div className="overflow-x-auto w-full my-5 rounded-md">
                <table className="table w-full">
                    <thead>
                        <tr>
                            
                            <th>User</th>
                            <th>Product and Address</th>
                            <th>Favorite Color</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map(order => <MyBuyer key={order._id} order={order} />)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            
                            <th>Name</th>
                            <th>Product and Address</th>
                            <th>Favorite Color</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default MyBuyers;