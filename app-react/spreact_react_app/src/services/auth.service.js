import axios from "axios";

// TODO: Make this be loaded from somewhere
// const API_URL = "http://localhost:3000/api/auth/";
const API_URL = "http://localhost:8081/api/v1/auth/";

// Register function
const register = (username, email, password) => {
   return axios
      .post(
         API_URL + "signup", 
         {
            username,
            email,
            password,
         }
      );
};

// Login function
const login = (username, password) => {
   return axios
      .post(
         API_URL + "login", 
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
 
// Logout function logout
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
