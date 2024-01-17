import Fontisto from '@expo/vector-icons/build/Fontisto';
import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeLayout() {
  const router = useRouter();

  const goToProfile = () => {
    router.push('/modal');
  };

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
          headerLeft: () => (
            <TouchableOpacity onPress={goToProfile} className="ml-4">
              <View className="h-10 w-10 bg-main rounded-full flex items-center justify-center">
                <Text className="font-medium text-dark">DD</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="profile"
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
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
