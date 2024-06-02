import React, {useState, useContext} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from '../helpers/AuthContext';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext);

  let navigate = useNavigate();


  const login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:1111/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error); //.error checks if theres an error
      } else {
        localStorage.setItem("accessToken", response.data.token); //accesstoken variable from Users.js sent to response.
        setAuthState({username: response.data.username, id: response.data.id, status: true});

        navigate("/"); //page redirector once executed
      };
    });
  };
  return (
    <div className='loginContainer'>
      <label className='whiteText'>Username</label>
      <input type = "text" 
      onChange = {(event) => {
        setUsername(event.target.value);
      }} />
      
      <label className='whiteText'>Password</label>
      <input type = "password" 
      onChange = {(event) => {
        setPassword(event.target.value);
      }}/>

      <button onClick = {login}> Login !</button>
    </div>
  )
}

export default Login
