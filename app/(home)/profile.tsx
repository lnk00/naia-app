import { Fontisto } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { router, useNavigation } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';

import { selectedBirthdayAtom } from '../../lib/store';
import { useDeleteBirthday, useUpdateBirthday } from '../../queries/birthday';

export default function ProfileScreen() {
  const [selectedBirthday, setSelectedBirthday] = useAtom(selectedBirthdayAtom);
  const navigation = useNavigation();
  const { mutateAsync: deleteBirthday } = useDeleteBirthday();
  const { mutateAsync: updateBirthday } = useUpdateBirthday();

  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', () => {
      updateBirthday({ updatedBirthday: selectedBirthday });
    });
    return unsub;
  }, [navigation, selectedBirthday]);

  const toggleSwitch = () => {
    setSelectedBirthday((prev) => ({
      ...prev,
      isReminderActivated: !prev?.isReminderActivated,
    }));
  };

  const onDelete = async () => {
    try {
      await deleteBirthday({ id: selectedBirthday.id });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = async () => {
    router.back();
  };

  const setGift = (value: boolean) => {
    setSelectedBirthday((prev) => ({
      ...prev,
      isGiftIdeaSet: value,
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity onPress={goBack} className="p-6">
        <Fontisto name="angle-left" size={16} color="#2A2D32" />
      </TouchableOpacity>
      <View className="px-6 flex-1 items-center">
        <View className="h-24 w-24 bg-lightGray rounded-xl flex items-center justify-center mt-4">
          <Text className="font-bold text-2xl text-dark">
            {selectedBirthday.fullName.split(' ')[0].charAt(0)}
            {selectedBirthday.fullName.split(' ')[1].charAt(0)}
          </Text>
        </View>
        <Text className="text-3xl font-bold text-dark mt-6">
          {selectedBirthday.fullName}
        </Text>
        <View className="flex flex-row">
          <Text className="font-bold font-heading text-3xl text-main mt-1 shrink">
            {dayjs(selectedBirthday.date).utc().format('DD MMMM YYYY')}
          </Text>
        </View>
        <View className="bg-lightGray rounded-xl p-4 mt-6 w-full">
          <Text className="font-medium text-lg">
            As tu pensé à une idée cadeau pour lui faire plaisir ?
          </Text>
          <View className="flex flex-row gap-2 mt-2">
            <TouchableOpacity
              className={
                'flex flex-row items-center justify-center p-2 rounded-xl flex-1 ' +
                (selectedBirthday.isGiftIdeaSet === true
                  ? ' bg-main'
                  : 'bg-white')
              }
              onPress={() => setGift(true)}
            >
              <Text className="text-dark text-lg font-semibold">Oui !</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={
                'flex flex-row items-center justify-center p-2 rounded-xl flex-1 ' +
                (selectedBirthday.isGiftIdeaSet === false
                  ? 'bg-main'
                  : 'bg-white')
              }
              onPress={() => setGift(false)}
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
            value={selectedBirthday.isReminderActivated}
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
