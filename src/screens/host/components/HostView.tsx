import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../../init/themes/theme_context";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useGetMonitoringHostsQuery } from "../../../services/HostService";
import { IMonitoringHostsData } from "../../../types/IMonitoringHostTypes";
import CustomerView from "../../../components/customer/CustomerView";
import HostList from "./HostList";

const HostView = () => {
  const { theme } = useTheme();
  const main = useSelector((state: RootState) => state.main);

  const {
    data: monitoringHosts = {} as IMonitoringHostsData,
    isError,
    isLoading,
    isFetching,
  } = useGetMonitoringHostsQuery({
    customerId: main.selectCompany.value,
  });

  return (
    <View
      style={{
        backgroundColor: theme.palette.background.default,
        ...styles.container,
      }}
    >
      <View style={styles.titleContainer}>
        <View>
          <Text
            style={{
              fontWeight: "700",
              color: theme.palette.background.opposite,
            }}
          >
            External Actions
          </Text>
          <Text
            style={{
              fontWeight: "700",
              color: theme.palette.text?.secondary,
            }}
          >
            Total: {monitoringHosts.result ? monitoringHosts.result.length : 0}
          </Text>
        </View>
        <CustomerView />
      </View>
      {isError ? (
        <View style={styles.indicatorContainer}>
          <Text
            style={{
              fontWeight: "700",
              color: theme.palette.text?.secondary,
            }}
          >
            Error
          </Text>
        </View>
      ) : isFetching === true ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={"large"} style={{}} />
        </View>
      ) : monitoringHosts.result && monitoringHosts.result.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Image
            style={{ width: 240, height: 120 }}
            source={require("../../../../assets/media/no-data-1.png")}
          />
          <Text
            style={{
              fontWeight: "700",
              color: theme.palette.text?.primary,
            }}
          >
            No Data
          </Text>
        </View>
      ) : (
        <HostList datas={monitoringHosts.result} />
      )}
    </View>
  );
};

export default HostView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  indicatorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});
