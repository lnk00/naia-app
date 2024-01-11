import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function EmailScreen() {
  const router = useRouter();
  const emailInputRef = useRef<TextInput>();

  useEffect(() => {
    emailInputRef.current!.focus();
  });

  const goToOtp = () => {
    router.push('/otp');
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 items-center w-full"
      >
        <Text className="font-heading text-dark text-center text-4xl font-bold max-w-72 mt-12">
          Renseigne ton adresse email.
        </Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center gap-4 px-12 w-full">
            <TextInput
              className="p-4 border-2 border-lightGray rounded w-full"
              placeholder="Adresse email"
              autoComplete="email"
              placeholderTextColor="rgba(42, 45, 50, 0.43)"
              onChangeText={() => {}}
              ref={(elem) => {
                emailInputRef.current = elem as TextInput;
              }}
            />
            <TouchableOpacity
              className="flex flex-row gap-2 items-center justify-center p-4 bg-main rounded w-full"
              onPress={goToOtp}
            >
              <Text className="text-dark font-semibold">Continuer</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
