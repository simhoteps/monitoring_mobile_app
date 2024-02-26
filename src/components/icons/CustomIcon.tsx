import React from "react";
import { Path, Svg } from "react-native-svg";
import { useTheme } from "../../init/themes/theme_context";

export const IconLightTheme = () => {
  const { theme } = useTheme();
  return (
    <Svg width="20" height="13" viewBox="0 0 20 13" fill="none">
      <Path
        d="M8.11829 6.48936V9.72136M18.2183 1.64136L15.8913 3.25736M19.0003 6.48936H16.6683M18.2233 11.3374L15.8913 9.72136M2.5553 9.72132C1.6797 9.70436 0.983566 8.98092 1.0003 8.10532V4.87332C0.983566 3.99772 1.6797 3.27428 2.5553 3.25732H8.2153C8.57403 3.25645 8.92087 3.12855 9.1943 2.89632L11.0253 1.35332C11.4965 0.96545 12.1514 0.890176 12.6983 1.16103C13.2452 1.43189 13.5823 1.99846 13.5593 2.60832V10.3703C13.5823 10.9802 13.2452 11.5467 12.6983 11.8176C12.1514 12.0885 11.4965 12.0132 11.0253 11.6253L9.1943 10.0823C8.92087 9.85009 8.57403 9.72219 8.2153 9.72132H2.5553Z"
        stroke={theme.palette.common?.black}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const IconDarkTheme = () => {
  const { theme } = useTheme();

  return (
    <Svg width="15" height="13" viewBox="0 0 15 13" fill="none">
      <Path
        d="M8.11829 6.48938V9.72138M2.5553 9.72132C1.6797 9.70436 0.983566 8.98092 1.0003 8.10532V4.87332C0.983566 3.99772 1.6797 3.27428 2.5553 3.25732H8.2153C8.57403 3.25645 8.92087 3.12855 9.1943 2.89632L11.0253 1.35332C11.4965 0.96545 12.1514 0.890176 12.6983 1.16103C13.2452 1.43189 13.5823 1.99846 13.5593 2.60832V10.3703C13.5823 10.9802 13.2452 11.5467 12.6983 11.8176C12.1514 12.0885 11.4965 12.0132 11.0253 11.6253L9.1943 10.0823C8.92087 9.85009 8.57403 9.72219 8.2153 9.72132H2.5553Z"
        stroke={theme.palette.common?.black}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};