import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/base/BaseUrl";

export const getCustomer = createAsyncThunk(
    "main/getCustomer",
    async (_, { rejectWithValue }) => {
      const user = await AsyncStorage.getItem("user");
  
      try {
        if (user !== null) {
          const accessToken = JSON.parse(user);
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
          const res = await fetch(`${BASE_URL}/conf/1/perms/`, {
            method: "GET",
            headers: myHeaders,
          });
          if (!res.ok) {
            console.log("Cannot load permissions data");
            return rejectWithValue("Cannot load customers data");
          } else {
            const response = await res.json();
            return response;
          }
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );