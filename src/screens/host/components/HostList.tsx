import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IResultHost } from "../../../types/IMonitoringHostTypes";
import { useTheme } from "../../../init/themes/theme_context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export type RootStackParamList = {
  HostsDetail: { data: IResultHost };
};

export function customnavigation() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return navigation;
}

const HostList = React.memo(function HostList({
  datas,
}: {
  datas: IResultHost[];
}) {
  const { theme } = useTheme();
  const navigation = customnavigation();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={datas}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HostsDetail", { data: item });
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
                  ...styles.dot,
                  backgroundColor:
                    item?.status === "0"
                      ? theme.palette.success?.main
                      : theme.palette.error?.main,
                }}
              />
              <Text
                style={{
                  ...styles.nameStyle,
                  color: theme.palette.text?.primary,
                }}
              >
                {item.name}
              </Text>

              <View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color={
                    item?.status === "0"
                      ? theme.palette.success?.main
                      : theme.palette.error?.main
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, i) => `${item.hostid}_${i}`}
      />
    </View>
  );
});

export default HostList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  dot: {
    height: "100%",
    width: 8,
    borderRadius: 4,
  },
  nameStyle: {
    width: "80%",
  },
});
