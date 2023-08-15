import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "./store";

interface UserInfo {
  email: string;
  isAdmin: boolean;
  name: string;
  token: string;
}
export interface loginState {
  loading: boolean;
  userInfo: UserInfo | null;
  error: string | null;
  errorLogout: string | null;
}

let userInfoLocalStorage: UserInfo | null = null; // Initialize with null

const storedUserInfo = localStorage.getItem("userInformation");

if (storedUserInfo !== null) {
  try {
    userInfoLocalStorage = JSON.parse(storedUserInfo);
  } catch (error) {
    console.error("Error parsing stored user information:", error);
  }
}
const initialState: loginState = {
  userInfo: userInfoLocalStorage,
  loading: false,
  error: null,
  errorLogout: null,
};
const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<UserInfo>) {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.userInfo = null;
      state.errorLogout = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, deleteUser } =
  userSlice.actions;
export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(loginRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const {
        data: { data },
      } = await axios.post(
        "https://darwich.onrender.com/api/users/login",
        {
          email,
          password,
        },
        config
      );
      //dispatching login success
      dispatch(loginSuccess(data));
      //storing to local storage
      localStorage.setItem(
        "userInformation",
        JSON.stringify(getState().login.userInfo)
      );
    } catch (error: any) {
      if (error && error.response) {
        dispatch(loginFail(error.response.data.message));
      } else {
        dispatch(loginFail("An error occurred."));
      }
    }
  };
};
export const logout = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await axios.get(
        "https://darwich.onrender.com/api/users/logout"
      );
      if (res.status === 200) {
        dispatch(deleteUser("successfully, logout!"));
        localStorage.setItem(
          "userInformation",
          JSON.stringify(getState().login.userInfo)
        );
      }
    } catch (error: any) {
      if (error && error.response) {
        dispatch(loginFail(error.response.data.message));
      } else {
        dispatch(loginFail("An error occurred."));
      }
    }
  };
};
export default userSlice.reducer;
