import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
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
import validator from 'validator';

import { useSession } from '../../contexts/auth';

export default function EmailScreen() {
  const router = useRouter();
  const { signInWithOtp } = useSession();

  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isAuthError, setIsAuthError] = useState(false);

  const emailInputRef = useRef<TextInput>();

  useEffect(() => {
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 800);
  }, []);

  const validateEmail = (inputValue: string) => {
    setEmail(inputValue);
    if (validator.isEmail(inputValue)) {
      setDisabled(false);
      return;
    }

    setDisabled(true);
  };

  const onSignin = async () => {
    setDisabled(true);
    const { error } = await signInWithOtp(email);

    if (error) {
      setIsAuthError(true);
      setTimeout(() => {
        setDisabled(false);
        setIsAuthError(false);
      }, 5000);
      return;
    }

    setDisabled(false);

    router.push({ pathname: '/otp', params: { email } });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 items-center w-full"
      >
        <Text className="font-heading text-dark text-center text-4xl font-bold max-w-72 mt-4">
          Renseigne ton adresse email.
        </Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center gap-4 px-12 w-full">
            <TextInput
              className={
                'p-4 border-2 border-lightGray rounded-xl w-full ' +
                (isAuthError ? 'border-red-400' : 'border-lightGray')
              }
              placeholder="Adresse email"
              autoComplete="email"
              autoCorrect={false}
              autoCapitalize="none"
              placeholderTextColor="rgba(42, 45, 50, 0.43)"
              selectionColor="#2A2D32"
              onChangeText={validateEmail}
              ref={(elem) => {
                emailInputRef.current = elem as TextInput;
              }}
            />
            <TouchableOpacity
              disabled={disabled}
              className={
                'flex flex-row gap-2 items-center justify-center p-4 rounded-xl w-full ' +
                (disabled ? ' bg-lightGray opacity-50' : ' bg-main')
              }
              onPress={onSignin}
            >
              <Text className="text-dark font-semibold">Continuer</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
