import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useTheme } from "../init/themes/theme_context";
import AuthView from "../screens/auth/AuthView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setAsyncStorageToken,
  setAsyncStorageUser,
} from "../store/slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../screens/notification/NotificationScreen";
import { TabGroup } from "./tab/Tab";
import SplashScreen from "../screens/splash/Splash";
import { getNewAccessToken } from "../store/actions/GetNewAccessToken";

const RawStack = createNativeStackNavigator();

function StackGroup() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewAccessToken());
  }, []);
  return (
    <RawStack.Navigator screenOptions={{ headerShown: false }}>
      <RawStack.Screen name="Landing" component={TabGroup} />
      <RawStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      {/*    <RawStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          presentation: "modal",
          headerTitle: "Notification Screen",
          headerShown: false,
        
        }}
      /> */}
    </RawStack.Navigator>
  );
}

export const AuthenticateScreen = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login);
  const main = useSelector((state: RootState) => state.main);

  const userData = async () => {
    const value = await AsyncStorage.getItem("user");
    const token = await AsyncStorage.getItem("emailToken");
    if (token) {
      dispatch(setAsyncStorageToken(token));
    }
    if (value) {
      dispatch(setAsyncStorageUser(value));
    }
  };
  useEffect(() => {
    userData();
  }, [login.loginLoading, login.loginMessage, login.authControl]);
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {main.showSplashScreen ? (
        <SplashScreen />
      ) : login.asyncStorageUser !== "" && login.asyncStorageToken !== "" ? (
        <SafeAreaView style={{ flex: 1 }}>
          <StackGroup />
        </SafeAreaView>
      ) : (
        <AuthView />
      )}
    </View>
  );
};

const NavigationStacks = () => {
  return (
    <NavigationContainer>
      <AuthenticateScreen />
    </NavigationContainer>
  );
};

export default NavigationStacks;
