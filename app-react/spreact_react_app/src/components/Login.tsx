import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login, getCurrentUser} from "../services/auth.service";

type Props = {}

// const required = (value) => {
//    if (!value) {
//       return (
//          <div className="invalid-feedback d-block">
//             This field is required!
//          </div>
//       );
//    }
// };

const Login: React.FC<Props> = () => {
   let navigate: NavigateFunction = useNavigate();

   const [loading, setLoading] = useState<boolean>(false);
   const [message, setMessage] = useState<string>("");

   const initialValues: {
      username: string;
      password: string;
   } = {
      username: "",
      password: "",
   };

   const validationSchema = Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
   });


   // TODO: Add a callback suffix
   // TODO: Use descriptive argument name
   const handleLogin = (formValue: { username: string; password: string }) => {

      const { username, password } = formValue;

      setMessage("");
      setLoading(true);

      login(username, password)
         .then(
            () => {
               navigate("/profile");
               window.location.reload();
               // console.log(getCurrentUser());
            },
            (error) => {
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
            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={handleLogin}
            >
               <Form>
                  <div className="form-group">
                     <label htmlFor="username">Username</label>
                     <Field 
                        name="username" 
                        type="text" 
                        className="form-control" 
                     />
                     <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger"
                     />
                  </div>
   
                  <div className="form-group">
                     <label htmlFor="password">Password</label>
                     <Field 
                        name="password" 
                        type="password" 
                        className="form-control" 
                     />
                     <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                     />
                  </div>
      
                  <div className="form-group">
                     <button 
                        type="submit" 
                        className="btn btn-primary btn-block" 
                        disabled={loading}
                     >
                        {
                           loading 
                           && (
                              <span className="spinner-border spinner-border-sm"></span>
                           )
                        }
                        <span>Login</span>
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
               </Form>
            </Formik>
         </div>
      </div>
   );
};

export default Login;

