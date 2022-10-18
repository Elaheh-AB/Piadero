import React, { useEffect, useState,useContext } from "react";
import { TimeContext } from "./TimeContext";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import LoginButton from "./LoginButton";
import Calendar from "./Calendar";

const Group = ({}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [group, setGroup] = useState([]);
  const[shareUrl,setShareUrl]=useState("");
  const[city,setCity]=useState("");
  const [flag,setFlag]=useState(true);
  const {
    state: { cnt, forecast, hasLoaded },
    actions: { receiveForecastInfoFromServer },
  } = useContext(TimeContext);
  let { groupId } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    const getGroup = () => {
      fetch(`/mygroups/${groupId}`)
        .then((res) => res.json())
        .then((data) => {
          //console.log(Object.keys(data) + "data");
          setGroup(data.group);
          setCity(data.group.city)
        })
        .catch((error) => {
          console.log("There was an error!", error);
        });
    };
    if (isAuthenticated) {
      getGroup();
      setShareUrl(`http://localhost:3000/invite/${groupId}`);
     // console.log(`http://localhost:3001/invite/${groupId}`);
    }
  }, []);
    const[selectedSlots,setSelectedSlots]=useState([]);
    useEffect(() => {    
      const getSelectedStlots=()=>{
         
        fetch(`/walkers/${groupId}`)
          .then((res) => res.json())
          .then((data) => {
             // console.log(Object.keys(data.walkers)+"walkersslot")
              setSelectedSlots(data.walkers);
          })
          .catch((error) => {
            console.log("There was an error!", error);
          });
       
      };
      if (isAuthenticated) {
       
        getSelectedStlots();
      }
    }, []);
const handleSelectedTime=async(e)=>{
 
  const selected=forecast.filter((slot)=>{
return slot.selected==="true";
  })
  e.preventDefault();
  console.log(selected);
  selected.map((slot)=>{
     fetch("/add-walker", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({walkerName:user.name,walkerId:user.sub,groupId:groupId,date:slot.time}),
    }) .then((res) => res.json())
    .then((json) => {
      console.log(Object.keys(json) + "json");
      if (json.message === "walker added") {
        console.log(json.message+"msg")
       // alert("Your intrest saved Successfuly");
      setFlag(true)
      } else if (json.message === "can't add walker") {
       // alert("there is a problem please try again");
       setFlag(false);
      }
     
    })
      .catch((err) => {
       
        return console.log(err);
      });
  
  }
  
  )
  if(flag){
    alert("Your intrest saved Successfuly");
   }else{
    alert("there is a problem please try again");
   }
}
  return (
    <>
      <Navbar></Navbar>
      <WrapperCategories>
       
          {isLoading && <h1>loading...</h1>}
          {!isAuthenticated ? (
            <div>
              <h1> Please login to see your groups</h1>
              <LoginButton></LoginButton>
            </div>
            
          ) : (
            <>
             <div>
              <h1>{group.name} </h1>
             
              <Info>
              {group && Array.isArray(group.members)&&group.members.map((member) => {
               
                return (<> 
                 
               
                <TooltipCard>
        <TooltipText>
        <img src={user.picture} alt={user.name}/>
        </TooltipText>
        <TooltipBox>
        <p> {member.name}</p>
         
        </TooltipBox>
      </TooltipCard>
               <br></br>
              
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
</div>
            </>
          )}
          {isAuthenticated && (
            <>
<div>
  <h2>Select your prefered time slot</h2>
<CalWrapp>
{city &&   <Calendar city={city} selectedSlots={selectedSlots}></Calendar>}

</CalWrapp>

{forecast &&   <button onClick={handleSelectedTime}>
Save
</button>}
</div>
<div>
            <button onClick={() => navigate("/creatgroup")}>
              Create new group
            </button>
            </div>
            </>  )}
        
        
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
 // margin: 15px;
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
    flex-grow: 1;
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


const CopyLink = styled.span`
display: inline-flex;
align-items: center;
justify-content: space-between;
border: 1px solid black;
margin: 5px;
padding: 5px;
border-radius: 5px;
flex-direction: column;

`;
const Info = styled.span`
margin: 0px;
padding:0px;
display: flex;
justify-content: center;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 2em;
flex: 60%;
 img{
  border-radius: 50%;
  width: 30px;
 }

 
`;
const CalWrapp = styled.span`
display: flex;
justify-content: center;
 
`;
const TooltipText = styled.span`
  color: #fff;
  width: 200px;
  text-align: center;
  line-height: 44px;
  border-radius: 3px;
  cursor: pointer;
`;
const TooltipBox = styled.span`
  position: absolute;
  top: calc(100% + 5px);
  left: 2px;
  visibility: hidden;
  color: transparent;
  background-color: transparent;
  width: fit-content;
  padding: 5px 5px;
  border-radius: 4px;

  transition: visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s,
    padding 0.5s ease-in-out;

  &:before {
    content: "";
    width: 0;
    height: 0;
    left: 7px;
    top: -6px;
    position: absolute;

    border: 6px solid transparent;
    transform: rotate(135deg);
    transition: border 0.3s ease-in-out;
  }
`;
const TooltipCard = styled.span`
  position: relative;
  & ${TooltipText}:hover + ${TooltipBox} {
    visibility: visible;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    width:fit-content;
    padding: 8px 8px;

    &:before {
      border-color: transparent transparent rgba(0, 0, 0, 0.8)
        rgba(0, 0, 0, 0.8);
    }
  }
`;