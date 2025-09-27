import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
    const { currentUser, userData, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!currentUser || !userData) return <Navigate to="/" />;

    const allowedRoles = ["admin"];

    if (allowedRoles.includes(userData.role)) return children;

    return <Navigate to="/" />;
};

export default ProtectedAdminRoute;