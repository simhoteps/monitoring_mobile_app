import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "../../../init/themes/theme_context";
import { AppDispatch, RootState } from "../../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  getAutomateAlertsCount,
  getExternalActions,
  getHost,
} from "../../../utils/functions/allFunctions";
import { getAlertDatas } from "../../../store/slice/AlertsSlice";
import { useNavigation } from "@react-navigation/core";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { customnavigation } from "../../../hooks/customNavigation";

export type RootStackParamList = {
  Alerts: undefined;
  AutomationActions: undefined;
  TotalExternalActions: undefined;
  TotalHost: undefined;
};

type ScreenProps = NativeStackScreenProps<RootStackParamList, "Alerts">;

const AlertsView: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const alert = useSelector((state: RootState) => state.alert);
  const main = useSelector((state: RootState) => state.main);
  const [totalAutomateAlerts, setTotalAutomateAlerts] = useState(0);
  const [externalActionCount, setExternalActionCount] = useState(0);
  const [totalFostCount, setTotalFostCount] = useState(0);

  useEffect(() => {
    if (main.selectCompany !== undefined) {
      dispatch(
        getAlertDatas(
          `https://apis.monitorpark.net/customer/${main.selectCompany.value}/alerts/?page=1`
        )
      );
      getAutomateAlertsCount({
        customerId: main.selectCompany.value,
        setTotalAutomateAlerts: setTotalAutomateAlerts,
      });
      getExternalActions({
        customerId: main.selectCompany.value,
        setExternalActionCount: setExternalActionCount,
      });
      getHost({
        customerId: main.selectCompany.value,
        setTotalFostCount: setTotalFostCount,
      });
    }
  }, [main.selectCompany]);

  return (
    <View style={{ flexWrap: "wrap", flexDirection: "row", gap: 10 }}>
      <AlertsViewDesc
        id={"1"}
        title={"Total Alert"}
        total={alert.totalAlerts ? alert.totalAlerts : 0}
        page={"Alerts"}
      />
      <AlertsViewDesc
        id={"2"}
        title={"Automation Actions"}
        total={totalAutomateAlerts ? totalAutomateAlerts : 0}
        page={"AutomationActions"}
      />
      <AlertsViewDesc
        id={"3"}
        title={"Total Host"}
        total={totalFostCount ? totalFostCount : 0}
        page={"Automation Hosts"}
      />
      <AlertsViewDesc
        id={"4"}
        title={"Total External Actions"}
        total={externalActionCount ? externalActionCount : 0}
        page={"External Actions"}
      />
    </View>
  );
};

export default AlertsView;

const styles = StyleSheet.create({
  subContainer: {
    width: "48%",

    backgroundColor: "#2C2C40",
    borderRadius: 16,
    padding: 4,
  },
  container: {
    alignItems: "center",

    height: 112,
    justifyContent: "space-between",
    textAlign: "center",
    borderRadius: 16,
    backgroundColor: "#1B1B29",
    padding: 16,
    gap: 4,
  },
  titleText: {
    color: "#CDCDDE",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
  },
  totalText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#CBCBDD",
  },
  pressableText: {
    fontSize: 16,
  },
});

const AlertsViewDesc = ({
  id,
  title,
  total,
  page,
}: {
  id: string;
  title: string;
  total: number;
  page: string;
}) => {
  const { theme } = useTheme();
  const navigation = customnavigation();

  return (
    <View
      key={`alertsViewDesc_${id}`}
      style={{
        ...styles.subContainer,
        backgroundColor: `${theme.palette.background.opposite}20`,
      }}
    >
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Text
          style={{
            ...styles.titleText,
            color: theme.palette.text?.primary,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            ...styles.totalText,
            color: theme.palette.text?.disabled,
          }}
        >
          {total}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(page);
          }}
        >
          <Text style={{ ...styles.pressableText, color: "#F6C944" }}>
            go to page
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
