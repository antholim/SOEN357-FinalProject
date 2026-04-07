import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        {/* <Stack.Screen name="menu" />
        <Stack.Screen name="game" />
        <Stack.Screen name="shortlist" /> */}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
