import { Fontisto } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function AuthLayout() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="email"
        options={{
          headerShadowVisible: false,
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={goBack} className="ml-4">
              <Fontisto name="angle-left" size={16} color="#2A2D32" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="otp"
        options={{
          presentation: 'modal',
          headerShadowVisible: false,
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerRight: () => (
            <TouchableOpacity onPress={goBack} className="ml-4">
              <Fontisto name="close-a" size={16} color="#2A2D32" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
