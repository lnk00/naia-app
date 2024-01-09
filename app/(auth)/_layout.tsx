import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="email" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
