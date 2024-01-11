import { Fontisto } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, View } from 'react-native';

import authSplash from '../../assets/images/auth-splash.webp';

export default function AuthScreen() {
  const router = useRouter();

  const goToEmailScreen = () => {
    router.push('/email');
  };

  return (
    <View className="flex-1 items-center">
      <View className="h-full w-full relative">
        <Image
          source={authSplash}
          style={{ width: '100%', height: '100%' }}
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
            className="flex flex-row gap-2 items-center justify-center p-4 border-2 border-lightGray rounded mt-8 w-full"
            onPress={() => {}}
          >
            <Fontisto name="email" size={24} color="#2A2D32" />
            <Text className="text-dark font-semibold">
              Continuer avec Apple
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row gap-2 items-center justify-center p-4 border-2 border-lightGray rounded mt-4 w-full"
            onPress={goToEmailScreen}
          >
            <Fontisto name="email" size={24} color="#2A2D32" />
            <Text className="text-dark font-semibold">
              Continuer avec Email
            </Text>
          </TouchableOpacity>
          <View className="mt-8 flex flex-row gap-2 items-basline justify-center">
            <Text className="text-dark">Tu as déjà un compte ?</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text className="text-main">Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
