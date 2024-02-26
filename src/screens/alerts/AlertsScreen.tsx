import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTheme } from "../../init/themes/theme_context";
import { createStackNavigator } from "@react-navigation/stack";
import AlertsView from "./components/AlertsView";
import AlertDetailScreen from "./components/AlertDetailScreen";

const Stack = createStackNavigator();

const AlertsScreen = () => {
  const { theme } = useTheme();

  /*   useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        >
          <Text>Helo</Text>
        </Pressable>
      ),
    });
  }, []); */

  return (
    <Stack.Navigator
      initialRouteName="Alert"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.palette.background.default,
        },
        headerTintColor: theme.palette.background.opposite,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Alert" component={AlertsView} />
      <Stack.Screen name="Detail" component={AlertDetailScreen} />
    </Stack.Navigator>
  );
};

export default AlertsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    marginBottom: 80,
  },
});
