import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function AppCard({ children, onPress, style }: Props) {
  const { colors } = useAppTheme();
  const elevation = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(elevation, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(elevation, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };

  const translateY = elevation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2],
  });

  const content = (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          transform: onPress ? [{ translateY }] : undefined,
          shadowColor: colors.text,
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
});
