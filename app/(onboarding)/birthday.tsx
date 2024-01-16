import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';

export default function NameScreen() {
  const params = useLocalSearchParams<{ name: string; familyName: string }>();
  const router = useRouter();
  const [date, setDate] = useState(new Date());

  const onChange = (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    console.log('NAME: ', params.name);
    console.log('FAMILY NAME: ', params.familyName);
    console.log('BIRTHDAY: ', date);
  };

  const onContinue = () => {
    router.push('/family');
  };

  return (
    <SafeAreaView className="bg-white flex-1 items-center">
      <Text className="font-heading text-dark text-center text-4xl font-bold max-w-72 mt-4">
        Renseigne ta date de naissance.
      </Text>
      <View className="px-12 flex-1 justify-center w-full">
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
          onPress={onContinue}
        >
          <Text className="text-dark font-semibold">Continuer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
