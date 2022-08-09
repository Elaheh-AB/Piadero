import React , { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Synch = () => {
  const { isAuthenticated, isLoading,getIdTokenClaims } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const[user,setUser]=useState(null);
 
  const getAuthUser=async()=>{
    await  getIdTokenClaims()
      .then((res)=>{
        console.log(res);
setUser(res);
      })
      .catch((err)=>{
        console.debug('Error fetching access token', err.message)
      })
    }
    const addUser = async () => {
     await fetch("/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(user),
      }) .then((res) => res.json())
      .then((json) => {
        console.log(json + "json");
        if (json.message === "success") {
          localStorage.setItem("currentUserSub", json.sub);
      //    navigate("/");
        } else if (json.message === "user not found") {
          alert("Your name is not registered");
        }
        console.log(json.data.id + "data");
      })
        .catch((err) => {
         
          return console.log(err);
        });
    };
   
    const handleLogin = async()=>{

     
     getAuthUser()
      .then(() => addUser())
     
      .catch((err)=>{
        console.log(err+"err")
      });
 
  return (
    isAuthenticated && (
     {handleLogin}
    )
  );
};}

export default Synch;