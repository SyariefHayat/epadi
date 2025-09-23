import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

import { userDataAtomStorage } from "@/jotai/atoms";

const ProtectedRoute = ({ children }) => {
    const userData = useAtomValue(userDataAtomStorage);

    if (!userData) return <Navigate to="/" replace />;

    return children ? children : <Outlet />;
};

export default ProtectedRoute;