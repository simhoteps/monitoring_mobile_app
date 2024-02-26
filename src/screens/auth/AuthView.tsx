import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SignInScreen from "./components/SignInScreen";

const AuthView = () => {
  return (
    <View style={styles.container}>
      <SignInScreen />
    </View>
  );
};

export default AuthView;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
