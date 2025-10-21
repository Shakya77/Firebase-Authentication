import { Navigate } from 'react-router-dom';
import { routes } from '../routes';

const ProtectedRoute = ({ user, role, requiredRole, children }) => {
    if (!user) {
        return <Navigate to={routes.authentication} />;
    }
    if (requiredRole && role !== requiredRole) {
        return <Navigate to={routes.home} />;
    }
    return children;
};

export default ProtectedRoute;