import { Fontisto } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, View, SafeAreaView } from 'react-native';

import avatarParty from '../../assets/images/avatar-party.png';
import { useSession } from '../../contexts/auth';

export default function AuthScreen() {
  const router = useRouter();
  const { signInWithApple } = useSession();

  const goToEmailScreen = () => {
    router.push('/email');
  };

  const onAppleSignin = async () => {
    const { error, isUserNew } = await signInWithApple();

    if (error) {
      return;
    }

    if (isUserNew) {
      router.replace('/(onboarding)');
    } else {
      router.replace('/(home)');
    }
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
              <Text className="font-heading text-dark text-center text-3xl font-bold max-w-72 mb-8">
                Souviens toi des anniversaires.
              </Text>

              <TouchableOpacity
                className="flex flex-row gap-2 items-center justify-center p-4 border-2 border-lightGray rounded-xl mb-4 w-full"
                onPress={goToEmailScreen}
              >
                <Fontisto name="email" size={24} color="#2A2D32" />
                <Text className="text-dark font-semibold">
                  Continuer avec Email
                </Text>
              </TouchableOpacity>

              <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                  AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
                }
                buttonStyle={
                  AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                }
                style={{ height: 42, width: '100%' }}
                cornerRadius={8}
                onPress={onAppleSignin}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
