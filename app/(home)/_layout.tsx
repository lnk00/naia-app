import Fontisto from '@expo/vector-icons/build/Fontisto';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function HomeLayout() {
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
        name="profile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          headerShadowVisible: false,
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerRight: () => (
            <TouchableOpacity onPress={goBack} className="p-4">
              <Fontisto name="close-a" size={16} color="#2A2D32" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="addBirthday"
        options={{
          presentation: 'modal',
          headerShadowVisible: false,
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerRight: () => (
            <TouchableOpacity onPress={goBack} className="p-4">
              <Fontisto name="close-a" size={16} color="#2A2D32" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
