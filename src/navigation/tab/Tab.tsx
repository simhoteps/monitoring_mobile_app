import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../../init/themes/theme_context";
import { AppDispatch } from "../../store/Store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getNewAccessToken } from "../../store/actions/GetNewAccessToken";
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";
import Icon, { Icons } from "../../components/icons/icons";
import Dashboard from "../../screens/dashboard/Dashboard";
import { DrawerGroup } from "../drawer/Drawer";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import HostScreen from "../../screens/host/HostScreen";

export const TabArr = [
  {
    route: "Dashboard",
    label: "Dashboard",
    type: Icons.MaterialIcons,
    activeIcon: "dashboard",
    inActiveIcon: "dashboard",
    component: Dashboard,
  },
  {
    route: "AlertScreen",
    label: "Alert",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "bell-alert",
    inActiveIcon: "bell-alert-outline",
    component: DrawerGroup,
  },
  {
    route: "Host",
    label: "Hosts",
    type: Icons.Entypo,
    activeIcon: "archive",
    inActiveIcon: "archive",
    component: HostScreen,
  },
  {
    route: "Profile",
    label: "Profile",
    type: Icons.FontAwesome,
    activeIcon: "user-circle",
    inActiveIcon: "user-circle-o",
    component: ProfileScreen,
  },
];

//Tab
const Tab = createBottomTabNavigator();

export function TabGroup() {
  const { theme } = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getNewAccessToken());
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: theme.palette.background.opposite,
        headerStyle: {
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.background.default,
          shadowColor: theme.palette.background.default,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.palette.background.opposite,
          height: 72,
          position: "absolute",
          bottom: 0,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 15,
          borderTopWidth: 0,
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.label}
            component={item.component}
            options={{
              headerTitle: (props) =>
                item.label === "Alert" ? (
                  <AlertTitle
                    label={item.label}
                    openDrawer={() => {
                      openDrawer();
                    }}
                  />
                ) : item.label === "Dashboard" ? (
                  <DashboardTitle label={item.label} />
                ) : (
                  <Text
                    style={{
                      ...styles.title,
                      color: theme.palette.background.opposite,
                    }}
                  >
                    {item.label}
                  </Text>
                ),

              tabBarIcon: ({ focused }) => (
                <View style={styles.tabScreenContainer}>
                  <Icon
                    type={item.type}
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    color={focused ? "#e32f45" : "#748c94"}
                  />
                  <Text
                    style={{
                      color: focused ? "#e32f45" : "#748c94",
                      fontSize: 12,
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabScreenContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
  },
  alertContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    /*     justifyContent: "space-between", */
  },
  badge: {
    borderRadius: 9,
    height: 14,
    minWidth: 0,
    width: 14,
    top: -4,
    right: -12,
  },
  badgeContainer: {
    position: "absolute",
  },
  badgeText: {
    fontSize: 10,
    paddingHorizontal: 0,
  },
});

const AlertTitle = ({
  label,
  openDrawer,
}: {
  label: string;
  openDrawer: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.alertContainer}>
      <Text
        style={{
          ...styles.alertTitle,
          color: theme.palette.background.opposite,
        }}
      >
        {label}
      </Text>
      <TouchableOpacity
        style={{
          marginLeft: -26,
        }}
        onPress={() => {
          openDrawer();
        }}
      >
        <Ionicons
          name="menu"
          size={24}
          color={theme.palette.background.opposite}
        />
      </TouchableOpacity>
    </View>
  );
};

const DashboardTitle = ({ label }: { label: string }) => {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.alertContainer}>
      <Text
        style={{
          ...styles.alertTitle,
          color: theme.palette.background.opposite,
        }}
      >
        {label}
      </Text>
      <TouchableOpacity
        style={{
          marginLeft: -28,
        }}
        onPress={() => {
          navigation.navigate("NotificationScreen");
        }}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={theme.palette.background.opposite}
        />
        <Badge
          badgeStyle={styles.badge}
          textStyle={styles.badgeText}
          value={5}
          status="error"
          containerStyle={[styles.badgeContainer]}
        />
      </TouchableOpacity>
    </View>
  );
};
