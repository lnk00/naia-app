import { Stack } from 'expo-router';

export default function OboardingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Stack>
  );
}
