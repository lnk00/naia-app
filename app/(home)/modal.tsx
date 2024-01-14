import { useRouter } from 'expo-router';
import { View, Button } from 'react-native';

import { supabase } from '../../lib/supabase';

export default function ModalScreen() {
  const router = useRouter();

  const signout = async () => {
    await supabase.auth.signOut();
    router.replace('/(auth)');
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Button onPress={signout} title="Signout" accessibilityLabel="Signout" />
    </View>
  );
}
