import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';

import { useDeleteBirthday } from '../../queries/birthday';

export default function ModalScreen() {
  const { mutateAsync: deleteBirthday } = useDeleteBirthday();
  const params = useLocalSearchParams<{
    fullName: string;
    birthday: string;
    id: string;
  }>();

  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  const onDelete = async () => {
    try {
      await deleteBirthday({ id: params.id });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 flex-1 items-center">
        <View className="h-24 w-24 bg-lightGray rounded-xl flex items-center justify-center mt-4">
          <Text className="font-bold text-2xl text-dark">
            {params.fullName.split(' ')[0].charAt(0)}
            {params.fullName.split(' ')[1].charAt(0)}
          </Text>
        </View>
        <Text className="text-3xl font-bold text-dark mt-6">
          {params.fullName}
        </Text>
        <View className="flex flex-row">
          <Text className="font-bold font-heading text-3xl text-main mt-1 shrink">
            {params.birthday}
          </Text>
        </View>
        <View className="bg-lightGray rounded-xl p-4 mt-6 w-full">
          <Text className="font-medium text-lg">
            As tu pensé à une idée cadeau pour lui faire plaisir ?
          </Text>
          <View className="flex flex-row gap-2 mt-2">
            <TouchableOpacity
              className="flex flex-row items-center justify-center p-2 bg-white rounded-xl flex-1"
              onPress={() => {}}
            >
              <Text className="text-dark text-lg font-semibold">Oui !</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center justify-center p-2 bg-white rounded-xl flex-1"
              onPress={() => {}}
            >
              <Text className="text-dark text-lg font-semibold">
                Pas encore
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row items-center w-full p-4 border-2 rounded-xl border-lightGray mt-6">
          <Text className="font-medium text-lg">Rappel activé</Text>
          <Switch
            className="ml-auto"
            trackColor={{ false: '#EFF1F6', true: '#83F9D6' }}
            thumbColor="#ffffff"
            ios_backgroundColor="#EFF1F6"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View className="flex-1" />
        <TouchableOpacity
          className="flex flex-row items-center justify-center p-4 bg-white rounded-xl w-full"
          onPress={onDelete}
        >
          <Text className="text-red-400 text-xl font-semibold">Supprimer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
