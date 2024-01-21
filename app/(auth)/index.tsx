import { Fontisto } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, View, SafeAreaView } from 'react-native';

import avatarParty from '../../assets/images/avatar-party.png';

export default function AuthScreen() {
  const router = useRouter();

  const goToEmailScreen = () => {
    router.push('/email');
  };

  return (
    <>
      <SafeAreaView className="bg-lightGray" />
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center bg-lightGray">
          <Text className="font-heading text-dark text-center text-5xl font-bold max-w-72 mt-12">
            Naia.
          </Text>
          <View className="w-full flex-1 relative flex items-center">
            <Image
              source={avatarParty}
              style={{ width: '100%', height: '100%' }}
              contentFit="contain"
              contentPosition="bottom"
            />
          </View>
          <View className="flex items-center bg-white w-full pt-8 rounded-t-3xl">
            <View className="w-screen relative flex items-center px-12">
              <Text className="font-heading text-dark text-center text-3xl font-bold max-w-72">
                Souviens toi des anniversaires.
              </Text>

              <TouchableOpacity
                className="flex flex-row gap-2 items-center justify-center p-4 border-2 border-lightGray rounded-xl mt-8 w-full"
                onPress={() => {
                  router.replace('/(home)');
                }}
              >
                <Fontisto name="email" size={24} color="#2A2D32" />
                <Text className="text-dark font-semibold">
                  Continuer avec Apple
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-row gap-2 items-center justify-center p-4 border-2 border-lightGray rounded-xl mt-4 w-full"
                onPress={goToEmailScreen}
              >
                <Fontisto name="email" size={24} color="#2A2D32" />
                <Text className="text-dark font-semibold">
                  Continuer avec Email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
