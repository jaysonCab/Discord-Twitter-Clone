import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import {AuthContext} from './helpers/AuthContext';
import {useState, useEffect} from "react";
import axios from "axios";

//session storage contains info until page is deleted, local storage holds info even after page is deleted
function App() {  //Conditional render login registration if logged in already IF NOT AUTHENTICATED
  
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  }); //19 | access value of state and able to change, pass variable through

  useEffect(() => {
    axios.get("http://localhost:1111/auth/auth", {headers: {
      accessToken: localStorage.getItem("accessToken")
    }}).then((response) => {
      if (response.data.error) { 
        setAuthState({...authState, status: false}) //only changes specific field of object | destructure object with ...
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true
        });
      }});
    }, []);
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id: 0, status: false});
  };
  
  return <div className = "App"> 
    
    <AuthContext.Provider value = {{authState, setAuthState}}>

      <Router> 
        <div className = "navbar">
          <div className='links'>
            <Link to="/"> BackToHome!</Link>
            <Link to="/createpost"> Create A Post</Link>
            {!authState.status && (
              <>
                <Link to="/login"> Login !</Link>
                <Link to="/registration"> Register for account!</Link>
              </>
            )};
          </div>
          <div className='loggedInContainer'>
            <h1> {authState.username} </h1>
            {authState.status && <button onClick={logout}> Logout</button>}
          </div>
        </div>

        <Routes>
          <Route path="/" element ={<Home />} />
          <Route path="/createpost" element ={<CreatePost />} />
          <Route path="/post/:id" element ={<Post />} />
          <Route path="/registration" element ={<Registration />} />
          <Route path="/login" element ={<Login />} />
        </Routes>
      </Router>

    </AuthContext.Provider>
  </div>
}

export default App;
