import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
   if (!value) {
      return (
         <div className="invalid-feedback d-block">
            This field is required!
         </div>
      );
   }
};

const Login = () => {
   const form = useRef();
   const checkBtn = useRef();
 
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState("");
 
   const navigate = useNavigate();
 
   // TODO: Add a callback suffix
   // TODO: const is unnecessary
   // TODO: use a descriptive argument name
   const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
   };

   // TODO: Add a callback suffix
   const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
   };

   console.log("login handler");
   // TODO: Add a callback suffix
   // TODO: Use descriptive argument name
   const handleLogin = (e) => {
      console.log("Calling Auth Service:");
      
      e.preventDefault();
      
      setMessage("");
      setLoading(true);
      
      form.current.validateAll();
      
      console.log(username + " " +password);
      if (checkBtn.current.context._errors.length !== 0) {
         setLoading(false);
         return;
      }

      
      AuthService
         .login(username, password)
         .then( 
            () => {
               console.log("success");
               navigate("/profile");
               window.location.reload();
            },
            (error) => {
               // TODO: Fix this incomprehensible thing
               console.log("fail");
               const resMessage =
                  (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                  error.message ||
                  error.toString();

               setLoading(false);
               setMessage(resMessage);
            }
         );
   };

   return (
      <div className="col-md-12">
         <div className="card card-container">
            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            />
 
            <Form 
               onSubmit={handleLogin} 
               ref={form}
            >
               <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                     type="text"
                     className="form-control"
                     name="username"
                     value={username}
                     onChange={onChangeUsername}
                     validations={[required]}
                  />
               </div>
      
               <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                     type="password"
                     className="form-control"
                     name="password"
                     value={password}
                     onChange={onChangePassword}
                     validations={[required]}
                  />
               </div>
      
               <div className="form-group">
                  <button 
                     className="btn btn-primary btn-block" 
                     disabled={loading}
                  >
                     {
                        loading 
                        && (
                           <span className="spinner-border spinner-border-sm"></span>
                        )
                     }
                     <span>LoginNNN</span>
                  </button>
               </div>
      
               {
                  message 
                  && (
                     <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                           {message}
                        </div>
                     </div>
                  )
               }
               <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
         </div>
      </div>
   );
};

export default Login;
 

