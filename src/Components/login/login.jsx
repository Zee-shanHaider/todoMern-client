import React from 'react'
import axios from 'axios'
import { passwordError, emailError, userLoginFailed, userLogin} from '../../store/User/userActions';
import { userValidationErrorSelector,userSelector,userLoginErrorSelector } from '../../store/User/userSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Outlet , Link, useNavigate} from 'react-router-dom';
import { url } from '../../configUrls';


export const Login = () => {
    const dispatch = useDispatch();
    const loginError = useSelector(userLoginErrorSelector)
    const user = useSelector(userSelector)
  const formErrors = useSelector(userValidationErrorSelector)
  const Initial_formValues = {
        email: '',
        password:'',
    }
  const [formValues, setFormValues] = useState(Initial_formValues);
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value})
    switch(name){
      case 'email':
             if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){ 
                dispatch(emailError({}))
            }
            else{
                const errors = {};
                errors.email = 'email is not valid!'
                dispatch(emailError(errors))
            }
            break;
            case 'password':
              if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)){
                    dispatch(passwordError({}))
                }

                
                else{
                    const errors = {};
                    errors.password = 'Password must of Minimum eight characters, at least one letter, one number and one special character'
                    dispatch(passwordError(errors))
                }
                break;
    }
}

const submitHandler =(e)=>{
    e.preventDefault();
          if(Object.keys(formErrors).length === 0){
           dispatch(userLogin(formValues))
           if(user){
            setFormValues(Initial_formValues)
           }
  }  
}



  return (
    <>
     
          <form onSubmit={submitHandler} style={{'width': '60%', 'margin': '20px auto'}}>
                
                 <div className="mb-3">
                    <label htlmfor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={handleChange} value={formValues.email}/>
                {formErrors?.email? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.email} </p> ): null}
                </div>

                <div className="mb-3">
                    <label htlmfor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={handleChange} value={formValues.password}/>
                    {loginError? (<p style={{'color': 'red'}}> {loginError.msg} </p>):null}                
                {formErrors?.password? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.password} </p> ): null}
                </div>  
              <button variant="primary" type='submit' className='btn'>
                Sign in
              </button>  
                {loginError? (<p className='e error-para'>{loginError}</p>):null}
          </form>
    </>
  )
}
