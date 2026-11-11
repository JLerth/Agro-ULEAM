import {
  Text as DefaultText,
  View as DefaultView,
  type TextProps as RNTextProps,
  type ViewProps as RNViewProps,
} from "react-native";

import { useColorScheme } from "./useColorScheme";
import Colors from "@/constants/Colors";

type ColorName = keyof typeof Colors.light;

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & RNTextProps & {
  colorName?: ColorName;
};

export type ViewProps = ThemeProps & RNViewProps & {
  colorName?: ColorName;
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  return colorFromProps ?? Colors[theme][colorName];
}

export function Text(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    colorName = "text",
    ...otherProps
  } = props;

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName
  );

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const {
    style,
    lightColor,
    darkColor,
    colorName = "background",
    ...otherProps
  } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName
  );

  return (
    <DefaultView
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}