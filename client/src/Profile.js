import React , { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import styled from "styled-components";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
    <Navbar></Navbar>
    <WrapperCategories>
    <div>
    {   
    isAuthenticated && (
     <>
        <img src={user.picture} alt={user.name} />
        <h1>{user.name}</h1>
        <h4>{user.email}</h4>
       
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          ""
        )}
     </>
    )}
     </div>
    </WrapperCategories>
    </>
  );
};

export default Profile;
const WrapperCategories = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  overflow: hidden;
  text-align: center;
img{
 border-radius: 50%;
  width: 30%;
 margin-bottom: 25px;
}
  a {
    float: none;
    display: block;
    text-align: left;
  }
  h1 {
    padding: 15px;
  }
  div {
   
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: aliceblue;
    margin: 25px;
    padding: 25px;
    width: 35vw;
  }
  @media (max-width: 900px) {
    
    div{
      width: 98vw;
    }
    
      }
`;

