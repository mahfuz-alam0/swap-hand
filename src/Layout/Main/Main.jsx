import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div className='bg-green-200'>
            <Navbar />
            <div className='md:mx-5'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;