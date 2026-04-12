import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppCard } from '../components/AppCard';
import { AppHeader } from '../components/AppHeader';
import { PROJECTS } from '../constants/profile';
import { useAppTheme } from '../context/ThemeContext';
import { openExternalUrl } from '../utils/linking';

function ProjectSeparator() {
  return <View style={styles.sep} />;
}

export function ProjectsScreen() {
  const { colors, toggleLightDark } = useAppTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <AppHeader title="Projects" onToggleTheme={toggleLightDark} />
      <FlatList
        data={PROJECTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={ProjectSeparator}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AppCard
            style={styles.card}
            onPress={() => openExternalUrl(item.link)}>
            <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {item.description}
            </Text>
            <Text style={[styles.link, { color: colors.primary }]}>Open link →</Text>
          </AppCard>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 4,
  },
  sep: {
    height: 14,
  },
  card: {
    marginBottom: 0,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  link: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
  },
});
