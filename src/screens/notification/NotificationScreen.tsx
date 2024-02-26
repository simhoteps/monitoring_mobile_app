import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../init/themes/theme_context";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

const NotificationScreen = () => {
  const { theme } = useTheme();
  const main = useSelector((state: RootState) => state.main);
  const [viewMessage, setViewMessage] = useState(0);
  const [fadeAnimValue, setFadeAnimValue] = useState(new Animated.Value(0));
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const toggleMessageView = (id: number) => {
    Animated.timing(fadeAnimValue, {
      toValue: viewMessage !== id ? 1 : 0, // viewMessage durumuna göre görünürlüğü ayarlayın
      duration: 500, // Animasyon süresi
      useNativeDriver: true, // Native sürücü kullanma
    }).start();
  };
  return (
    <View
      style={{
        backgroundColor: theme.palette.background.default,
        ...styles.container,
      }}
    >
      <View style={styles.headerContainer}>
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
        <Text
          style={{
            ...styles.headerText,
            color: theme.palette.background.opposite,
          }}
        >
          Automation Notifications
        </Text>
      </View>
      <View>
        <FlatList
          data={main.nofitData}
          keyExtractor={(item, i) => `nofitData_${i}`}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 4,

                borderRadius: 8,
                backgroundColor:
                  viewMessage === item.id
                    ? `${theme.palette.text?.primary}30`
                    : `${theme.palette.text?.primary}10`,
              }}
            >
              <Pressable
                onPress={() => {
                  if (viewMessage === item.id) {
                    setFadeAnimValue(new Animated.Value(0));
                    setViewMessage(0);
                  } else {
                    setViewMessage(item.id);
                  }
                  toggleMessageView(item.id);
                }}
                style={{
                  ...styles.alarmContainer,
                  backgroundColor:
                    viewMessage === item.id
                      ? `${theme.palette.text?.primary}30`
                      : `${theme.palette.text?.primary}10`,
                }}
              >
                <TouchableOpacity>
                  <AntDesign
                    name={viewMessage === item.id ? "down" : "right"}
                    size={16}
                    color={theme.palette.success?.main}
                  />
                </TouchableOpacity>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    maxWidth: "70%",
                    color: theme.palette.background.opposite,
                  }}
                >
                  {item.message}
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <View style={styles.textSubContainer}>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 12,
                        color: theme.palette.background.opposite,
                      }}
                    >
                      {new Date(item.timestamp)
                        .toLocaleString("tr-TR")
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("/")}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.seenContainer,
                      backgroundColor: item.is_read
                        ? theme.palette.success?.main
                        : theme.palette.error?.main,
                    }}
                  >
                    <Text> {item.is_read ? "seen" : "unseen"}</Text>
                  </View>
                </View>
              </Pressable>
              {viewMessage === item.id && (
                <Animated.View style={{ opacity: fadeAnimValue, padding: 10 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.palette.background.opposite,
                    }}
                  >
                    {item.message}
                  </Text>
                </Animated.View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  headerContainer: {
    gap: 16,
    alignItems: "center",
    flexDirection: "row",
    rowGap: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
  },
  alarmContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
    padding: 8,

    borderRadius: 8,
  },

  textSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seenContainer: {
    padding: 2,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
