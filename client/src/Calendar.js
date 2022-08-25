import styled from "styled-components";
import React from "react";
import { useContext, useEffect,useState } from "react";
import { TimeContext } from "./TimeContext";
import Time from "./Time";
import { useAuth0 } from "@auth0/auth0-react";
 const Calendar = ({city,selectedSlots}) => {
  console.log(selectedSlots+"ssssssssss")
    const [select,setSelect]=useState("false");
   // const[selectedSlots,setSelectedSlots]=useState([]);
   const {
    state: { cnt, forecast, hasLoaded },
    actions: { receiveForecastInfoFromServer },
  } = useContext(TimeContext);

  const { user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    const getForcast =   () => {
      
      fetch(`/forecast/${city}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(Object.keys(data)+"forecast")
            receiveForecastInfoFromServer({forecast:data.forecast},{cnt:data.cnt},{hasLoaded:true});
        })
        .catch((error) => {
          console.log("There was an error!", error);
        });

       
       
    };
   
   
         
    if (isAuthenticated) {
      getForcast();
     
    }
  }, []);
  
 
  return (
    <Wrapper>
      {!hasLoaded  ? (
       <h1>Loading...</h1>
      ) : (
        
     forecast  &&   forecast.map((slot) => {
      selectedSlots.forEach((sslot)=>{
      
          if(sslot.date===slot.time){
            console.log(sslot.walkers+"ss"+slot.time)
            sslot.walkers.map((member)=>{
              if(member.walkerId===user.sub){
                slot.selected="true";
              }
                          })
           
            slot.members=sslot.walkers;
          }

      })
         
        return (
          <>
          <TimeWrapper  onClick={((e)=>{e.currentTarget.classList.toggle('selected');
        // slot.selected==="true"?slot.selected="false" :slot.selected="true";
         if(slot.selected==="true"){
          slot.selected="false"
          setSelect(!select);
         }else{
          slot.selected="true";
          setSelect(!select);
         }
         console.log(Object.values(slot));
        // setSelect(slot.selected);
          })} >
            <Time
              
              time={slot.time}
             temp={slot.temp}
             icon={slot.icon}
             selected={slot.selected}
             members={slot.members}
            />
          </TimeWrapper>


</>
        );
      })
        
           
          
              
        
        )}
       
    </Wrapper>
  );
};

const Wrapper = styled.span`
 display: flex;
  flex-wrap: wrap;
justify-content: space-between;
 // background: #eee;
 // border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
 button{
  flex-direction: column;
 }
`;
const TimeWrapper = styled.span`
padding: 5px;
flex-grow: 1;
  width: 33%;
 
`;

export default Calendar;
