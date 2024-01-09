import { useRouter } from 'expo-router';
import { View, Button } from 'react-native';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center">
      <Button
        onPress={() => {
          router.replace('/(auth)');
        }}
        title="Logout"
        accessibilityLabel="Logout"
      />
    </View>
  );
}
