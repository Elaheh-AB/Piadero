import { createContext, useReducer } from "react";
import React from "react";
export const TimeContext=createContext();

const initialState = {
    hasLoaded: false,
    forecast: null,
    cnt:0,
  };
  
  const reducer = (state, action) => {
    console.log(action);
  
    switch (action.type) {
         case 'receive-forecast-info-from-server': {
           return {
             ...state,
             hasLoaded: true,
             forecast: action.forecast,//an array of {time: , temp: }
             cnt: action.cnt,
           };
         }
      
         default:
           throw new Error(`Unrecognized action: ${action.type}`);
       }

  }

export const TimeProvider=({children})=>{
    const[state,dispatch]=useReducer(reducer,initialState);
    const receiveForecastInfoFromServer=(data)=>{
        dispatch({
            type: "receive-forecast-info-from-server",
            ...data,
          });
    };

    return (
        <TimeContext.Provider
          value={{
            state,
            actions: {
              receiveForecastInfoFromServer,
            },
          }}
        >
          {children}
        </TimeContext.Provider>
      );
}