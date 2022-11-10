import React from 'react'
import {Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { userLoggedInSelector } from "../store/User/userSelectors";

function PublicRouting () {
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
    return(
         !isLoggedIn ? <Outlet/> : <Navigate to="/"/>
    )

}

export default PublicRouting
