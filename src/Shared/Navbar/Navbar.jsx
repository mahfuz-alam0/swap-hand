import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';
import './Navbar.css';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const [isSeller] = useSeller(user?.email);
    const [isAdmin] = useAdmin(user?.email);

    const handleLogOut = () => {

        logOut()
            .then(() => {
                localStorage.removeItem('access_token');
            })
            .catch(err => console.log(err));
    }

    const menuItems = <React.Fragment>
        <li><NavLink className={`${({ isActive }) => isActive ? 'active' : undefined} logo_effect`} to="/home">Home</NavLink></li>
        <li><NavLink className="logo_effect" to="/blog">Blog</NavLink></li>
        {user?.uid ?
            <>
                {
                    isSeller && <>
                        <li><NavLink className="logo_effect" to="/my-orders">My Orders</NavLink></li>
                    </>
                }
                {
                    isSeller || isAdmin ? <>
                        {
                            isAdmin ? <li><NavLink className="logo_effect" to="/dashboard-admin">Dashboard</NavLink></li> : <li><NavLink className="logo_effect" to="/dashboard">Dashboard</NavLink></li>
                        }
                        {/* <li><NavLink className="logo_effect" to="/dashboard">Dashboard 1</NavLink></li> */}
                    </> :
                        <>
                            <li>
                                <NavLink className="logo_effect" to="/my-orders">My Orders</NavLink>
                            </li>
                           
                        </>
                }
                <li><button className='logo_effect' onClick={handleLogOut}>Sign out</button></li>
            </>
            : <li><NavLink className="logo_effect" to="/login">Login</NavLink></li>}
    </React.Fragment>

    return (
        <div className="navbar bg-green-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu navbar_items menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/home' className="btn logo btn-ghost w-40">
                    <img className='w-full' src="/logo.png" alt="" />
                </Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>

            </div>

            <label htmlFor="dashbord-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>

        </div>
    );
};

export default Navbar;