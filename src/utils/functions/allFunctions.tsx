import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

//BASE URL
const BASE_URL = "https://apis.monitorpark.net";

//GET AUTOMATE ALERTS FUNC.
export const getAutomateAlertsCount = async ({
  customerId,
  setTotalAutomateAlerts,
}: {
  customerId: number;
  setTotalAutomateAlerts: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const user = await AsyncStorage.getItem("user");
  try {
    if (user !== null) {
      const accessToken = JSON.parse(user);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
      const res = await fetch(
        `${BASE_URL}/customer/${customerId}/automation_alerts/`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        }
      );

      if (!res.ok) {
        console.log("Automate Alerts Data Error");
      }
      const response = await res.json();
      setTotalAutomateAlerts(response.total);
    }
  } catch (error) {
    console.log(error);
  }
};

//GET EXTERNAL ACTION LIST FUNCTION FOR NEW HOST TENNANT MANAG. SELECTION
export const getExternalActions = async ({
  customerId,
  setExternalActionCount,
}: {
  customerId: number;
  setExternalActionCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const user = await AsyncStorage.getItem("user");
  try {
    if (user !== null) {
      const accessToken = JSON.parse(user);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
      const res = await fetch(`${BASE_URL}/sysenv/${customerId}/actions/`, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      });
      if (!res.ok) {
        console.log("External Actions Error");
      }
      const response = await res.json();
      setExternalActionCount(response.length);
    }
  } catch (error) {
    console.log(error);
  }
};

//GET HOST DATA FUNC. FOR TABLE
export const getHost = async ({
  customerId,
  setTotalFostCount,
}: {
  customerId: number;
  setTotalFostCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const user = await AsyncStorage.getItem("user");
  try {
    if (user !== null) {
      const accessToken = JSON.parse(user);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken.access}`);
      const res = await fetch(`${BASE_URL}/customer/${customerId}/`, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      });

      if (!res.ok) {
        console.log("Host Error");
      }
      const response = await res.json();
      setTotalFostCount(response.hosts.length);
    }
  } catch (error) {
    console.log(error);
  }
};
