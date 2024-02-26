import { View, Text } from "react-native";
import { useTheme } from "../../../init/themes/theme_context";

export const AlertDetailText = ({
  title,
  desc,
  descArr,
}: {
  title: string;
  desc?: string;
  descArr?: string[];
}) => {
  const { theme } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <Text
        style={{
          color: theme.palette.text?.secondary,
          fontSize: 16,
          fontWeight: "700",
        }}
      >
        {title}
      </Text>
      {desc && (
        <Text style={{ color: theme.palette.text?.primary }}>{desc}</Text>
      )}
      {descArr &&
        descArr.map((e, index) => {
          return (
            <Text style={{ color: theme.palette.text?.primary }} key={index}>
              <Text style={{ fontWeight: "600" }}>{e.split(":")[0]}:</Text>{" "}
              <Text> {e.split(":")[1]}</Text>
            </Text>
          );
        })}
    </View>
  );
};
