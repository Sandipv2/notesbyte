import { useEffect } from "react";
import { Navigate } from "react-router-dom"

import { ImSpinner8 } from "react-icons/im";

import { useAuthStore } from "../store/authStore"

function ProtectedRoute({ children }) {
    const { user, isLoggedIn, isLoading, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth().catch(err => {
            console.log(err.message)
        })
    }, [checkAuth])

    if(isLoading) {
        return <div className="min-h-screen flex justify-center items-center text-white font-bold">
            <ImSpinner8 size={30} className="animate-spin"/>
        </div>;
    }

    if (!isLoggedIn) {
        return <Navigate to='/login' replace />
    }

    if (!user.isAccountVerified) {
        return <Navigate to='/verify-email' replace />;
    }

    return children;
}

export default ProtectedRoute;