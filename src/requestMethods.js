import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

//const TOKEN =JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser? 
//JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken :"none";
const TOKEN=sessionStorage.getItem("accessToken")
console.log(`${TOKEN}dfggdfgdggfg`)
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${sessionStorage.getItem("accessToken")}` },
});
