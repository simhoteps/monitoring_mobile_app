import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  ICustomer,
  INotifData,
  IPermmissionsData,
  IShortUserModel,
} from "../types";
import { getCustomer } from "../actions/GetCustomer";
import { getNotificationsData } from "../actions/GetNotificationsData";
import { getUserEmailNotifData } from "../actions/EmailNotification";

export interface DashboardState {
  showSplashScreen: boolean;
  navigateLanding: boolean;
  permissionsData: IPermmissionsData[];
  companies: ICustomer[];
  selectCompany: ICustomer;
  nofitData: INotifData[];
  emailNotifications: string;
  defaultPhoneNum: { status: boolean; telno: string };
  token: string;
  user: IShortUserModel;
}

const initialState: DashboardState = {
  showSplashScreen: true,
  navigateLanding: false,
  permissionsData: [],
  companies: [],
  selectCompany: { label: "", value: 0 },
  nofitData: [],
  emailNotifications: "",
  defaultPhoneNum: {
    status: false,
    telno: "",
  },
  token: "",
  user: { id: 0 },
};

export const MainSlice = createSlice({
  name: "main",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.permissionsData = action.payload;
        state.companies = action.payload.map((item: any) => {
          return { label: item.customer_name, value: item.customer_id };
        });
        if (state.selectCompany.label === "") {
          state.selectCompany = state.companies[0];
        }
      }
    });
    builder.addCase(getUserEmailNotifData.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.emailNotifications = action.payload;
      }
    });
  },
  reducers: {
    setShowSplashScreen: (state, action: PayloadAction<boolean>) => {
      state.showSplashScreen = action.payload;
    },
    setNavigateLanding: (state, action: PayloadAction<boolean>) => {
      state.navigateLanding = action.payload;
    },
    setPermissionsData: (state, action: PayloadAction<IPermmissionsData[]>) => {
      state.permissionsData = action.payload;
    },
    setSelectCompany: (state, action: PayloadAction<ICustomer>) => {
      state.selectCompany = action.payload;
    },
    setNofitData: (state, action: PayloadAction<INotifData[]>) => {
      state.nofitData = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<IShortUserModel>) => {
      state.user = action.payload;
    },
  },
});

export const {
  setShowSplashScreen,
  setNavigateLanding,
  setPermissionsData,
  setSelectCompany,
  setNofitData,
  setToken,
  setUser,
} = MainSlice.actions;

export default MainSlice.reducer;
