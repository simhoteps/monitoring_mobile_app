import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/base/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
  


  //AT FIRST GET PHONE DATA/THEN CHANGE AGAIN GET DATA
  export const getUserPhoneNotifData = createAsyncThunk(
    "main/getUserEmailNotifData",
    async () => {
      const user = await AsyncStorage.getItem("user");
      try {
        if (user !== null) {
          const accessToken = JSON.parse(user);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
          const res = await fetch(`${BASE_URL}/conf/call_notif/`, {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          });
          if (!res.ok) {
            console.log("error");
          }
          const response = await res.json();
      return response
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  //PHONE NOTIFICATION

  export const postPhoneNotif = createAsyncThunk(
    "main/getUserEmailNotifData",
    async ({
        status,
        telno,
      }: {
        status: boolean;
        telno: string;
      },{dispatch}) => {
      const user = await AsyncStorage.getItem("user");
      try {
        if (user !== null) {
          const accessToken = JSON.parse(user);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
  
          fetch(`${BASE_URL}/conf/call_notif/`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
              status: status,
              telno: telno,
            }),
            redirect: "follow",
          })
            .then((response) => response.json())
            .then(() => dispatch(getUserPhoneNotifData()))
            .catch((error) => console.log("error", error));
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
