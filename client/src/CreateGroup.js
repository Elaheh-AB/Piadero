import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

import { useNavigate } from "react-router-dom";
const createGroup = () => {
  const { isAuthenticated, loginWithRedirect, getIdTokenClaims,user} = useAuth0();
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  let navigate = useNavigate();
const handleCreateGroup=async (e)=>{
  e.preventDefault();
  console.log(name,desc,city,user.sub+"test");
  await fetch("/add-group", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({name:name,desc:desc,city:city,sub:user.sub}),
  }) .then((res) => res.json())
  .then((json) => {
    console.log(Object.keys(json) + "json");
    if (json.message === "group added") {
     
      navigate("/groups");
    } else if (json.message === "can't add group") {
      alert("Your group is not created");
    }
   
  })
    .catch((err) => {
     
      return console.log(err);
    });
}
  return (
    <>
      <Navbar></Navbar>
      <Wrapper>
        {isAuthenticated && (
          <>
            <form>
            <div>
              <h2>New Group</h2>
              <p>Please fill in this form to create your new group.</p>
              <label for="groupName">
                <b>Group name</b>
              </label>
              <input
                type="text"
                placeholder="Enter group name"
                name="groupName"
                id="groupName"
                onChange={(e)=>setName(e.target.value)}
                required
              />
<br></br>
              <label for="desc">
                <b>Description</b>
              </label>
              <input
                type="text"
                placeholder="Enter your group description"
                name="desc"
                id="desc"
                onChange={(e)=>setDesc(e.target.value)}
                required
              />
<br></br>
<label for="city">
                <b>City</b>
              </label>
              <select
              id="selectedCity"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                
              }}
            >
              <option value="" disabled selected hidden>
                Select your group city
              </option>
              <option value="Montreal">Montreal</option>
              <option value="Toronto">Toronto</option>
              <option value="Vancouver">Vancouver</option>
            </select>
             
              <button type="submit" onClick={handleCreateGroup} >
              Create new Group
              </button>
             
                <p>
                  <a href="/groups"> My groups</a>.
                </p>
              </div>
            </form>
          </>
        )}
      </Wrapper>
    </>
  );
};
export default createGroup;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  overflow: hidden;
 
  a {
    float: none;
    display: block;
    text-align: left;
    color: dodgerblue;
    font-size: smaller;
  }
  
  h2{
    padding: 8px;
  }

  div {
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
    margin: 25px;
    padding: 25px;
    width: 470px;
  }
  p{
    padding: 8px;
  }
  label{
       
       padding-left: 8px;
       }
`;
