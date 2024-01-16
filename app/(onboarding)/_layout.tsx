import { Fontisto } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function OnboardingLayout() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

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
      <Stack.Screen
        name="family"
        options={{
          headerShadowVisible: false,
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={goBack} className="p-4">
              <Fontisto name="angle-left" size={16} color="#2A2D32" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="birthday"
        options={{
          headerShadowVisible: false,
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={goBack} className="p-4">
              <Fontisto name="angle-left" size={16} color="#2A2D32" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
