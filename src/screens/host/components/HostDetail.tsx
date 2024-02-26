import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useTheme } from "../../../init/themes/theme_context";
import { Button } from "@rneui/themed";
import { FontAwesome6 } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { IResultHost } from "../../../types/IMonitoringHostTypes";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

export type RootStackParamList = {
  HostsDetail: { data: IResultHost };
};
type DetailScreenRouteProp = RouteProp<RootStackParamList, "HostsDetail">;

type Props = {
  route?: DetailScreenRouteProp;
};

const HostDetail: React.FC<Props> = ({ route }) => {
  const data: IResultHost | undefined = route?.params?.data;
  const { theme } = useTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {data && (
        <View style={{ gap: 16, marginBottom: 140 }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 20,
              fontWeight: "700",
              width: "100%",
              color: theme.palette.background.opposite,
            }}
          >
            {data.name}
          </Text>

          <View style={styles.rowSpace}>
            <HostDetailTitle title={"Host Name:"} />
            <HostDetailDesc desc={data?.name} />
          </View>
          <View style={styles.rowSpace}>
            <HostDetailTitle title={"IP:"} />
            <HostDetailDesc desc={data?.hostid} />
          </View>
          <View style={styles.rowSpace}>
            <HostDetailTitle title={"Status:"} />
            <Text
              style={{
                fontWeight: "700",
                color:
                  data?.status === "0"
                    ? theme.palette.success?.main
                    : theme.palette.error?.main,
              }}
            >
              {data?.status === "0" ? "Enable" : "Disable"}
            </Text>
          </View>
          <View style={styles.rowSpace}>
            <HostDetailTitle title={"Templates:"} />
            <View>
              <FlatList
                data={data.parentTemplates}
                renderItem={({ item }) => <HostDetailDesc desc={item.name} />}
                keyExtractor={(item, i) => `${item.name}_${i}`}
              />
            </View>
          </View>
          <View style={styles.rowSpace}>
            <HostDetailTitle title={"Macro Settings:"} />
            <TouchableOpacity>
              <Ionicons
                name="settings-outline"
                size={24}
                color={theme.palette.background.opposite}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rowSpace}>
            <HostDetailTitle title={"Tags:"} />
            <TouchableOpacity>
              <AntDesign
                name="tagso"
                size={24}
                color={theme.palette.background.opposite}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rowSpace}>
            <HostDetailTitle title={"Add Automation Hosts:"} />
            <TouchableOpacity>
              <FontAwesome
                name="plus"
                size={24}
                color={theme.palette.background.opposite}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default HostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  titleContiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "space-between",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rowSpace: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

const HostDetailTitle = ({ title }: { title: string }) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.palette.text?.secondary,
        fontSize: 14,
        fontWeight: "700",
      }}
    >
      {title}
    </Text>
  );
};

const HostDetailDesc = ({ desc }: { desc: string }) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.palette.text?.primary,
        fontSize: 14,
        width: 230,
        textAlign: "right",
      }}
    >
      {desc}
    </Text>
  );
};
