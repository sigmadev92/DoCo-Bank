import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userUrl } from "../../api/URL";

// inital state

export const fetchUserDetails = createAsyncThunk(
  "fetchUserDetails",
  async () => {
    if (localStorage.getItem("token") === null)
      return {
        status: false,
        userData: null,
      };
    // fetching token
    const response = await axios.get(
      `${userUrl}/get-current-user-details/${localStorage.getItem("token")}`
    );
    console.log(`user slice : user details:`, response);
    console.log(response.data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    userData: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    deleteAuth: (state) => {
      state.loggedIn = false;
      state.userData = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchUserDetails.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.loggedIn = action.payload.status;
        state.userData = action.payload.data;
      }
    });
    builders.addCase(fetchUserDetails.rejected, (state, action) => {
      console.log(state.loggedIn, action);
    });
  },
});

export const { setAuth, deleteAuth } = userSlice.actions;

export default userSlice.reducer;
