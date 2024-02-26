// Drawer

import { createDrawerNavigator } from "@react-navigation/drawer";
import AlertsScreen from "../../screens/alerts/AlertsScreen";
import { useTheme } from "../../init/themes/theme_context";
import ExternalActions from "../../screens/externalActions/ExternalActions";
import AutomationHosts from "../../screens/automationHosts/AutomationHosts";

const Drawer = createDrawerNavigator();

export function DrawerGroup() {
  const { theme } = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#e32f45",
        drawerPosition: "right",
        drawerLabelStyle: {
          color: theme.palette.background.opposite,
        },
        drawerStyle: {
          backgroundColor: theme.palette.background.default,
          width: 240,
        },
      }}
    >
      <Drawer.Screen name="Alerts" component={AlertsScreen} />
      <Drawer.Screen name="External Actions" component={ExternalActions} />
      <Drawer.Screen name="Automation Hosts" component={AutomationHosts} />
    </Drawer.Navigator>
  );
}
