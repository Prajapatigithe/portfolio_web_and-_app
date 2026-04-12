import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { ProfileAvatar } from '../components/ProfileAvatar';
import { PROFILE } from '../constants/profile';
import { useAppTheme } from '../context/ThemeContext';
import type { RootTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<RootTabParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { colors, toggleLightDark } = useAppTheme();
  const [avatarUri, setAvatarUri] = useState<string | undefined>(PROFILE.avatarUri);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <AppHeader title="Portfolio" onToggleTheme={toggleLightDark} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          {/* editable=true shows the 📷 button to change photo */}
          <ProfileAvatar
            size={120}
            editable
            uri={avatarUri}
            onImageChange={setAvatarUri}
          />
          <Text style={[styles.name, { color: colors.text }]}>{PROFILE.name}</Text>
          <Text style={[styles.role, { color: colors.primary }]}>{PROFILE.role}</Text>
          <Text style={[styles.intro, { color: colors.textSecondary }]}>
            {PROFILE.introShort}
          </Text>
          <AppButton
            label="View projects"
            onPress={() => navigation.navigate('Projects')}
            style={styles.cta}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 8,
  },
  hero: {
    alignItems: 'center',
    gap: 14,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginTop: 8,
  },
  role: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  intro: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 4,
  },
  cta: {
    marginTop: 12,
    maxWidth: 320,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});