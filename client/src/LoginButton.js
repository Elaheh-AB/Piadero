import { useAuth0 } from "@auth0/auth0-react";
import React, { useState,useEffect } from "react";
const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, getIdTokenClaims } = useAuth0();
const[user,setUser]=useState(null);
 
    
    const checkAuth = async () => {
    await  loginWithRedirect();
    };
   
  

    
 
  


  return <>
 { !isAuthenticated && <button onClick={checkAuth}>Log in</button>}
 
  </>
};
export default LoginButton;
