import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import LoginButton from "./LoginButton";

const Invite = ({}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [group, setGroup] = useState([]);
  const [shareUrl, setShareUrl] = useState("");
  let { groupId } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    const getGroup = () => {
      fetch(`/mygroups/${groupId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(Object.keys(data) + "data");
          setGroup(data.group);
        })
        .catch((error) => {
          alert("This invite link is not valid error: " + error);
        });
    };
    if (isAuthenticated) {
      getGroup();
    }
  }, [isAuthenticated]);
  const handleAccept = async (e) => {
    e.preventDefault();
    await fetch(`/add-member`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      }, body: JSON.stringify({sub:user.sub,groupId:groupId,picture:user.picture,name:user.name}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "member added") {
          console.log(Object.keys(data) + "data");
          navigate("/groups");
        } else {
          if (data.message === "member already exists") {
            alert("You are already a member");
          } else {
            alert("Your invite link is not valid");
          }
        }
      })
      .catch((error) => {
        alert("This invite link is not valid error: " + error);
      });
  };
  return (
    <>
      <Navbar></Navbar>
      <WrapperCategories>
        <div>
          {isLoading && <h1>loading...</h1>}
          {!isAuthenticated ? (
            <>
              <h1> Please login first</h1>
              <LoginButton></LoginButton>
            </>
          ) : (
            <>
              <h1>you are invited to join {group.name} </h1>
              <button onClick={handleAccept}>Accept</button>
            </>
          )}
        </div>
      </WrapperCategories>
    </>
  );
};

export default Invite;
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
  @media (max-width: 900px) {
    
    div{
      width: 98vw;
    }
    
      }
`;

const GroupsWrapper = styled.div`
  background-color: aliceblue;
`;
const CopyLink = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  margin: 8px;
  padding-left: 5px;
  border-radius: 5px;
`;
