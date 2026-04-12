import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { AppButton } from '../components/AppButton';
import { AppCard } from '../components/AppCard';
import { AppHeader } from '../components/AppHeader';
import { EXPERIENCE, PROFILE, SKILLS } from '../constants/profile';
import { useAppTheme } from '../context/ThemeContext';
import { openExternalUrl } from '../utils/linking';

type ResumeFile = {
  name: string;
  uri: string;
};

export function AboutScreen() {
  const { colors, toggleLightDark } = useAppTheme();
  const [resume, setResume] = useState<ResumeFile | null>(
    PROFILE.resumeUri ? { name: 'Resume.pdf', uri: PROFILE.resumeUri } : null,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [inputName, setInputName] = useState('');

  const handleSaveUrl = () => {
    const url = inputUrl.trim();
    if (!url) {
      Alert.alert('Error', 'Please enter a URL.');
      return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      Alert.alert('Invalid URL', 'URL must start with https://');
      return;
    }
    setResume({
      name: inputName.trim() || 'Resume.pdf',
      uri: url,
    });
    setInputUrl('');
    setInputName('');
    setModalVisible(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Remove Resume',
      'Are you sure you want to remove the resume link?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => setResume(null) },
      ],
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <AppHeader title="About" onToggleTheme={toggleLightDark} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>

        <Text style={[styles.body, { color: colors.textSecondary }]}>
          {PROFILE.introLong}
        </Text>

        {/* ── Resume Section ── */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Resume</Text>

        <AppCard style={styles.resumeCard}>
          {resume ? (
            <>
              {/* File info row */}
              <View style={styles.resumeRow}>
                <View
                  style={[
                    styles.resumeIconWrap,
                    { backgroundColor: `${colors.primary}18` },
                  ]}>
                  <Text style={styles.resumeIconText}>📄</Text>
                </View>

                <View style={styles.resumeInfo}>
                  <Text
                    style={[styles.resumeName, { color: colors.text }]}
                    numberOfLines={1}>
                    {resume.name}
                  </Text>
                  <Text
                    style={[styles.resumeUri, { color: colors.textSecondary }]}
                    numberOfLines={1}>
                    {resume.uri}
                  </Text>
                </View>

                {/* Delete button */}
                <Pressable
                  onPress={handleDelete}
                  accessibilityLabel="Delete resume"
                  accessibilityRole="button"
                  style={({ pressed }) => [
                    styles.deleteBtn,
                    { backgroundColor: pressed ? '#FF444420' : '#FF444412' },
                  ]}>
                  <Text style={styles.deleteBtnText}>🗑️</Text>
                </Pressable>
              </View>

              {/* View / Replace */}
              <View style={styles.resumeActions}>
                <AppButton
                  label="View Resume"
                  onPress={() => openExternalUrl(resume.uri)}
                  style={styles.actionBtn}
                />
                <AppButton
                  label="Replace"
                  variant="outline"
                  onPress={() => setModalVisible(true)}
                  style={styles.actionBtn}
                />
              </View>
            </>
          ) : (
            /* Empty state */
            <View style={styles.emptyResume}>
              <Text style={styles.emptyIcon}>📂</Text>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No resume added
              </Text>
              <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
                Add a link to your resume PDF (Google Drive, Dropbox, etc.)
              </Text>
              <AppButton
                label="Add Resume Link"
                onPress={() => setModalVisible(true)}
                style={styles.uploadBtn}
              />
            </View>
          )}
        </AppCard>

        {/* ── Skills ── */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Skills</Text>
        <View style={styles.chips}>
          {SKILLS.map(skill => (
            <View
              key={skill}
              style={[
                styles.chip,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                },
              ]}>
              <Text style={[styles.chipLabel, { color: colors.text }]}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* ── Experience ── */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Experience</Text>
        {EXPERIENCE.map(item => (
          <AppCard key={item.title} style={styles.card}>
            <Text style={[styles.jobTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.company, { color: colors.primary }]}>{item.company}</Text>
            <Text style={[styles.period, { color: colors.textSecondary }]}>
              {item.period}
            </Text>
            <Text style={[styles.desc, { color: colors.textSecondary }]}>
              {item.description}
            </Text>
          </AppCard>
        ))}
      </ScrollView>

      {/* ── Add Resume Modal ── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <Pressable
            style={[
              styles.modalBox,
              { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
            ]}
            onPress={() => {}}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Add Resume Link
            </Text>
            <Text style={[styles.modalSub, { color: colors.textSecondary }]}>
              Paste a shareable PDF link (Google Drive, Dropbox, etc.)
            </Text>

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
              File Name (optional)
            </Text>
            <TextInput
              value={inputName}
              onChangeText={setInputName}
              placeholder="e.g. Ankit_Kumar_Resume.pdf"
              placeholderTextColor={colors.textSecondary}
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                },
              ]}
            />

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
              Resume URL *
            </Text>
            <TextInput
              value={inputUrl}
              onChangeText={setInputUrl}
              placeholder="https://drive.google.com/..."
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              keyboardType="url"
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                },
              ]}
            />

            <View style={styles.modalActions}>
              <AppButton
                label="Cancel"
                variant="outline"
                onPress={() => setModalVisible(false)}
                style={styles.modalBtn}
              />
              <AppButton
                label="Save"
                onPress={handleSaveUrl}
                style={styles.modalBtn}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 28, gap: 16 },
  body: { fontSize: 16, lineHeight: 24, marginBottom: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 8 },

  // Resume card
  resumeCard: { gap: 14 },
  resumeRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  resumeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeIconText: { fontSize: 24 },
  resumeInfo: { flex: 1 },
  resumeName: { fontSize: 15, fontWeight: '600' },
  resumeUri: { fontSize: 12, marginTop: 2 },
  deleteBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: { fontSize: 18 },
  resumeActions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1 },

  // Empty state
  emptyResume: { alignItems: 'center', paddingVertical: 12, gap: 8 },
  emptyIcon: { fontSize: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700' },
  emptySub: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  uploadBtn: { marginTop: 4, width: '100%' },

  // Skills
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1 },
  chipLabel: { fontSize: 14, fontWeight: '500' },

  // Experience
  card: { marginBottom: 4 },
  jobTitle: { fontSize: 17, fontWeight: '700' },
  company: { fontSize: 15, fontWeight: '600', marginTop: 4 },
  period: { fontSize: 13, marginTop: 2, marginBottom: 8 },
  desc: { fontSize: 15, lineHeight: 22 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    gap: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  modalSub: { fontSize: 14, lineHeight: 20, marginBottom: 4 },
  inputLabel: { fontSize: 13, fontWeight: '600', marginBottom: -4 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 4 },
  modalBtn: { flex: 1 },
});