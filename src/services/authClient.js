import axios from "axios";

const authClient = axios.create({
  baseURL: "https://authentication-system-djoser.vercel.app",
});

export default authClient;
