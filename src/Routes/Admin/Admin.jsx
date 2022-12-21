import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../../Shared/Loading/Loading';

const Admin = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, sellerLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || sellerLoading) {
        return <div className='min-h-screen flex justify-center'><Loading /></div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default Admin;