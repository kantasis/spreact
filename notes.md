https://www.bezkoder.com/react-spring-boot-mongodb/
# TODO:
Check useEffect
Check useRef
# Initialize deployment
```bash

# Run the init script
docker exec -it \
   spreact_spring_container \
   bash


```


```sql
INSERT INTO ROLES_TBL(LABEL) VALUES('ROLE_USER');
INSERT INTO ROLES_TBL(LABEL) VALUES('ROLE_MODERATOR');
INSERT INTO ROLES_TBL(LABEL) VALUES('ROLE_ADMIN');

select * from ROLES_TBL;

```

register
```json
{
   "username": "george",
   "email": "asdf@asdf.com",
   "password": "1234567",
   "role": ["user"]
}

```





##
https://medium.com/@ak123aryan/how-and-where-you-can-use-preauthorize-annotation-springboot-048751193b6f
This dude said that I can use @EnableMethodSecurity in the main class of my application

```java
@SpringBootApplication
@EnableMethodSecurity
public class StackApplication {
   public static void main(String[] args) {
      SpringApplication.run(StackApplication.class, args);
   }
}
```

Or use something like this
```java

@Controller
public class ResourceController {

    @GetMapping("/resource/{resourceId}")
    @PreAuthorize("@mySecurityService.isResourceOwner(authentication, #resourceId, ..anyOtherParametersIFpresent)")
    public String getResource(@PathVariable String resourceId) {
        // Your code here
        return "resource";
    }
}


@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER') and @mySecurityService.isResourceOwner(authentication, #resourceId)")
```

hasAnyRole instead of hasRole

For more on how @PreAuthorize and @PostAuthorize annotations work see:
https://www.baeldung.com/spring-security-method-security
https://www.baeldung.com/spring-expression-language

@PreAuthorize("#username == authentication.principal.username")


george=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW9yZ2UiLCJpYXQiOjE3MTYxMTgyODUsImV4cCI6MTcxNjIwNDY4NX0.yw5vynV2iO3nyJI4K1a0KJfQqSrPLAH75kT7lysXfpo; Path=/api; HttpOnly; Expires=Mon, 20 May 2024 11:31:24 GMT;

george=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW9yZ2UiLCJpYXQiOjE3MTYxMTgyODUsImV4cCI6MTcxNjIwNDY4NX0.yw5vynV2iO3nyJI4K1a0KJfQqSrPLAH75kT7lysXfpo; Path=/api; HttpOnly; Expires=Mon, 20 May 2024 11:31:24 GMT;

george=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW9yZ2UiLCJpYXQiOjE3MTYxMTgyODUsImV4cCI6MTcxNjIwNDY4NX0.yw5vynV2iO3nyJI4K1a0KJfQqSrPLAH75kT7lysXfpo

eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW9yZ2UiLCJpYXQiOjE3MTYxMTgyODUsImV4cCI6MTcxNjIwNDY4NX0.yw5vynV2iO3nyJI4K1a0KJfQqSrPLAH75kT7lysXfpo

## React

Initialization of a react project
```bash
docker exec -it \
   spreact_ubuntu_container \
   bash

cd /app
npm create vite@latest spreact_react_app -- --template react-ts
cd spreact_react_app
# Lovely bootstrap
npm install bootstrap
# Lib for requests
npm install axios
npm install @types/react-router-dom
npm install react-router-dom
npm install http-proxy-middleware
# Library for form validation
npm install react-validation validator
npm install formik yup




npm install react-auth-kit
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome@latest

sudo chown george:george -R *

npm install

npm run dev -- --host 0.0.0.0

```



# React.js Login & Registration example – JWT & HttpOnly Cookie
https://www.bezkoder.com/react-login-example-jwt-hooks/

## Add React Router
npm install react-router-dom
```tsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
```

## Import Bootstrap
npm install bootstrap@4.6.0
```tsx
// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";

```

## Setup Proxy

