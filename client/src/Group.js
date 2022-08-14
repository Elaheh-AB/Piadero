import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import LoginButton from "./LoginButton";

const Group = ({}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [group, setGroup] = useState([]);
  const[shareUrl,setShareUrl]=useState("");
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
          console.log("There was an error!", error);
        });
    };
    if (isAuthenticated) {
      getGroup();
      setShareUrl(`http://localhost:3001/invite/${groupId}`);
      console.log(`http://localhost:3001/invite/${groupId}`);
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <WrapperCategories>
        <div>
          {isLoading && <h1>loading...</h1>}
          {!isAuthenticated ? (
            <div>
              <h1> Please login to see your groups</h1>
              <LoginButton></LoginButton>
            </div>
          ) : (
            <>
              <h1>{group.name} </h1>
              <Info>
              {group && Array.isArray(group.members)&&group.members.map((member) => {
                console.log(member + "member");
                return (<> 
                  <img src={user.picture} alt={user.name}/>
                <p> {member.name}</p>
               
              
                </>
                );
              })}
            </Info>
<CopyLink>
<label>
                <h4>Invite link </h4>
              </label>
              <br></br>
<label id="link">
                <p>{shareUrl} </p>
              </label>
              <button
                onClick={() => {
                  let copyText = document.getElementById("link");
                  //Copy the text inside the text field
                  navigator.clipboard.writeText(copyText.textContent);
                }} 
              >
                Copy
              </button>
</CopyLink>
             
            </>
          )}
          {isAuthenticated && (
            <button onClick={() => navigate("/creatgroup")}>
              Create new group
            </button>
          )}
        </div>
      </WrapperCategories>
    </>
  );
};

export default Group;
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
   // margin: 25px;
   // padding: 25px;
    width: 470px;
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
const Info = styled.span`
margin: 0px;
padding:0px;
display:flex;
flex: 60%;
 img{
  border-radius: 50%;
  width: 30px;
 }
`;