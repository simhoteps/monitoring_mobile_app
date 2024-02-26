import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/base/BaseUrl";
import { setNofitData } from "../slice/MainSlice";

//GET NOTIFICATIONS DATA FUNC.
export const getNotificationsData = createAsyncThunk(
    "main/getNewAccessToken",
    async (_, { rejectWithValue, dispatch }) => {
      const user = await AsyncStorage.getItem("user");
      try {
        if (user !== null) {
          const accessToken = JSON.parse(user);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
          const res = await fetch(`${BASE_URL}/user/1/notifications/`, {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          });
  
          if (!res.ok) {
            console.log("noficitaions get error");
            rejectWithValue("noficitaions get error");
          } else {
            const response = await res.json();
  
            return dispatch(setNofitData(response)) 
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  );  