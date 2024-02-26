import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/base/BaseUrl";
import { getCustomer } from "./GetCustomer";
import { getNotificationsData } from "./GetNotificationsData";
import { setToken, setUser } from "../slice/MainSlice";


export const getNewAccessToken = createAsyncThunk(
    "main/getNewAccessToken",
    async (_, { rejectWithValue, dispatch }) => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user !== null) {
          const refreshToken = JSON.parse(user);
          const formdata = new FormData();
          formdata.append("refresh", `${refreshToken.refresh}`);
          const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
            method: "POST",
            body: formdata,
            redirect: "follow",
          });
  
          if (!response.ok) {
            throw new Error("Failed to refresh access token");
          }
  
          const result = await response.json();
          const newUser = { ...refreshToken, ...result };
          AsyncStorage.setItem("user", JSON.stringify(newUser));
          dispatch(setUser(newUser));
          dispatch(setToken(newUser.access));
          await dispatch(getCustomer());
          await dispatch(getNotificationsData());
          return newUser;
        }
      } catch (error) {
        console.log("New Access Token Error", error);
      }
    }
  );
  
  