import axios from "axios";
import { userUrl } from "./URL";

export const LoginUser = async (FormData) => {
  console.log("Reached login  in basic.js -> frontend api");
  const response = await axios.post(`${userUrl}/login`, FormData);
  console.log(response.data);
  return response.data;
};
