import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, Keyboard } from 'react-native';

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
      router.replace('/(tabs)');
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex flex-row justify-center items-center gap-4">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            className="w-12 h-12 border rounded text-center"
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(value) => handleOtpChange(value, index)}
            value={digit}
            ref={(input) => {
              inputs[index] = input;
            }}
          />
        ))}
      </View>
    </View>
  );
}
