import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { AppDispatch, RootState } from "../../../store/Store";
import {
  fetchHandleLogin,
  postLoginVerified,
} from "../../../store/slice/AuthSlice";
import { useTheme } from "../../../init/themes/theme_context";

interface ISignInForm {
  email: string;
  password: string;
}

export interface IShortUserModel {
  access?: string;
  id: number;
  refresh?: string;
  user?: string;
}

const SignInScreen = () => {
  const { theme } = useTheme();
  const [verifcation, setVerifcation] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login);
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Required field"),
    password: Yup.string()
      .required("Required field")
      .min(6, "Password too short"),
  });

  return (
    <View style={styles.container}>
      <Formik
        Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={(values: ISignInForm, actions) => {}}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <LinearGradient
            colors={["#0a3146", "#265f7e", "#0a3146"]}
            style={[styles.container, styles.rawContainer]}
          >
            <Image
              source={require("../../../../assets/media/monitorparkLogo.png")}
              style={styles.image}
            />
            <View style={styles.rawInputContainer}>
              {login.verifyStatus === false && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType={"email-address"}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={{ color: "red" }}>{errors.email}</Text>
                  )}
                </View>
              )}
              {login.verifyStatus === false && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                  {touched.password && errors.password && (
                    <Text style={{ color: "red" }}>{errors.password}</Text>
                  )}
                </View>
              )}
            </View>
            {login.loginMessage !== "" && (
              <Text
                style={{
                  color: "#F2F2F0",
                }}
              >
                {login.loginMessage}
              </Text>
            )}

            {login.verifyStatus === true && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Token</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={(e) => {
                    setVerifcation(e);
                  }}
                  value={verifcation}
                />
                {login.loginLoading && (
                  <Text style={{ color: "red" }}>{login.loginMessage}</Text>
                )}
              </View>
            )}
            {login.verifyStatus === false ? (
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.pressed,
                ]}
                onPress={() => {
                  dispatch(
                    fetchHandleLogin({
                      email: values.email,
                      password: values.password,
                    })
                  );
                }}
              >
                <View>
                  <Text style={styles.text}>Continue</Text>
                </View>
              </Pressable>
            ) : (
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.pressed,
                ]}
                onPress={() => {
                  if (login.user?.access) {
                    dispatch(
                      postLoginVerified({
                        code: verifcation,
                        userToken: login.user?.access,
                      })
                    );
                  }
                }}
              >
                <View>
                  <Text style={styles.text}>Login</Text>
                </View>
              </Pressable>
            )}
          </LinearGradient>
        )}
      </Formik>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  rawContainer: {
    gap: 20,
    padding: 40,
  },
  rawInputContainer: {
    width: "100%",
  },
  inputContainer: {
    marginVertical: 4,
    width: "100%",
  },

  label: {
    color: "#F2F2F0",
    marginBottom: 3,
  },
  input: {
    backgroundColor: "#EFDFCC",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  image: {
    height: 120,
    width: 120,
  },
  buttons: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#293241",
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
