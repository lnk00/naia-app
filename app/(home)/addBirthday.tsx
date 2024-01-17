import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import { useSession } from '../../contexts/auth';
import { useInsertBirthday } from '../../queries/birthday';

export default function AddBirthdayScreen() {
  const router = useRouter();
  const { session } = useSession();
  const { mutateAsync: insertBirthday } = useInsertBirthday();

  const [date, setDate] = useState(new Date());
  const [familyName, setFamilyName] = useState('');
  const [name, setName] = useState('');

  const onChange = (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onAdd = async () => {
    try {
      await insertBirthday({
        user_id: session?.user.id || '',
        name,
        familyName,
        date,
      });

      router.push('/(home)');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 items-center">
      <Text className="font-heading text-dark text-center text-4xl font-bold max-w-72 mt-4">
        Ajoute un anniversaire.
      </Text>
      <View className="px-12 flex-1 justify-center w-full">
        <TextInput
          className="p-4 border-2 border-lightGray rounded-xl w-full"
          placeholder="Prénom"
          autoComplete="given-name"
          autoCorrect={false}
          placeholderTextColor="rgba(42, 45, 50, 0.43)"
          selectionColor="#2A2D32"
          onChangeText={setName}
        />
        <TextInput
          className="p-4 border-2 border-lightGray rounded-xl w-full mt-4"
          placeholder="Nom"
          autoComplete="family-name"
          autoCorrect={false}
          placeholderTextColor="rgba(42, 45, 50, 0.43)"
          selectionColor="#2A2D32"
          onChangeText={setFamilyName}
        />
        <DateTimePicker
          mode="date"
          display="spinner"
          textColor="#2A2D32"
          themeVariant="dark"
          locale="fr-FR"
          onChange={onChange}
          value={date}
        />
        <TouchableOpacity
          className="flex flex-row gap-2 items-center justify-center p-4 rounded-xl mt-4 w-full bg-main"
          onPress={onAdd}
        >
          <Text className="text-dark font-semibold">Continuer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
