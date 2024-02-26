import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../init/themes/theme_context";
import { Switch } from "react-native";
import lightTheme from "../../init/themes/styles/light";
import darkTheme from "../../init/themes/styles/dark";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch, RootState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  setAsyncStorageToken,
  setAsyncStorageUser,
  setAuthState,
  setLoadingVerify,
} from "../../store/slice/AuthSlice";
import { Button } from "@rneui/themed";
import { postEmailNotif } from "../../store/actions/EmailNotification";

const ProfileScreen = () => {
  const [phoneValue, setPhone] = useState<boolean>(false);
  const main = useSelector((state: RootState) => state.main);
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const value: boolean = theme === lightTheme;

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        paddingVertical: 60,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <View
        style={{
          gap: 48,
          marginBottom: 180,
        }}
      >
        <View style={styles.profileContainer}>
          <Image
            source={require("../../../assets/media/profilePicture.png")}
            style={styles.image}
          />

          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: theme.palette.text?.primary,
              }}
            >
              Account
            </Text>
            <Text
              style={{
                color: theme.palette.text?.disabled,
              }}
            >
              {main.user.user}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <Octicons
                name="person"
                size={18}
                color={theme.palette.text?.secondary}
              />
              <Text
                style={{
                  color: theme.palette.text?.disabled,
                  ...styles.text,
                }}
              >
                Edit Profile
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={16}
              color={theme.palette.text?.secondary}
            />
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <Feather
                name="mail"
                size={16}
                color={theme.palette.text?.secondary}
              />
              <Text
                style={{
                  color: theme.palette.text?.disabled,
                  ...styles.text,
                }}
              >
                Email
              </Text>
            </View>

            <Text
              style={{
                color: theme.palette.text?.secondary,
              }}
            >
              {main.user.user}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <MaterialIcons
                name="settings-phone"
                size={18}
                color={theme.palette.text?.secondary}
              />
              <Text
                style={{
                  color: theme.palette.text?.disabled,
                  ...styles.text,
                }}
              >
                Phone Notification
              </Text>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                paddingHorizontal: 14,
                borderRadius: 20,
                backgroundColor: main.emailNotifications
                  ? theme.palette.success?.main
                  : theme.palette.error?.main,
              }}
              onPress={() => {
                dispatch(postEmailNotif());
              }}
            >
              <Text
                style={{
                  color: theme.palette.background.opposite,
                }}
              >
                {main.emailNotifications ? "Opened" : "Closed"}
              </Text>
            </TouchableOpacity>

            {/*      <Switch
              trackColor={{ false: "#767577", true: "#B4CF66" }}
              thumbColor={phoneValue ? "#DEE0D5" : "#f4f3f4"}
              onValueChange={togglePhoneSwitch}
              value={phoneValue}
              style={{
                height: 24,
              }}
            /> */}
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <Ionicons
                name="mail-unread-outline"
                size={18}
                color={theme.palette.text?.secondary}
              />
              <Text
                style={{
                  color: theme.palette.text?.disabled,
                  ...styles.text,
                }}
              >
                Email Notification
              </Text>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                paddingHorizontal: 14,
                borderRadius: 20,
                backgroundColor: main.emailNotifications
                  ? theme.palette.success?.main
                  : theme.palette.error?.main,
              }}
              onPress={() => {
                dispatch(postEmailNotif());
              }}
            >
              <Text
                style={{
                  color: theme.palette.background.opposite,
                }}
              >
                {main.emailNotifications ? "Opened" : "Closed"}
              </Text>
            </TouchableOpacity>
            {/*     <Switch
              trackColor={{ false: "#767577", true: "#B4CF66" }}
              thumbColor={emailValue ? "#DEE0D5" : "#f4f3f4"}
              onValueChange={toggleEmailSwitch}
              value={emailValue}
              style={{
                height: 24,
              }}
            /> */}
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              {value ? (
                <Feather
                  name="sun"
                  size={18}
                  color={theme.palette.text?.secondary}
                />
              ) : (
                <Feather
                  name="moon"
                  size={18}
                  color={theme.palette.text?.secondary}
                />
              )}

              <Text
                style={{
                  color: theme.palette.text?.disabled,
                  ...styles.text,
                }}
              >
                {value ? "Light Theme" : "Dark Theme"}
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#B4CF66" }}
              thumbColor={value ? "#DEE0D5" : "#f4f3f4"}
              onValueChange={() => setTheme(value ? darkTheme : lightTheme)}
              value={value}
              style={{
                height: 24,
              }}
            />
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.row}>
            <AntDesign
              name="setting"
              size={18}
              color={theme.palette.text?.secondary}
            />
            <Text
              style={{
                color: theme.palette.text?.disabled,
                ...styles.text,
              }}
            >
              General
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons
              name="lock-open-outline"
              size={18}
              color={theme.palette.text?.secondary}
            />
            <Text
              style={{
                color: theme.palette.text?.disabled,
                ...styles.text,
              }}
            >
              Privacy
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={18}
              color={theme.palette.text?.secondary}
            />
            <Text
              style={{
                color: theme.palette.text?.disabled,
                ...styles.text,
              }}
            >
              Help
            </Text>
          </View>
          <View style={styles.row}>
            <AntDesign
              name="file1"
              size={18}
              color={theme.palette.text?.secondary}
            />
            <Text
              style={{
                color: theme.palette.text?.disabled,
                ...styles.text,
              }}
            >
              About
            </Text>
          </View>
          <View
            style={{
              ...styles.row,

              padding: 0,
            }}
          >
            <Entypo
              name="log-out"
              size={18}
              color={theme.palette.text?.secondary}
            />
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem("user");
                AsyncStorage.removeItem("currentUser");
                AsyncStorage.removeItem("ipAddress");
                AsyncStorage.removeItem("emailToken");
                dispatch(setAsyncStorageUser(""));
                dispatch(setAsyncStorageToken(""));
                setTimeout(() => {
                  dispatch(setAuthState(false));
                  dispatch(setLoadingVerify(false));
                }, 500);
              }}
            >
              <Text
                style={{
                  ...styles.text,
                  width: "100%",
                  color: theme.palette.text?.disabled,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  subContainer: { gap: 20 },
  profileContainer: {
    width: "100%",
    gap: 24,
    alignItems: "center",
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: 40,
  },
  text: {
    fontWeight: "700",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
