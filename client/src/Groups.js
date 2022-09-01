import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import Group from "./Group";

const Groups = () => {
  const request = require("request-promise");

  const { user, isAuthenticated, isLoading } = useAuth0();

  const [groups, setGroups] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const getGroups = () => {
      fetch(`/groups/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setGroups(data.groups);
        })
        .catch((error) => {
          console.log("There was an error!", error);
        });
    };
    if (isAuthenticated) {
      getGroups();
    }
  }, [isLoading]);

  return (
    <>
      <Navbar></Navbar>
      <WrapperCategories>
        <div>
          {isLoading ? (
            <h1>loading...</h1>
          ) : (
            <>
              {!isAuthenticated ? (
                <>
                  <h1> Please login to see your groups</h1>
                  <LoginButton></LoginButton>
                </>
              ) : (
                groups.map((group) => {
                  return (
                    <button onClick={() => navigate(`/groups/${group._id}`)}>
                      {group.name}
                    </button>
                  );
                })
              )}
              {isAuthenticated && groups.length === 0 && (
                <>
                  <h1> You don't have any group yet!!</h1>
                  <button onClick={() => navigate("/creatgroup")}>
                    Create new group
                  </button>
                </>
              )}
              {isAuthenticated && groups.length !== 0 && (
                <>
                  <button onClick={() => navigate("/creatgroup")}>
                    Create new group
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </WrapperCategories>
    </>
  );
};

export default Groups;
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
  h1 {
    padding: 15px;
  }
  div {
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
    margin: 25px;
    padding: 25px;
    width: 35vw;
  }
  @media (min-width: 500px) and (max-width: 900px) {
    
    div{
      width: 70vw;
     
    }
    
      }
      @media (max-width: 500px) {
    
    div{
      width: 98vw;
     
    }
    
      }
`;
