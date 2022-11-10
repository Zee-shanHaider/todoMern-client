import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";

// Own Imports
import Tasks from "../Components/tasks/tasks";
import PrivateRouting from "./Private_Routes";
import PublicRouting from "./Public_Routes";
import { Home } from "../Routes/homeRoutes";
import LoginPage from "../Routes/loginRoute";
import axios from 'axios'
import { useEffect,useState } from "react";
import { isUserLoggedIn, Logout,userLoginSuccess } from "../store/User/userActions";
import jwt_decode from "jwt-decode";

export const Navigation = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)

  useEffect(()=>{
    if(token){
      var data = '';
      var config = {
        method: 'get',
        url: 'https://todo-isoft.herokuapp.com/api/reload',
        headers: { 
          'Authorization': token,
        },
        data : data
      };
      axios(config)
      .then(function (response) {
        setloading(true)
        let user = response.data.user;
        const image = response.data.imageUrl;
        user = {...user, imageUrl: image}
        dispatch(userLoginSuccess(user, token))
        setloading(false)
        dispatch(isUserLoggedIn())
})
.catch(function (error) {
  console.log(error);
});
}
else{
  dispatch(Logout())
}
    setInterval(()=>{
      if(token){
        var decoded = jwt_decode(token.toString());
        const exp = decoded.exp;
        if (exp * 1000 < Date.now()) {
          // dispatch(Logout())
          localStorage.clear()
          return clearInterval()
        }
    }
  }, 1000)
  },[])
  return (
    <div className="App">
      {!loading ?
      <Router>
        <Routes>
          <Route element={<PublicRouting />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          // Private Routing
          <Route element={<PrivateRouting />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/" element={<Home />} />
          </Route>
          //Public Routing
          <Route element={<PublicRouting />}></Route>
        </Routes>
      </Router>
      :
      <div>
        <p style={{fontSize:'70px'}}>mun sabro ka </p>
          </div>
          }
    </div>
  );
};
