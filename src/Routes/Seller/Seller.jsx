import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useSeller from '../../hooks/useSeller';
import Loading from '../../Shared/Loading/Loading';

const Seller = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, sellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if (loading || sellerLoading) {
        return <div className='min-h-screen flex justify-center'><Loading /></div>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default Seller;