import axios from "axios";

// TODO: Make this be loaded from one place
// const API_URL = "http://localhost:3000/api/auth/";
const API_URL = "http://localhost:8081/api/v1/content/";

// TODO: This is not a user.service but a content.service
const getPublicContent = () => {
   return axios.get(API_URL + "all");
};

// TODO: Rename the 'Board' in 'Page'
const getUserBoard = () => {
   return axios.get(API_URL + "user");
};

// TODO: Rename the 'Board' in 'Page'
const getModeratorBoard = () => {
   return axios.get(API_URL + "mod");
};

// TODO: Rename the 'Board' in 'Page'
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
