import React , { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
   
   <>
    <Navbar></Navbar>
    {    isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
         
         
         
        </div>)}
    </>
   
    
  );
};

export default Home;