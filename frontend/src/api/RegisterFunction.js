// // api/RegisterFunction.js
// import { userUrl } from "./URL";
// import axios from "axios";

// export const RegisterUser = async (formData) => {
//   try {
//     const response = await axios.post(`${userUrl}/register`, formData, {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     });
//     console.log("register function : ", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error in RegisterUser:", error);
//     throw error; // rethrow error to handle in handleSubmit
//   }
// };
