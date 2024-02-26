import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../../init/themes/theme_context";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { IExternalHost } from "../../../types/IExternalTypes";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Octicons from "react-native-vector-icons/Octicons";

export type RootStackParamList = {
  Detail: { data: IExternalHost };
};

export function customnavigation() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return navigation;
}

export default function AutomationHostsTable({
  datas,
}: {
  datas: IExternalHost[];
}) {
  const { theme } = useTheme();
  const navigation = customnavigation();

  return (
    <View style={styles.scrollStyle}>
      <FlatList
        data={datas}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: `${theme.palette.text?.primary}20`,
              ...styles.container,
            }}
          >
            <View style={{ gap: 8 }}>
              <View style={styles.rowContainer}>
                <Text
                  style={{
                    fontWeight: "700",
                    color: theme.palette.error?.main,
                  }}
                >
                  IP Address:
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    color: theme.palette.text?.primary,
                  }}
                >
                  {item.proxy_ip}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text
                  style={{
                    fontWeight: "700",
                    color: theme.palette.error?.main,
                  }}
                >
                  PROP
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    color: theme.palette.text?.primary,
                  }}
                >
                  {item.proxy_ip}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text
                  style={{
                    fontWeight: "700",
                    color: theme.palette.error?.main,
                  }}
                >
                  Credential Name
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    color: theme.palette.text?.primary,
                  }}
                >
                  {item.credential_username}
                </Text>
              </View>
            </View>

            <View style={{ gap: 8 }}>
              <TouchableOpacity>
                <MaterialIcons
                  name="pending-actions"
                  size={24}
                  color={theme.palette.background.opposite}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Octicons
                  name="pencil"
                  size={22}
                  color={theme.palette.background.opposite}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons
                  name="delete"
                  size={24}
                  color={theme.palette.background.opposite}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, i) => `${item.os_id}_${i}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textContainer: {
    maxWidth: 120,
  },
});
