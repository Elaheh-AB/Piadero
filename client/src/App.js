
import styled from "styled-components";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButon";
import Profile from "./Profile";
import Navbar from "./Navbar";
import Home from "./Home";
const App=()=> {
  return (
    <>
     <h1> Piadero is live!</h1>
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