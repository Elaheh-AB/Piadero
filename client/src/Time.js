import styled from "styled-components";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Tippy from "@tippyjs/react";
import "tippy.js/themes/light-border.css";
const Time = ({ time, temp, selected, members, icon }) => {
  //console.log( time,temp,selected+" time,temp,selected")
  const [ideal, setIdeal] = useState("false");
  const [select, setSelect] = useState(selected);
  const { user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    if (parseInt(temp) >= 19 && parseInt(temp) <= 27) {
      setIdeal("true");
    }
  }, []);
  useEffect(() => {
    if (selected === "true") {
      setSelect("true");
    } else {
      setSelect("false");
    }
  }, [selected]);

  const handleChoose = (e) => {
    e.preventDefault();
    // myBtn.classList.add("pressed")
    //myBtn.setAttribute('aria-pressed', e.target.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
  };

  return (
    <>
      <Button type={ideal} selected={select} id={time} onClick={handleChoose}>
        <span>
          <img src={` http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
          <p>{time}</p>
          <b>
            {" "}
            <p>{temp}</p>
          </b>
        </span>
        {members.map((member) => {
          if (member.walkerId !== user.sub) {
            return (
              <>
                <FriendBadge src="\logo.png"></FriendBadge>
              </>
            );
          } else {
          }
        })}
      </Button>
    </>
  );
};

const Button = styled.button`
  position: relative;
  margin: 0px;
  padding: 5px;
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
align-items: center;
  font-size: smaller;
  height: fit-content;
  

  background: ${({ type, selected }) =>
    selected === "true"
      ? "#9a91ee;"
      : type === "true"
      ? "#b2e8a9;"
      : "transparent"};
`;
const FriendBadge = styled.img`
  position: absolute;
  left:10%;
  top:10%;
  width: 20px;
  z-index: 2;
`;

export default Time;
