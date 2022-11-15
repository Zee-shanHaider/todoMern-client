import { createSelector } from "reselect";

export const selectUserReducer = state=> state?.user;

export const userSelector = createSelector([selectUserReducer],
    (userReducer)=>{
        return userReducer.user
    })
export const tokenSelector = createSelector([selectUserReducer],
    (userReducer)=>{
        return userReducer.user
    })

export const userLoggedInSelector = createSelector([selectUserReducer],
    (userReducer)=>{
        return userReducer.isLoggedIn
    })

export const userValidationErrorSelector = createSelector([selectUserReducer],
    (userReducer)=>{
        return userReducer.validationError
    })
export const userLoginErrorSelector = createSelector([selectUserReducer],
    (userReducer)=>{
        return userReducer.loginError;
    })
export const userSignupErrorSelector = createSelector([selectUserReducer],
    (userReducer)=>{
        return userReducer.signupError;
    })
export const userSignupSuccessSelector = createSelector([selectUserReducer],
    (userReducer)=>{
        return userReducer.signupSuccess;
    })

