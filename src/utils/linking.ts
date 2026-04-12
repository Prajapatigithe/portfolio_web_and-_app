import { Alert, Linking, Platform } from 'react-native';

export async function openExternalUrl(url: string): Promise<void> {
  if (!url || url.trim() === '') {
    Alert.alert('Error', 'No URL provided.');
    return;
  }

  try {
    if (Platform.OS === 'android') {
      // On Android, skip canOpenURL (unreliable for https on API 30+)
      await Linking.openURL(url);
    } else {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Cannot open link', 'This URL could not be opened on this device.');
      }
    }
  } catch {
    Alert.alert('Error', 'Something went wrong while opening the link.');
  }
}