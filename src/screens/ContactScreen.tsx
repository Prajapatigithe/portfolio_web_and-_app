import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { AppCard } from '../components/AppCard';
import { AppHeader } from '../components/AppHeader';
import { PROFILE } from '../constants/profile';
import { useAppTheme } from '../context/ThemeContext';
import { openExternalUrl } from '../utils/linking';

export function ContactScreen() {
  const { colors, toggleLightDark } = useAppTheme();
  const mailto = `mailto:${PROFILE.email}`;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <AppHeader title="Contact" onToggleTheme={toggleLightDark} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.lead, { color: colors.textSecondary }]}>
          Prefer email or social? Tap an action below.
        </Text>

        <AppCard style={styles.card}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
          <Text style={[styles.value, { color: colors.text }]}>{PROFILE.email}</Text>
          <AppButton
            label="Send email"
            onPress={() => openExternalUrl(mailto)}
            style={styles.btn}
          />
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>GitHub</Text>
          <Text style={[styles.value, { color: colors.text }]} numberOfLines={2}>
            {PROFILE.githubUrl}
          </Text>
          <AppButton
            label="Open GitHub"
            variant="outline"
            onPress={() => openExternalUrl(PROFILE.githubUrl)}
            style={styles.btn}
          />
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>LinkedIn</Text>
          <Text style={[styles.value, { color: colors.text }]} numberOfLines={2}>
            {PROFILE.linkedinUrl}
          </Text>
          <AppButton
            label="Open LinkedIn"
            variant="outline"
            onPress={() => openExternalUrl(PROFILE.linkedinUrl)}
            style={styles.btn}
          />
        </AppCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 14,
  },
  lead: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  card: {
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    fontSize: 15,
    lineHeight: 22,
  },
  btn: {
    alignSelf: 'stretch',
    marginTop: 4,
  },
});
