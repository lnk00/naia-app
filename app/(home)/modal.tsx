import { useRouter } from 'expo-router';
import { View, Button } from 'react-native';

import { useSession } from '../../contexts/auth';

export default function ModalScreen() {
  const router = useRouter();
  const { signOut } = useSession();

  const signout = async () => {
    await signOut();
    router.replace('/(auth)');
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Button onPress={signout} title="Signout" accessibilityLabel="Signout" />
    </View>
  );
}
