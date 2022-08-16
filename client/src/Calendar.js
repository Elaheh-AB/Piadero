import styled from "styled-components";
import React from "react";
import { useContext, useEffect,useState } from "react";
import { TimeContext } from "./TimeContext";
import Time from "./Time";
import { useAuth0 } from "@auth0/auth0-react";
 const Calendar = ({city}) => {
  
    const [isActive, setIsActive] = useState(false);

    const handleClick = event => {
      // 👇️ toggle isActive state on click
      event.currentTarget.classList.toggle('pressed');
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
        console.log(city,forecast+"cf");
    };
    if (isAuthenticated) {
      getForcast();
    }
  }, []);
  return (
    <Wrapper>
      {!hasLoaded ? (
       <h1>Loading...</h1>
      ) : (
     forecast &&   forecast.map((slot) => {
                return (
                  <TimeWrapper id="tb"  onClick={handleClick}>
                    <Time
                      
                      time={slot.time}
                     temp={slot.temp}
                    />
                  </TimeWrapper>
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
 
`;
const TimeWrapper = styled.span`
padding: 5px;
flex-grow: 1;
  width: 33%;
  && .pressed{
    border: 3px solid yellow;
        background-color:yellow;
    top: 2px;
  left: 1px;
  box-shadow: none;
     }
`;

export default Calendar;
