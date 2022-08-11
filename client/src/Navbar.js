import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButon";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
 


  return (
    
    <Wrapper>
    
    <WrapperFirstSection>
      <NavigationLinkLogo to="/">
        <img src="\logo.png" alt="logo - return home page" />
      </NavigationLinkLogo>
      <NavigationLink to="/groups">My Groups</NavigationLink>
      <WrapperCategories>
        <ButtonCategories to="/settings">Settings</ButtonCategories>
        <DropdownContent className="dropdown-content">
          {/* Fake endpoint only for design purpose*/}
          <NavigationLink to="/settings/A">A</NavigationLink>
          <NavigationLink to="/settings/B">B</NavigationLink>
          <NavigationLink to="/settings/C">C</NavigationLink>
         
        </DropdownContent>
      </WrapperCategories>
    </WrapperFirstSection>

    <WrapperSecondSection>
     
     
     
      {isAuthenticated ? (<>
        
    <NavigationLink to="/profile"><h4>Hello {user.name}</h4></NavigationLink>
   
   <LogoutButton/> </>
)
:  <LoginButton/>
      }
    </WrapperSecondSection>
  </Wrapper>
);
};

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

height: var(--header-height);
overflow: hidden;
background: white;
padding: 15px;
`;

const WrapperFirstSection = styled.div`
display: flex;
//flex-wrap: nowrap;
align-content: center;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const WrapperSecondSection = styled.div`
display: flex;
//flex-wrap: nowrap;
align-content: flex-end;
justify-content: flex-end;
align-items:center;
flex-direction: row;
flex-basis:50%;
`;


const WrapperCategories = styled.div`
float: left;
overflow: hidden;

a {
  float: none;
  display: block;
  text-align: left;
}
`;

const DropdownContent = styled.div`
display: none;
position: absolute;
min-width: 160px;
z-index: 1;
box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
  rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
background: white;
:hover {
  display: block !important;
}
`;
const ButtonCategories = styled.button`
outline: none;
:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
  background: none;
  outline: none;
}

:hover + .dropdown-content {
  display: block;
}
`;

const NavigationLink = styled(NavLink)`

`;
const NavigationLinkLogo = styled(NavLink)`
background: transparent !important;

img {
  
  width: 50px
}
`;
    


export default Navbar;