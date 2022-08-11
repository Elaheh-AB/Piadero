import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";

const Home = () => {
  const request = require("request-promise");

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [city, setCity] = useState("");
  const [temp,setTemp]=useState();
  let navigate = useNavigate();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

 
    const getWeather = (city) => {
        fetch(`/currentWeather/${city}`)
      .then((res) => res.json())
      .then((data) => {
        setTemp(data.feels_like);
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
       
        }
  return (
    <>
      <Navbar></Navbar>
      <WrapperCategories>
    
      <div>
          
         
          <h1> Where do you want to walk?</h1>
          
            <select
              id="selectedCity"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                getWeather(e.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select your city please
              </option>
              <option value="Montreal">Montreal</option>
              <option value="Toronto">Toronto</option>
              <option value="Vancouver">Vancouver</option>
            </select>
            {city != "" && (
                <>
                <h2>
                Today in {city} the weather feels like {temp}
               
              </h2>
              </>
            )}
              
           
         
       
      {isAuthenticated ? (
        <button onClick={() => navigate("/creatgroup")}>Create your group</button>
       
      ):(
      
           <LoginButton/>
          
          
      )
     }
      </div>
      </WrapperCategories></>
  );
  
};

export default Home;
const WrapperCategories = styled.div`

 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin: 15px;
  overflow: hidden;
  text-align: center;

  a {
    float: none;
    display: block;
    text-align: left;
  }
  h1{
    margin-top: 100px;
    margin-bottom:15px ;
  }
  h2{
    padding: 10px;
    text-align: center;
  }
 
div{
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
    margin: 15px;
    padding: 15px;
    width: 470px;
}
`;
const ImgB = styled.img`

 width: fit-content;

 z-index: -1000;
`;
