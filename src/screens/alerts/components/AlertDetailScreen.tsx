import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IAlertsType } from "../../../store/types";
import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "./AlertsTable";
import { useTheme } from "../../../init/themes/theme_context";
import { Button } from "@rneui/themed";
import { FontAwesome6 } from "@expo/vector-icons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { AlertDetailText } from "./AlertDetailText";
import { selectColor } from "../function/SelectColorFn";
import AntDesign from "react-native-vector-icons/AntDesign";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

type Props = {
  route?: DetailScreenRouteProp;
};

const AlertDetailScreen: React.FC<Props> = ({ route }) => {
  const data: IAlertsType | undefined = route?.params?.data;
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {data && (
        <View style={{ gap: 16, marginBottom: 140 }}>
          <View
            style={{
              ...styles.row,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={{ ...styles.row, gap: 8 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color={theme.palette.background.opposite}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 20,
                  backgroundColor: selectColor(data?.severity),
                }}
              />
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                  textTransform: "uppercase",
                  color: selectColor(data?.severity),
                }}
              >
                {data?.severity}
              </Text>
            </View>

            <View style={styles.row}>
              <Button type="clear">
                <SimpleLineIcons
                  name="envelope-letter"
                  size={20}
                  color={theme.palette.text?.disabled}
                />
              </Button>
              <Button type="clear">
                <FontAwesome6
                  name="wrench"
                  size={20}
                  color={theme.palette.text?.disabled}
                />
              </Button>
            </View>
          </View>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 14,
                color: theme.palette.background.opposite,
              }}
            >
              {new Date(data.receiveTime)
                .toLocaleString("tr-TR")
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/")}
            </Text>
          </View>
          <AlertDetailText title={"Alerts Description:"} desc={data?.text} />
          <AlertDetailText title={"Resource Name:"} desc={data?.resource} />
          <AlertDetailText title={"Alert Notes:"} descArr={data?.tags} />
        </View>
      )}
    </ScrollView>
  );
};

export default AlertDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
