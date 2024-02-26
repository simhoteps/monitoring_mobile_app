import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../init/themes/theme_context";

const AutomationActions = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.palette.background.default,
        ...styles.container,
      }}
    >
      <Text
        style={{
          color: theme.palette.background.opposite,
        }}
      >
        AutomationActions
      </Text>
    </View>
  );
};

export default AutomationActions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
