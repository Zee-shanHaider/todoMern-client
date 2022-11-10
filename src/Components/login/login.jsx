import React from 'react'
import axios from 'axios'
import { passwordError, emailError,userLoginSuccess, userLoginFailed} from '../../store/User/userActions';
import { userValidationErrorSelector } from '../../store/User/userSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Outlet , Link, useNavigate} from 'react-router-dom';
import { url } from '../../configUrls';


export const Login = () => {
    const dispatch = useDispatch();
  const formErrors = useSelector(userValidationErrorSelector)
  const Initial_formValues = {
        email: '',
        password:'',
    }
  const [formValues, setFormValues] = useState(Initial_formValues);
  const [error, setError] = useState('')
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value})
    setError('')
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

const submitHandler =async (e)=>{
    e.preventDefault();
          if(Object.keys(formErrors).length === 0){
            try{
  
              var data = JSON.stringify(formValues);
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
              if(response.data?.status){
                setFormValues(Initial_formValues)
              }
              const token =  response.data.token;
              localStorage.setItem("token" , token)
              const user = {...response.data.user, imageUrl: response.data.userImage}
              dispatch(userLoginSuccess(user, token))
            }
            catch(error) {
              console.log(error)
              // console.log('error',error.response.data.message)
              // setError(error.response.data.message)
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
                    {error? (<p style={{'color': 'red'}}> {error.msg} </p>):null}                
                {formErrors?.password? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.password} </p> ): null}
                </div>  
                {error? (<p className='e error-para'>{error}</p>):null}
              <button variant="primary" type='submit' className='btn'>
                Sign in
              </button>  
          </form>
    </>
  )
}
