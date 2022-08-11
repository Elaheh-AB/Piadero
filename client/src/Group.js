import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useNavigate,useParams  } from "react-router-dom";
import LoginButton from "./LoginButton";

const Group = ({}) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [group, setGroup] = useState([]);
    let { groupId } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        const getGroup = () => {
          fetch(`/mygroups/${groupId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(Object.keys(data)+"data")
              setGroup(data.group);
            })
            .catch((error) => {
              console.log("There was an error!", error);
            });
        };
        if(isAuthenticated){
          getGroup();
        } 
        },[])
 
  return (
    
    <>
    
      <Navbar></Navbar>
      <WrapperCategories>
        <div>
        {isLoading &&  <h1>loading...</h1>}
        {!isAuthenticated ?<div>
        <h1> Please login to see your groups</h1>
            <LoginButton></LoginButton>
        </div>
       :
       <>
       <h1>{group.name} </h1>
       <h1>{group._id} </h1>
       </>
       
}
{isAuthenticated &&  <button onClick={() => navigate("/creatgroup")}>Create new group</button>}
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
    margin: 25px;
    padding: 25px;
    width: 470px;
  }

  
`;

const GroupsWrapper=styled.div`

  
    background-color: aliceblue;
   
`
