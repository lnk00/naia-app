import { useLocalSearchParams } from 'expo-router';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

export default function ModalScreen() {
  const params = useLocalSearchParams<{ fullName: string; birthday: string }>();
  const sendMessage = () => {
    console.log('Send message');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 flex-1">
        <View className="h-24 w-24 bg-main rounded-full flex items-center justify-center mt-4">
          <Text className="font-bold text-2xl text-dark">
            {params.fullName.split(' ')[0].charAt(0)}
            {params.fullName.split(' ')[1].charAt(0)}
          </Text>
        </View>
        <Text className="font-heading text-5xl text-dark mt-4">
          {params.fullName.split(' ')[0]}
        </Text>
        <Text className="font-heading text-5xl text-dark">
          {params.fullName.split(' ')[1]}
        </Text>
        <View className="flex flex-row gap-2 ">
          <Text className="font-bold text-4xl text-dark mt-4">Né le,</Text>
          <Text className="font-bold font-heading text-4xl text-main mt-4">
            {params.birthday}
          </Text>
        </View>
        <View className="flex-1" />
        <TouchableOpacity
          className="flex flex-row gap-2 items-center justify-center p-4 bg-main rounded-xl w-full"
          onPress={sendMessage}
        >
          <Text className="text-dark font-semibold">Désactiver le rappel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
