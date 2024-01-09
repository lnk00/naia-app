import { useRouter } from 'expo-router';
import { Button, Text, SafeAreaView } from 'react-native';

export default function AuthScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-4xl font-bold">Auth</Text>
      <Button
        onPress={() => {
          router.push('/email');
        }}
        title="Continue with email"
        accessibilityLabel="Continue with email"
      />
    </SafeAreaView>
  );
}
