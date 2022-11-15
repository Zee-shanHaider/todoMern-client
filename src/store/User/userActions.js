import userTypes from './userTypes'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { url } from '../../configUrls';

const { User_Signup_Success,  User_Signup_Failed,User_Login_Failed,User_Login_Success} = userTypes;

export const userSignupSuccess = (response)=>{
        return {
            type: User_Signup_Success,
            payload: response
        }
    }
export const userSignupFailed = (error)=>{
        return {
            type: User_Signup_Failed,
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
            type: User_Login_Failed,
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
}

export const userLogin =(params)=>async (dispatch)=>{
    try{
  
        var data = JSON.stringify(params);
        var config = {
        method: 'POST',
        withCredentials: false,
        url: url+'/api/login',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data : data
        };
        const response = await  axios(config)
        const token =  response.data.token;
        localStorage.setItem("token" , token)
        const user = {...response.data.user, imageUrl: response.data.userImage}
        dispatch(userLoginSuccess(user, token))
      }
      catch(error) {
        dispatch(userLoginFailed(error?.response?.data?.message))
      }
}

export const userSignup = params =>async (dispatch)=>{
    try{
        
        var config = {
        method: 'POST',
        url: url+'/api/signup',
        data : params,
      };
        const response = await  axios(config)
        dispatch(userSignupSuccess(response))
      }
      catch(error) {
        dispatch(userSignupFailed(error?.response?.data?.msg[0]?.msg))
      }
}
