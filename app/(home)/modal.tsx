/* eslint-disable prettier/prettier */
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import { useSession } from '../../contexts/auth';
import { useGetProfile } from '../../queries/profile';

export default function ModalScreen() {
  const { session } = useSession();
  const { data, isLoading, isError } = useGetProfile({
    id: session?.user.id || '',
  });
  const router = useRouter();
  const { signOut } = useSession();

  const signout = async () => {
    await signOut();
    router.replace('/(auth)');
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching user</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 flex-1 items-center">
        <View className="h-24 w-24 bg-lightGray rounded-xl flex items-center justify-center mt-4">
          <Text className="font-bold text-2xl text-dark">
            {data?.fullName.split(' ')[0].charAt(0)}
            {data?.fullName.split(' ')[1].charAt(0)}
          </Text>
        </View>
        <Text className="text-3xl font-bold text-dark mt-6">
          {data?.fullName}
        </Text>
        <View className="flex flex-row">
          <Text className="font-bold font-heading text-3xl text-main mt-1 shrink">
            {dayjs(data?.birthday)
              .utc()
              .format('DD MMMM YYYY')}
          </Text>
        </View>
        <View className="flex-1" />
        <TouchableOpacity
          className="flex flex-row gap-2 items-center justify-center p-4 bg-main rounded-xl w-full"
          onPress={signout}
        >
          <Text className="text-dark font-semibold">Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
