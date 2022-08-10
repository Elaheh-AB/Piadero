
import styled from "styled-components";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButon";
import Profile from "./Profile";
import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./Home";
const App=()=> {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const addUser = async () => {
    console.log(Object.values(user)+"user")
    await fetch("/add-user", {
       method: "POST",
       headers: {
         "Content-Type": "Application/json",
       },
       body: JSON.stringify(user),
     }) .then((res) => res.json())
     .then((json) => {
       console.log(Object.keys(json) + "json");
       if (json.message === "success") {
         localStorage.setItem("currentUserSub", json.sub);
     //    navigate("/");
       } else if (json.message === "user not found") {
         alert("Your name is not registered");
       }
      
     })
       .catch((err) => {
        
         return console.log(err);
       });
   };
  if(isAuthenticated){
    addUser();
  }

  return (
    <>
   
    <GlobalStyles />
  
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
  
        <Route path="/Profile" element={<Profile />}/>
 
    </Routes>
      </Router>
    </>
    
  );
}

export default App;
export const Rectangle1 = styled.div`
  height: 495px;
  width: 303px;
  background-color: #d6e5fd;
`; 