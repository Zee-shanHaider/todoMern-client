import userTypes from './userTypes'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

const { User_Signup_Success,  User_Signup_Failed,User_Login_Failed,User_Login_Success} = userTypes;

export const userSignupSuccess = (user)=>{
        return {
            type: User_Signup_Success,
            payload: user
        }
    }
export const userSignupFailed = (error)=>{
        return {
            type: User_Signup_Success,
            payload: error,
        }
}
export const userLoginSuccess = (user,token)=>{
        return {
            type: User_Login_Success,
            payload: {user,token}
        }
}
export const userLoginFailed = (error)=>{
        return {
            type: User_Signup_Success,
            payload: error
        }
}

export const passwordError = (error)=>{
    return{
        type: 'Password_error',
        payload: error
    }
}
export const emailError = (error)=>{
    return{
        type: 'Email_error',
        payload: error
    }
}
export const usernameError = (error)=>{
    return{
        type: 'Username_error',
        payload: error
    }
}
export const Logout = ()=>{
    console.log('logout call')
    localStorage.clear()
    return{
        type: 'Logout_user',
        payload: {}
    }
}

export const isUserLoggedIn =()=>{
    const token = localStorage.getItem('token'); 
    if(token){
        return( {
                    type: 'alreadyLoggedIn',
                    payload: token
                })
    }
    else{
        return({
            type: '',
            payload: {}
        })
    }
//     try{
//         if(token){
//         const res = await  axios.get('http://localhost:8080/api',{
//                            headers: { 
//                                      'Content-Type': 'application/json',
//                                          'Authorization': token
//                                    }})
             
//                    if(res.data ){
//                     dispatch( {
//                         type: 'alreadyLoggedIn',
//                         payload: token
//                     })
//                    }
//                 }
//     } catch(err){
//     return dispatch(Logout())
// }
}