npm install http-proxy-middleware
```tsx
// src/setupProxy.js 
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
```

## Create Services
We’re gonna create two services in src/services folder:
- auth.service.js (Authentication)
- user.service.js (Data)

npm install axios

### Authentication service
The service uses `Axios` for `HTTP requests` and `Local Storage` for user information & JWT.

It provides following important functions:

- login(): POST {username, password} & save User Profile to Local Storage
- logout(): POST logout request, remove User Profile from Local Storage
- register(): POST {username, email, password}
- getCurrentUser(): get stored user information

services/auth.service.js
```js
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (username, email, password) => {
   return axios.post(
      API_URL + "signup", 
      {
         username,
         email,
         password,
      }
   );
};

const login = (username, password) => {
   return axios
      .post(
         API_URL + "signin", 
         {
            username,
            password,
         }
      )
      .then((response) => {
         if (response.data.username) {
            localStorage.setItem("user", JSON.stringify(response.data));
         }

         return response.data;
      });
};

const logout = () => {
   localStorage.removeItem("user");
   return axios
      .post(API_URL + "signout")
      .then((response) => {
         return response.data;
      });
};

const getCurrentUser = () => {
   return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
   register,
   login,
   logout,
   getCurrentUser,
}

export default AuthService;

```

### Data service
Because HttpOnly Cookies will be automatically sent along with HTTP requests, so we just simply use Axios without caring JWT.

services/user.service.js
```js
import axios from "axios";

const API_URL = "http://localhost:3000/api/test/";

const getPublicContent = () => {
   return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
}

export default UserService;

```

## Create React Pages for Authentication
components 
- Login.js
- Register.js
- Profile.js

npm install react-validation validator

```js
// To use react-validation in this example, you need to import following items:

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";
```


```js
const required = value => {
   if (!value) {
      return (
         <div className="invalid-feedback d-block">
            This field is required!
         </div>
      );
   }
};

const email = value => {
   if (!isEmail(value)) {
      return (
         <div className="invalid-feedback d-block">
            This is not a valid email.
         </div>
      );
   }
};

render() {
  return (
      <Form
         onSubmit={handleLogin}
         ref={form}
      >
         <Input
            type="text"
            className="form-control"
            validations={[required, email]}
         />

         <CheckButton
            style={{ display: "none" }}
            ref={checkBtn}
         />
      </Form>
  );
}
```

And (?)

```js
form.validateAll();

if (checkBtn.context._errors.length === 0) {
   // do something when no error
}
```

## Login page:
call AuthService.login() method, then direct user to Profile page: props.history.push("/profile");, or show message with response error.
components/Login.js
```js
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

   const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
   };

   const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
   };

   const handleLogin = (e) => {
      e.preventDefault();

      setMessage("");
      setLoading(true);

      form.current.validateAll();

      if (checkBtn.current.context._errors.length !== 0) {
         setLoading(false);
         return;
      }

      AuthService
         .login(username, password)
         .then(
            () => {
               navigate("/profile");
               window.location.reload();
            },
            (error) => {
               const resMessage =
                  (
                     error.response &&
                     error.response.data &&
                     error.response.data.message
                  ) ||
                  error.message ||
                  error.toString()
               ;

               setLoading(false);
               setMessage(resMessage);
            }
         )
      ;
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
                     <span>Login</span>
                  </button>
               </div>

               {
                  message
                  && (
                     <div className="form-group">
                        <div 
                           className="alert alert-danger" 
                           role="alert"
                        >
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

```

