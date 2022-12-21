import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';
import useTitle from '../../hooks/useTitle';
import './DashboardLayout.css';

const DashboardLayout = () => {
    
    useTitle("Dashboard")

    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <div>
            <div className="h-[120vh] drawer drawer-mobile">
                <input id="dashbord-drawer" type="checkbox" className="drawer-toggle" />
                <div className="min-h-min drawer-content flex-col items-center ">
                    <Outlet />
                </div>
                <div className="drawer-side h-[1200px]  bg-green-100">
                    <label htmlFor="dashbord-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard-admin/allusers'>All Buyers</Link></li>
                                <li><Link to='/dashboard-admin/allseller'>All Seller</Link></li>
                                <li><Link to='/dashboard-admin/allreport'>Manage report</Link></li>
                            </>
                        }
                        {
                            isSeller && <>
                                <li>
                                    <Link className='btn-ghost' to='all-products'>All Product</Link>
                                </li>
                                <li>
                                    <Link className='btn-ghost' to='addproduct'>Add Product</Link>
                                </li>
                                <li>
                                    <Link className='btn-ghost' to='my-buyers'>My Buyers</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;