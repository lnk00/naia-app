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

export default function FamilyScreen() {
  const [name, setName] = useState('');

  const nameInputRef = useRef<TextInput>();

  useEffect(() => {
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 800);
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 items-center w-full"
      >
        <Text className="font-heading text-dark text-center text-4xl font-bold max-w-72 mt-4">
          Renseigne ton nom.
        </Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center gap-4 px-12 w-full">
            <TextInput
              className="p-4 border-2 border-lightGray rounded-xl w-full"
              placeholder="Nom"
              autoComplete="family-name"
              autoCorrect={false}
              placeholderTextColor="rgba(42, 45, 50, 0.43)"
              selectionColor="#2A2D32"
              onChangeText={setName}
              ref={(elem) => {
                nameInputRef.current = elem as TextInput;
              }}
            />
            <TouchableOpacity
              className={
                'flex flex-row gap-2 items-center justify-center p-4 rounded-xl w-full ' +
                (name.length > 0 ? ' bg-main' : ' bg-lightGray opacity-50')
              }
              onPress={() => {}}
            >
              <Text className="text-dark font-semibold">Continuer</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
