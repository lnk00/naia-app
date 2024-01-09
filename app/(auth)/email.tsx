import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function EmailScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-4xl font-bold">Email</Text>
      <Button
        onPress={() => {
          router.push('/otp');
        }}
        title="Login"
        accessibilityLabel="Login"
      />
    </View>
  );
}
