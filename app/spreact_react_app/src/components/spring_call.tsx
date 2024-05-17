import axios from "axios";
import { useState } from "react";
// // Reference: https://www.bezkoder.com/axios-request/
// export default axios.create({
//    // TODO: I smell envars are needed here
//    baseURL: "http://localhost:8080/api",
//    headers: {
//       "Content-type": "application/json"
// "access-control-allow-origins": "http://localhost:8082",

//    }
// });

function Spring_Data(){

   // axios.get('http://localhost:8081/hello')
   // .then(function (response) {
   //    console.log(response.data);
   // });

   const [springResponse_str, setSpringResponse] = useState("No response yet");

   fetch(
      "http://localhost:8081/hello"
   ).then( response => {
      // console.log("Response: " + typeof(response))
      // console.log("text: " + typeof(response.text()))
      return response.text()
   }).then( text => {
      console.log("text: " + text)
      setSpringResponse(text);
   })

   // const { data } = await axios.get(url);

   return (
      <div>
         {springResponse_str}
      </div>
   )
}

export default Spring_Data;