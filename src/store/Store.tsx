import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slice/MainSlice";
import AuthSlice from "./slice/AuthSlice";
import AlertSlice from "./slice/AlertsSlice";
import { customerApi } from "../services/CustomerService";
import { alertsApi } from "../services/AlertService";
import { externalApi } from "../services/ExternalService";
import { monitoringHostsApi } from "../services/HostService";

const middleware = [
  customerApi.middleware,
  alertsApi.middleware,
  externalApi.middleware,
  monitoringHostsApi.middleware,
];

export const store = configureStore({
  reducer: {
    main: MainSlice,
    login: AuthSlice,
    alert: AlertSlice,
    [customerApi.reducerPath]: customerApi.reducer,
    [alertsApi.reducerPath]: alertsApi.reducer,
    [externalApi.reducerPath]: externalApi.reducer,
    [monitoringHostsApi.reducerPath]: monitoringHostsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
