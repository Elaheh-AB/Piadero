import styled from "styled-components";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Time = ({ time,temp }) => {
  
const [ideal,setIdeal]=useState(false);

useEffect(()=>{
    if(parseInt(temp)>=19 && parseInt(temp)<=27){
        setIdeal(true);
    }
},[])
const handleChoose=(e)=>{
    e.preventDefault();
   // myBtn.classList.add("pressed")
    //myBtn.setAttribute('aria-pressed', e.target.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
}


  return (
    <>
         
      <Button type={ideal}  id="btn"  onClick={handleChoose}>
            <span>
             
              <p>{time}</p>
              <b> <p>{temp}</p></b>
            </span>
            <FriendBadge src="\logo.png" ></FriendBadge>
          </Button>
     
    </>
  );
};

const Button = styled.button`
position: relative;
  border: none;
  margin: 5px;
padding:5px;
padding-bottom:15px;
display:flex;
font-size: smaller;

   
    :focus {     
       // background-color:yellow;
     }
.span{
  
    flex-grow: 1;
  width:50%;
}

background: ${({type}) => (type===true ? '#44D62C;' : 'transparent')};

 
`;
const FriendBadge=styled.img`
position: absolute;
margin-top: 25px;
width: 20px;
z-index: 2;
`;

export default Time;
