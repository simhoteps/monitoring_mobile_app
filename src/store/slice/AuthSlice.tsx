import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React, { useState, useContext } from "react";
import {
  AuthModel,
  ICurrentUserModel,
  IShortUserModel,
  UserModel,
  VerifcationModel,
} from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ICurrentUser {
  email?: string;
  first_name?: string;
  id: number;
  last_name?: string;
  token: string;
  user?: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface AuthState {
  token: string;
  loginLoading: boolean;
  loginMessage: string;
  emailToken: string;
  userAccess: string;
  emailTokenData: string;
  customAuth: AuthModel | undefined;
  user: IShortUserModel;
  currentUser: ICurrentUserModel | undefined;
  verifyStatus: boolean;
  isOpenTokenScreen: boolean;
  authControl: boolean;
  asyncStorageUser: string;
  asyncStorageToken: string;
}

const initialState: AuthState = {
  token: "",
  loginLoading: true,
  loginMessage: "",
  emailToken: "",
  userAccess: "",
  emailTokenData: "",
  customAuth: {} as AuthModel,
  user: {} as IShortUserModel,
  currentUser: {} as ICurrentUserModel,
  verifyStatus: false,
  isOpenTokenScreen: false,
  authControl: false,
  asyncStorageUser: "",
  asyncStorageToken: "",
};

const url = `https://apis.monitorpark.net/api/token/`;

export const fetchHandleLogin = createAsyncThunk(
  "login/fetchHandleLogin",
  async (value: ISignInForm, { rejectWithValue }) => {
    try {
      if (value.email !== "") {
        var formdata = new FormData();
        formdata.append("username", `${value.email}`);
        formdata.append("password", `${value.password}`);

        const response = await fetch(url, {
          method: "POST",
          body: formdata,
        });

        if (!response.ok) {
          return rejectWithValue("Şifre yada mail hatlı olabilir ");
        }

        const result = await response.json();
        return result;
      }
    } catch (error) {
      return rejectWithValue("An error occurred.");
      1;
    }
  }
);

export const postLoginVerified = createAsyncThunk(
  "postLoginVerified",
  async (
    { code, userToken }: { code: string; userToken: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        const accessToken = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
        const raw = JSON.stringify({
          login_code: code,
        });
        const response = await fetch(
          `https://apis.monitorpark.net/conf/verify_login_code/`,
          {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          }
        );

        if (response.ok) {
          const res = await response.json();
          if (res) {
            await AsyncStorage.setItem("emailToken", JSON.stringify(res));
            return res;
          } else {
            return rejectWithValue(
              "Email token is incorrect. Please, check and try again."
            );
          }
        } else {
          return rejectWithValue(
            `Server responded with status: ${response.status}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const AuthSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchHandleLogin.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.loginLoading = false;
        state.verifyStatus = true;
        state.user = action.payload;
        AsyncStorage.setItem("user", JSON.stringify(action.payload));
        state.loginMessage = "";
      }
    });

    builder.addCase(fetchHandleLogin.rejected, (state, action) => {
      state.loginLoading = false;

      state.loginMessage = action.payload as string;
    });
    builder.addCase(postLoginVerified.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.authControl = true;
      }
    });
    builder.addCase(postLoginVerified.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginMessage = action.payload as string;
    });
  },
  reducers: {
    setEmailToken: (state, action: PayloadAction<string>) => {
      state.emailToken = action.payload;
    },
    setUserAccess: (state, action: PayloadAction<string>) => {
      state.userAccess = action.payload;
    },
    setEmailTokenData: (state, action: PayloadAction<any>) => {
      state.emailTokenData = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<ICurrentUserModel>) => {
      state.currentUser = action.payload;
    },
    setUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
    setLoadingVerify: (state, action: PayloadAction<boolean>) => {
      state.verifyStatus = action.payload;
    },
    setOpenTokenScreen: (state, action: PayloadAction<boolean>) => {
      state.isOpenTokenScreen = action.payload;
    },
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authControl = action.payload;
    },
    setAsyncStorageUser: (state, action: PayloadAction<string>) => {
      state.asyncStorageUser = action.payload;
    },
    setAsyncStorageToken: (state, action: PayloadAction<string>) => {
      state.asyncStorageToken = action.payload;
    },
    handleIPcheck: (state) => {
      // Get user's IP address
      const ipAddress = window.location.hostname;

      // Store IP address in session storage
      AsyncStorage.setItem("ipAddress", ipAddress);
    },
    handleVerify: (
      state,
      action: PayloadAction<{ values: VerifcationModel }>
    ) => {},
  },
});

export const {
  setEmailToken,
  setUserAccess,
  setAuthState,
  setLoadingVerify,
  setAsyncStorageToken,
  setAsyncStorageUser,
} = AuthSlice.actions;

export default AuthSlice.reducer;
