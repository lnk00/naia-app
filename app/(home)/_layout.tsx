import Fontisto from '@expo/vector-icons/build/Fontisto';
import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeLayout() {
  const router = useRouter();

  const goToProfile = () => {
    router.push('/modal');
  };

  const goToAddBirthday = () => {
    router.push('/(home)/addBirthday');
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
            <TouchableOpacity onPress={goToProfile}>
              <View className="h-12 w-12 bg-main rounded-xl flex items-center justify-center">
                <Text className="font-medium text-dark">DD</Text>
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              className="bg-dark h-12 w-12 rounded-xl flex items-center justify-center"
              onPress={goToAddBirthday}
            >
              <Fontisto name="plus-a" size={16} color="#83F9D6" />
            </TouchableOpacity>
          ),
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
