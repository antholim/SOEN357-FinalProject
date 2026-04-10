import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import 'react-native-reanimated';

if (Platform.OS === 'web' && typeof window !== 'undefined' && window.Element && window.Element.prototype.releasePointerCapture) {
  const originalReleasePointerCapture = window.Element.prototype.releasePointerCapture;
  window.Element.prototype.releasePointerCapture = function (pointerId: number) {
    try {
      if (this.hasPointerCapture(pointerId)) {
        originalReleasePointerCapture.call(this, pointerId);
      }
    } catch (e) {
      // Safely ignore Invalid pointer id errors from RNGH web
    }
  };
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        {/* <Stack.Screen name="menu" />
        <Stack.Screen name="game" />
        <Stack.Screen name="shortlist" /> */}
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
