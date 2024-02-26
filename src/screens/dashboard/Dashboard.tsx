import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import AlertsView from "./components/AlertsView";
import { useTheme } from "../../init/themes/theme_context";
import CustomerView from "../../components/customer/CustomerView";
import Chart from "./components/Chart";
import AlarmNotifications from "../../components/notifications/AlarmNotifications";

export default function Dashboard() {
  const { theme } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: theme.palette.background.default }}>
      <View style={styles.container}>
        <CustomerView />
        <AlertsView />
        <AlarmNotifications />
        <Chart />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    marginBottom: 80,
  },
});
