import { Fontisto } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useFocusEffect, useRouter } from 'expo-router';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import abstract2 from '../../assets/images/abstract2.png';
import { useSession } from '../../contexts/auth';
import { useGetBirthdays } from '../../queries/birthday';

export default function TabOneScreen() {
  const router = useRouter();
  const { session } = useSession();
  const { data, isLoading, isError, refetch } = useGetBirthdays({
    id: session?.user.id || '',
  });

  const goToProfile = (fullName: string, birthday: string) => {
    router.push({ pathname: '/profile', params: { fullName, birthday } });
  };

  useFocusEffect(() => {
    refetch();
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching user</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <SectionList
        className="w-ful mt-4"
        sections={data || []}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-xl p-4 w-full flex flex-row items-center px-6"
            onPress={() =>
              goToProfile(
                item.fullName,
                item.date.toLocaleDateString('fr-fr', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'long',
                }),
              )
            }
          >
            <View className="h-12 w-12 bg-lightGray rounded-xl flex items-center justify-center">
              <Text className="text-dark font-bold">
                {item.fullName.split(' ')[0].charAt(0)}
                {item.fullName.split(' ')[1].charAt(0)}
              </Text>
            </View>
            <View className="ml-4">
              <View className="flex flex-row gap-1">
                <Text className="text-dark font-bold">{item.fullName}</Text>
              </View>
              <Text className="text-dark font-medium mt-1">
                {item.date.toLocaleDateString('fr-fr', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'long',
                })}
              </Text>
            </View>
            <Fontisto
              name="arrow-right"
              size={12}
              color="#2A2D32"
              className="ml-auto"
            />
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section }) => (
          <View className="bg-white py-2 mb-2 flex flex-row items-center w-full px-6">
            <View className="h-0.5 rounded-full w-24 bg-lightGray flex-1" />
            <Text className="font-heading text-dark ml-4 text-xl">
              {section.title}
            </Text>
          </View>
        )}
        ListHeaderComponent={HeaderList}
      />
    </View>
  );
}

function HeaderList() {
  return (
    <View>
      <Text className="font-heading text-dark text-2xl px-6">
        Les anniversaires à venir.
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="my-6"
      >
        <View className="rounded-xl self-start overflow-hidden ml-6">
          <ImageBackground source={abstract2}>
            <BlurView intensity={40} tint="dark">
              <View className="flex gap-6 p-6">
                <Text className="font-heading text-white text-2xl">
                  Dans 12 jours
                </Text>
                <View className="flex flex-row items-center gap-4">
                  <View className="h-16 w-16 bg-white rounded-xl flex items-center justify-center">
                    <Text className="text-dark text-lg font-bold">FL</Text>
                  </View>
                  <View className="flex">
                    <Text className="text-white text-2xl font-bold">
                      Florian
                    </Text>
                    <Text className="text-white text-2xl font-bold">
                      Rasoamanana
                    </Text>
                  </View>
                </View>
              </View>
            </BlurView>
          </ImageBackground>
        </View>
        <View className="rounded-xl self-start overflow-hidden ml-6">
          <ImageBackground source={abstract2}>
            <BlurView intensity={40} tint="dark">
              <View className="flex gap-6 p-6">
                <Text className="font-heading text-white text-2xl">
                  Dans 12 jours
                </Text>
                <View className="flex flex-row items-center gap-4">
                  <View className="h-16 w-16 bg-white rounded-xl flex items-center justify-center">
                    <Text className="text-dark text-lg font-bold">DD</Text>
                  </View>
                  <View className="flex">
                    <Text className="text-white text-2xl font-bold">
                      Damien
                    </Text>
                    <Text className="text-white text-2xl font-bold">
                      Dumontet
                    </Text>
                  </View>
                </View>
              </View>
            </BlurView>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
}
