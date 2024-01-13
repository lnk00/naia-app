import Fontisto from '@expo/vector-icons/build/Fontisto';
import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeLayout() {
  const router = useRouter();

  const goToProfile = () => {
    router.push('/modal');
  };

  const goToSearch = () => {
    router.push('/modal');
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          title: '',
          headerRight: () => (
            <TouchableOpacity onPress={goToSearch} className="mr-4">
              <Fontisto name="search" size={24} color="#2A2D32" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={goToProfile} className="ml-4">
              <View className="h-10 w-10 bg-main rounded-full flex items-center justify-center">
                <Text className="font-medium text-dark">DD</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
