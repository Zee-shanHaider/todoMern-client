import React from 'react'
import { useState } from 'react'
import { Outlet , Link, useNavigate, Navigate} from 'react-router-dom'
import './navigation.style.css'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { passwordError, emailError,usernameError,Logout } from '../../store/User/userActions';
import { userValidationErrorSelector, userSelector } from '../../store/User/userSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../configUrls';

const  Navbar=(props)=> {
  
  const dispatch = useDispatch();
  const user = useSelector(state=> state.user.user);
  const formErrors = useSelector(userValidationErrorSelector)
  const navigate = useNavigate()
  const isLoggedIn = useSelector(state=> state?.user.isLoggedIn)
  const [image, setImage] = useState(null);
  const Initial_formValues = {
        username: '',
        email: '',
        password:'',
    }
  const [formValues, setFormValues] = useState(Initial_formValues);
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
const handleShow = ()=>{
  setShow(true)
}
const handleShowSignup = ()=>{
  setShow(true)
}
const handleClose = ()=>setShow(false)

const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value})
    console.log('formValues',formValues)
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
            const formData = new FormData();
            formData.append('username', formValues.username)
            formData.append('email', formValues.email)
            formData.append('image', image)
            formData.append('password', formValues.password)
            var config = {
            method: 'POST',
            url: url+'/api/signup',
            headers: { 
            },
            data : formData,
          };
            const response = await  axios(config)
            console.log(response.data?.status)
            if(response.data?.status){
              setShow(false)
              setFormValues(Initial_formValues)
              {<Navigate to="/login" replace={true} />}
            }
         
            console.log(JSON.stringify(response?.data));
          }
          catch(error) {
            console.log(error)
            // console.log('error',error?.response?.data?.msg[0]?.msg)
            // setError(error?.response?.data?.msg[0]?.msg)
          }
}

  //------------------
  
}
  const signOut = ()=>{
  dispatch(Logout())
  localStorage.clear()
  navigate('/login')
    // setIsLoggedin(false);
}

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">

  <Dropdown>
    {
      isLoggedIn? ( <Dropdown.Toggle  id="dropdown-basic" className='drop'>
      <img src={user?.imageUrl} alt="user" className='userImg'/>
    </Dropdown.Toggle>): <Link to='/login' className='btn'>Sign in</Link>}
    
      <Dropdown.Menu>
      <Dropdown.Item>
        <button className='btn' onClick={()=>signOut()}>{user?.username}</button>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        <Dropdown.Item>
        <button className='btn' onClick={()=>signOut()}>Sign out</button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
   <Modal show={show} onHide={handleClose}>
        <Modal.Header>
      <Modal.Title>Sign up</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          {error? (<p className='e error-para'>{error}</p>):null}
          <Form onSubmit={submitHandler} encType="multipart/form-data">
                 <div className="mb-3">
                    <label htlmfor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" name='username' className="form-control" id="username" aria-describedby="emailHelp"  onChange={handleChange} value={formValues.username}/>                
                {formErrors?.username? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.username} </p> ): null}
                </div>
                 <div className="mb-3">
                    <label htlmfor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={handleChange} value={formValues.email}/>
                {formErrors?.email? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.email} </p> ): null}
                </div>
                 <div className="mb-3">
                    <label htlmfor="exampleInputEmail1" className="form-label">Image</label>
                    <input type="file" name='imageUrl' className="form-control" id="imageUrl" aria-describedby="emailHelp" onChange={(e)=>{
                      setImage(e.target.files[0])
                    }}/>
                </div>

                <div className="mb-3">
                    <label htlmfor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={handleChange} value={formValues.password}/>
                    {error? (<p style={{'color': 'red'}}> {error.msg} </p>):null}                
                {formErrors?.password? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.password} </p> ): null}
                </div>  
              <Button variant="primary" type='submit'>
                Sign up
              </Button>  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
     {
      !isLoggedIn ? (<button className='btn' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" onClick={handleShowSignup}>
      Signup
    </button>): null
     }
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tasks">Tasks</Link>
        </li>
        <li className="nav-item dropdown">
        </li>
        
      </ul>
    
  
     
    </div>
  </div>
</nav>
<div>
</div>
    </>
    
  )
}
export default Navbar
