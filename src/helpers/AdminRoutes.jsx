import { Navigate, Outlet } from "react-router-dom";
import TokenManager from "../helpers/TokenManager";

const AdminRoutes = () => {
    const isAdmin = TokenManager.getUserRole();
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
