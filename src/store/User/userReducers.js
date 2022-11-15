import userTypes from './userTypes'
const { User_Signup_Success,  User_Signup_Failed,User_Login_Failed,User_Login_Success, Email_error, Password_error, Username_error} = userTypes;
const Initial_State = {
    user: null,
    token: null,
    signupSuccess: null,
    isLoggedIn: false,
    signupError: '',
    loginError: '',
    validationError: null
}
export const userReducer = (state= Initial_State, action)=>{
    const {type, payload} = action;
    switch(type){
        case User_Signup_Success:
            return{
                ...state,
                signupSuccess: payload
            }
            case User_Signup_Failed:
                return{
                    ...state,
                    signupError: payload 
                }
            case User_Login_Success:
                return{
                    ...state,
                    isLoggedIn: true,
                    user: payload.user,
                    token: payload.token
                }
            case User_Login_Failed:
                return{
                    ...state,
                    loginError: payload 
                }
                case Email_error:
                    return{
                        ...state,
                        validationError: payload
                    }
                case Password_error:
                    return{
                        ...state,
                        validationError: payload
                    }
                case Username_error:
                    return{
                        ...state,
                        validationError: payload
                    }
                  
                case 'alreadyLoggedIn':
                    return{
                        ...state,
                        token: payload,
                        isLoggedIn: true
                    }
                    case 'Logout_user':
                        return{
                            ...state,
                            isLoggedIn:false,
                            token:null
                        }
               
                    default:
                        return state

    }
}