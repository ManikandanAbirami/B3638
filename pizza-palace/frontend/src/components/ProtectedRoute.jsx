import { Navigate } from "react-router-dom";

import { useAuth } from "../context/auth-context";

function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    // NOT LOGGED IN
    if (!user) {
        return <Navigate to="/login" />;
    }

    // ROLE CHECK FAILED
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;