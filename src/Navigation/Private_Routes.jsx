import React from 'react'
import {Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { userLoggedInSelector } from "../store/User/userSelectors";


const PrivateRouting = () => {
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
    return(
         isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    )
}
export default PrivateRouting
