import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
    const { user } = useAuth();

    if ( user ) {
        return <Navigate to="/organization" />;
    }

    return <Outlet />;
};

export default PublicRoute;