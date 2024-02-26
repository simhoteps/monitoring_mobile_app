import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { memo, useState } from "react";
import { useTheme } from "../../../init/themes/theme_context";
import { MaterialIcons } from "@expo/vector-icons";
import { IAlertsType } from "../../../store/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { selectColor } from "../function/SelectColorFn";

export type RootStackParamList = {
  Detail: { data: IAlertsType };
};

export function customnavigation() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return navigation;
}

const AlertsTable = memo(function AlertsTable({
  alertDatas,
}: {
  alertDatas: IAlertsType[];
}) {
  const { theme } = useTheme();
  const navigation = customnavigation();

  return (
    <View style={styles.scrollStyle}>
      <FlatList
        data={alertDatas}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Detail", { data: item });
            }}
          >
            <View
              style={{
                backgroundColor: `${theme.palette.text?.primary}20`,
                ...styles.container,
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: 8,
                  borderRadius: 4,
                  backgroundColor: selectColor(item.severity),
                }}
              />
              <View style={styles.textContainer}>
                <View style={styles.textSubContainer}>
                  <Text
                    style={{
                      fontWeight: "700",
                      color: selectColor(item.severity),
                    }}
                  >
                    {item.severity.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 12,
                      color: theme.palette.background.opposite,
                    }}
                  >
                    {new Date(item.receiveTime)
                      .toLocaleString("tr-TR")
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </Text>
                </View>

                <Text
                  style={{
                    color: theme.palette.background.opposite,
                  }}
                >
                  {item.text}
                </Text>
              </View>
              <View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color={selectColor(item.severity)}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, i) => `${item.id}_${i}`}
      />
    </View>
  );
});

export default AlertsTable;

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  textSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
