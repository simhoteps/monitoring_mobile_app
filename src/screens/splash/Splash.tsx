import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import {
  setNavigateLanding,
  setShowSplashScreen,
} from "../../store/slice/MainSlice";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

const SplashScreen = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowSplashScreen(false));
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/splash.png")}
        style={styles.image}
      />
    </View>
  );
};

export default SplashScreen;
