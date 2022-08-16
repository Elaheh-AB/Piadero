import styled from "styled-components";
import React from "react";
import { useContext, useEffect,useState } from "react";
import { TimeContext } from "./TimeContext";
import Time from "./Time";
import { useAuth0 } from "@auth0/auth0-react";
 const Calendar = ({city}) => {
  
    const [isActive, setIsActive] = useState(false);
    const [select,setSelect]=useState("false");
    const handleClick = event => {
      // 👇️ toggle isActive state on click
      event.target.classList.toggle('pressed');
    };
   const {
    state: { cnt, forecast, hasLoaded },
    actions: { receiveForecastInfoFromServer },
  } = useContext(TimeContext);

  const { user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    const getForcast = () => {
      
      fetch(`/forecast/${city}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(Object.keys(data)+"forecast")
            receiveForecastInfoFromServer({forecast:data.forecast},{cnt:data.cnt},{hasLoaded:true});
        })
        .catch((error) => {
          console.log("There was an error!", error);
        });
        //console.log(city,forecast+"cf");
    };
    if (isAuthenticated) {
      getForcast();
    }
  }, []);

  const handleChoose = (e) => {
    e.preventDefault();
    // max 4 selected
    if (!e.target.classList.contains("selected")) {
      const selectedCount = forecast.filter((slot) => slot.selected).length;
      if (selectedCount === 4) {
        return;
      }else{
        console.log(selectedCount+"count");
      }
    }
    const currentSlot = document.getElementById(e.target.id);
    console.log(currentSlot.classList+"idatt")
      forecast.map((slot) =>
       
         slot.time === e.target.getAttribute("slot-id")
          ?{ ...slot, selected: !slot.selected }
          : slot
      )
   
  };
  return (
    <Wrapper>
      {!hasLoaded ? (
       <h1>Loading...</h1>
      ) : (
     forecast &&   forecast.map((slot) => {
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
                     selected={slot.selected}
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