## Register Page:
components/Register.js
```js
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

// TODO: This is repeated code
const required = (value) => {
   // TODO: This is inconsistent coding style!
   if (!value) {
      return (
         <div className="invalid-feedback d-block">
            This field is required!
         </div>
      );
   }
};

// TODO: This too counts as repeated
const validEmail = (value) => {
   if (!isEmail(value)) {
      return (
         <div className="invalid-feedback d-block">
         This is not a valid email.
         </div>
      );
   }
};

// TODO: Change the function name
// Repeated code
const vusername = (value) => {
   if (value.length < 3 || value.length > 20) {
      return (
         <div className="invalid-feedback d-block">
            The username must be between 3 and 20 characters.
         </div>
      );
   }
};

// TODO: Rename
const vpassword = (value) => {
   if (value.length < 6 || value.length > 40) {
      return (
         <div className="invalid-feedback d-block">
            The password must be between 6 and 40 characters.
         </div>
      );
   }
};

const Register = (props) => {
   const form = useRef();
   const checkBtn = useRef();

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState("");

   const onChangeUsername = (e) => {
      // TODO: Redundant constant
      const username = e.target.value;
      setUsername(username);
   };

   const onChangeEmail = (e) => {
      // TODO: Redundant constant
      const email = e.target.value;
      setEmail(email);
   };

   const onChangePassword = (e) => {
      // TODO: Redundant constant
      const password = e.target.value;
      setPassword(password);
   };

   const handleRegister = (e) => {
      e.preventDefault();

      setMessage("");
      setSuccessful(false);

      form.current.validateAll();

      // TODO: Make this into a guard clause:
      if (checkBtn.current.context._errors.length !== 0) 
         return;

      AuthService
         .register(username, email, password)
         .then( 
            (response) => {
               setMessage(response.data.message);
               setSuccessful(true);
            },
            // TODO: Repeated function
            (error) => {
               const resMessage =
                  (
                     error.response &&
                     error.response.data &&
                     error.response.data.message
                  ) ||
                  error.message ||
                  error.toString()
               ;

               setMessage(resMessage);
               setSuccessful(false);
            }
         )
      ;
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
               onSubmit={handleRegister} 
               ref={form}
            >
               {
                  !successful 
                  && (
                     <div>
                        <div className="form-group">
                           <label htmlFor="username">Username</label>
                           <Input
                              type="text"
                              className="form-control"
                              name="username"
                              value={username}
                              onChange={onChangeUsername}
                              validations={[required, vusername]}
                           />
                        </div>

                        <div className="form-group">
                           <label htmlFor="email">Email</label>
                           <Input
                              type="text"
                              className="form-control"
                              name="email"
                              value={email}
                              onChange={onChangeEmail}
                              validations={[required, validEmail]}
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
                              validations={[required, vpassword]}
                           />
                        </div>

                        <div className="form-group">
                           <button className="btn btn-primary btn-block">Sign Up</button>
                        </div>
                     </div>
                  )
               }

               {
                  message 
                  && (
                     <div className="form-group">
                        <div
                           className={
                              successful ? "alert alert-success" : "alert alert-danger"
                           }
                           role="alert"
                        >
                           {message}
                        </div>
                     </div>
                  )
               }
               <CheckButton 
                  style={{ display: "none" }} 
                  ref={checkBtn} 
               />
            </Form>
         </div>
      </div>
   );
};

export default Register;

```



# SpringBoot - React - JWT - H2 
https://www.bezkoder.com/spring-boot-security-login-jwt/


# General

```bash
docker exec -it \
   spreact_spring_container \
   bash

docker exec -it \
   spreact_ubuntu_container \
   bash

docker restart spreact_spring_container 
docker logs --follow spreact_spring_container 
```



Ongoing:
```bash
npm install http-proxy-middleware


```


```tsx

   const user_json = localStorage.getItem("user");

   let user_dict = null;
   if (user_json)
      user_dict = JSON.parse(user_json);

getCurrentUser()
{
   "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW9yZ2UiLCJpYXQiOjE3MTYzNzI1ODcsImV4cCI6MTcxNjQ1ODk4N30.k-Zp4Fnc7v3ZapVHAZO6gVeCx621fqO7YjdoSEO_yi4",
   "type": "Bearer",
   "id": 1,
   "username": "george",
   "email": "asdf@asdf.com",
   "roles": [
      "ROLE_USER"
   ]
}
```





