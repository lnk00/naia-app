import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';

export default function OtpScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs: (TextInput | null)[] = [];

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < newOtp.length - 1) {
      inputs[index + 1]!.focus();
    } else if (value && index === newOtp.length - 1) {
      Keyboard.dismiss();
    }
  };

  const verifyOtp = () => {
    router.replace('/(tabs)');
  };

  useEffect(() => {
    inputs[0]!.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white items-center"
    >
      <Text className="font-heading text-dark text-center text-4xl font-bold max-w-72 mt-12">
        Rentre le code reçu sur ton adresse email.
      </Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center w-full p-12">
          <View className="flex flex-row justify-between items-center">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                className="w-12 h-12 border-2 border-lightGray rounded-xl text-center"
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(value) => handleOtpChange(value, index)}
                value={digit}
                selectionColor="#2A2D32"
                ref={(input) => {
                  inputs[index] = input;
                }}
              />
            ))}
          </View>
          <TouchableOpacity
            className="flex flex-row gap-2 items-center justify-center p-4 bg-main rounded-xl w-full mt-4"
            onPress={verifyOtp}
          >
            <Text className="text-dark font-semibold">Continuer</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
