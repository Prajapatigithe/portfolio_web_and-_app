import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PROFILE } from '../constants/profile';
import { useAppTheme } from '../context/ThemeContext';

type Props = {
  size?: number;
  /** If true, shows an edit (📷) button to pick a new image */
  editable?: boolean;
  /** Called with the new local file URI after the user picks an image */
  onImageChange?: (uri: string) => void;
  /** Override the avatar URI (e.g. from parent state after user picks image) */
  uri?: string;
};

export function ProfileAvatar({
  size = 112,
  editable = false,
  onImageChange,
  uri: uriProp,
}: Props) {
  const { colors } = useAppTheme();
  const fade = useRef(new Animated.Value(0)).current;
  const [localUri, setLocalUri] = useState<string | undefined>(
    uriProp ?? PROFILE.avatarUri,
  );

  useEffect(() => {
    if (uriProp !== undefined) {
      setLocalUri(uriProp);
    }
  }, [uriProp]);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  const handleEditPress = async () => {
    try {
      // Dynamically import so the app doesn't crash if the library isn't installed
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { launchImageLibrary } = require('react-native-image-picker');
      launchImageLibrary(
        { mediaType: 'photo', quality: 0.85, selectionLimit: 1 },
        (response: {
          didCancel?: boolean;
          errorMessage?: string;
          assets?: { uri?: string }[];
        }) => {
          if (response.didCancel) {
            return;
          }
          if (response.errorMessage) {
            Alert.alert('Error', response.errorMessage);
            return;
          }
          const newUri = response.assets?.[0]?.uri;
          if (newUri) {
            setLocalUri(newUri);
            onImageChange?.(newUri);
          }
        },
      );
    } catch {
      Alert.alert(
        'Library missing',
        'Install react-native-image-picker to enable photo picking.',
      );
    }
  };

  return (
    <Animated.View style={{ opacity: fade }}>
      <View
        style={[
          styles.ring,
          {
            width: size + 8,
            height: size + 8,
            borderRadius: (size + 8) / 2,
            borderColor: colors.primaryMuted,
          },
        ]}>
        <View
          style={[
            styles.inner,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}>
          {localUri ? (
            <Image
              accessibilityIgnoresInvertColors
              source={{ uri: localUri }}
              style={[
                styles.image,
                { width: size, height: size, borderRadius: size / 2 },
              ]}
            />
          ) : (
            <View
              style={[
                styles.placeholder,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  backgroundColor: colors.primary,
                },
              ]}>
              <Text style={[styles.initials, { fontSize: size * 0.32 }]}>
                {PROFILE.initials}
              </Text>
            </View>
          )}
        </View>
      </View>

      {editable && (
        <Pressable
          onPress={handleEditPress}
          style={[
            styles.editBtn,
            { backgroundColor: colors.primary, borderColor: colors.background },
          ]}
          accessibilityLabel="Change profile photo"
          accessibilityRole="button">
          <Text style={styles.editIcon}>📷</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  inner: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 14,
  },
});