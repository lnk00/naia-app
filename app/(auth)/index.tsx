import { Fontisto } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, View } from 'react-native';

import horseBalloon from '../../assets/images/horse-balloon.png';

export default function AuthScreen() {
  const router = useRouter();

  const goToEmailScreen = () => {
    router.push('/email');
  };

  return (
    <View className="flex-1 items-center">
      <View className="h-full w-full flex-1 items-center justify-center relative bg-main">
        <Image
          source={horseBalloon}
          style={{ width: '70%', height: '75%' }}
          contentFit="contain"
          contentPosition="top"
        />
      </View>
      <View className="flex items-center bg-white w-[600px] pt-16 pb-16 rounded-t-full absolute bottom-0">
        <View className="w-screen relative flex items-center px-12">
          <Text className="font-heading text-dark text-center text-4xl font-bold max-w-72">
            Retrouve le plaisir d&apos;offrir.
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
  );
}
