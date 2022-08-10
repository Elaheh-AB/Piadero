import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Home = () => {
  const request = require("request-promise");

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [city, setCity] = useState("");
  const [temp,setTemp]=useState();
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
      {isAuthenticated && (
        <div>
          

          <h3> Where do you want to walk?</h3>
          <WrapperCategories>
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
              <h2>
                Today in {city} the weather feels like {temp}
               
              </h2>
            )}
          </WrapperCategories>
        </div>
      )}
    </>
  );
};

export default Home;
const WrapperCategories = styled.div`
  float: left;
  overflow: hidden;

  a {
    float: none;
    display: block;
    text-align: left;
  }
`;
