import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route,Outlet } from "react-router-dom";
import Loader from "../layout/loader/Loader";

const ProtectedRoute = ({ element, path }) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    console.log(isAuthenticated)
    if (loading) {
       return <Loader />
    }
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login-register" />;
}

export default ProtectedRoute;