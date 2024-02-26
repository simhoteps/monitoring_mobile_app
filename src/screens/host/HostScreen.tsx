import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HostView from "./components/HostView";
import { useTheme } from "../../init/themes/theme_context";
import { createStackNavigator } from "@react-navigation/stack";
import HostDetail from "./components/HostDetail";

const Stack = createStackNavigator();
const HostScreen = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Host"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Monitoring Hosts" component={HostView} />
      <Stack.Screen name="HostsDetail" component={HostDetail} />
    </Stack.Navigator>
  );
};

export default HostScreen;

const styles = StyleSheet.create({});
