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
      <View className="px-6 flex-1">
        <View className="h-24 w-24 bg-main rounded-full flex items-center justify-center mt-4">
          <Text className="font-bold text-2xl text-dark">DD</Text>
        </View>
        <Text className="font-heading text-5xl text-dark mt-4">
          {data?.fullName.split(' ')[0]}
        </Text>
        <Text className="font-heading text-5xl text-dark">
          {data?.fullName.split(' ')[1]}
        </Text>
        <View className="flex flex-row gap-2 ">
          <Text className="font-bold text-4xl text-dark mt-4">Né le,</Text>
          <Text className="font-bold font-heading text-4xl text-main mt-4">
            {data?.birthday.toLocaleDateString('fr-fr')}
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
