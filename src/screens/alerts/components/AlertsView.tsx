import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../../init/themes/theme_context";
import { RootState } from "../../../store/Store";
import CustomerView from "../../../components/customer/CustomerView";
import AlertsTable from "./AlertsTable";
import { useGetAlertsQuery } from "../../../services/AlertService";
import NumberPagination from "../../../components/pagination/NumberPagination";
import { IAlertsData } from "../../../store/types";

const AlertsView = () => {
  const { theme } = useTheme();
  const main = useSelector((state: RootState) => state.main);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: alerts = {} as IAlertsData,
    isError,
    isLoading,
    isFetching,
  } = useGetAlertsQuery({
    company: main.selectCompany.value,
    currentPage: currentPage,
  });

  /*   useEffect(() => {
    console.log("currentPage", currentPage);
    if (main.selectCompany !== undefined) {
      dispatch(
        getAlertDatas(
          `https://apis.monitorpark.net/customer/${main.selectCompany.value}/alerts/?page=${currentPage}`
        )
      );
    }
  }, [main.selectCompany, currentPage]); */

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
            Alerts
          </Text>
          <Text
            style={{
              fontWeight: "700",
              color: theme.palette.text?.secondary,
            }}
          >
            Total: {alerts.total}
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
      ) : alerts.alerts && alerts.alerts.length === 0 ? (
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
        <View style={{ flex: 1, marginBottom: 80 }}>
          <AlertsTable alertDatas={alerts.alerts} />
          {/* begin:: Pagination */}
          <NumberPagination
            totalAlerts={alerts.total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {/* end:: Pagination */}
        </View>
      )}
    </View>
  );
};

export default AlertsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    /*    paddingTop: 30, */
    paddingHorizontal: 20,
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
