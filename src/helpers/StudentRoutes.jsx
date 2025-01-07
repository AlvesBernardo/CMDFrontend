import { Navigate, Outlet } from "react-router-dom";
import TokenManager from "../helpers/TokenManager";

const StudentRoutes = () => {
    const isStudent = !TokenManager.getUserRole();
    return isStudent ? <Outlet /> : <Navigate to="/" />;
};

export default StudentRoutes;
