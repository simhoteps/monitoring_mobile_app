import React from "react";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAlertsType } from "../types";

//BASE URL ADRESS
const BASE_URL = "https://apis.monitorpark.net";

export interface AlertState {
  alertsLoading: boolean;
  alerts: IAlertsType[];
  totalAlerts: number;
}

const initialState: AlertState = {
  alertsLoading: false,
  alerts: [],
  totalAlerts: 0,
};

export const fetchGet = async (url: string) => {
  const user = await AsyncStorage.getItem("user");
  try {
    if (user !== null) {
      const accessToken = JSON.parse(user);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
      const data = await fetch(url, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      })
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });

      return data;
    }
  } catch (error) {}
};

export const getAlertDatas = createAsyncThunk(
  "getAlertsList",
  async (url: string, { rejectWithValue }) => {
    const user = await AsyncStorage.getItem("user");
    try {
      if (user !== null) {
        const accessToken = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
        const data = await fetch(url, {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        })
          .then((response) => response.json())
          .catch((error) => {
            rejectWithValue(error);
          });

        return data;
      }
    } catch (error) {}
  }
);

/* export const getAlerts = createAsyncThunk(
  "getAlerts",
  async ({
    customer_id,
    currentPage,
  }: {
    customer_id: number;
    currentPage: number;
  }) => {
    console.log("first");
    const user = await AsyncStorage.getItem("user");
    try {
      if (user !== null) {
        const accessToken = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
        const res = await fetch(
          `https://apis.monitorpark.net/customer/${customer_id}/alerts/?page=${currentPage}`,
          {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          }
        );
        if (!res.ok) {
          console.log("Alert hata");
        } else {
          const response = await res.json();
          return response.alerts.sort(function (a: any, b: any) {
            return a.createTime > b.createTime
              ? -1
              : a.createTime > b.createTime
              ? 1
              : 0;
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
 */
export const AlertSlice = createSlice({
  name: "alert",
  initialState,
  extraReducers: (builder) => {
    /*   builder.addCase(getAlertDatas.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.alerts = action.payload;
        state.alertsLoading = false;
      }
    });
    builder.addCase(getAlertDatas.rejected, (state, action) => {
      state.alertsLoading = true;
    }); */
    builder.addCase(getAlertDatas.pending, (state, action) => {
      state.alertsLoading = true;
    });
    builder.addCase(getAlertDatas.fulfilled, (state, action) => {
      if (action.payload !== undefined && action.payload.alerts !== undefined) {
        const sortedData = action.payload.alerts.sort(function (
          a: any,
          b: any
        ) {
          return a.createTime > b.createTime
            ? -1
            : a.createTime > b.createTime
            ? 1
            : 0;
        });
        state.totalAlerts = action.payload.total;
        state.alerts = sortedData;

        state.alertsLoading = false;
      }
    });
  },
  reducers: {},
});

export const {} = AlertSlice.actions;

export default AlertSlice.reducer;
