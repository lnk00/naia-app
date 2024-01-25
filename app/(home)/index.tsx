import { Fontisto } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import abstract from '../../assets/images/abstract3.png';
import { useSession } from '../../contexts/auth';
import { selectedBirthdayAtom } from '../../lib/store';
import {
  Birthday,
  useGetBirthdaysGroup,
  useGetUpcommingBirthdays,
} from '../../queries/birthday';

export default function TabOneScreen() {
  const router = useRouter();
  const { session } = useSession();
  const [, setSelectedBirthday] = useAtom(selectedBirthdayAtom);
  const { data, isLoading, isError } = useGetBirthdaysGroup({
    userId: session?.user.id,
  });
  const { data: upcomminBirthdays } = useGetUpcommingBirthdays({
    userId: session?.user.id,
  });

  const goToProfile = (bday: Birthday) => {
    setSelectedBirthday(bday);
    router.push('/profile');
  };

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
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-xl p-4 w-full flex flex-row items-center px-6"
            onPress={() => goToProfile(item)}
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
                {dayjs(item.date).utc().format('DD MMMM YYYY')}
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
        ListHeaderComponent={() => HeaderList(upcomminBirthdays)}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
}

function EmptyComponent() {
  const router = useRouter();

  return (
    <View className="flex items-center justify-center flex-1 w-screen px-6">
      <View className="bg-lightGray rounded-xl p-4 mt-6 w-full">
        <Text className="font-medium text-lg">
          Tu n’as pas encore ajouté d’anniversaire, clique sur le bouton pour en
          ajouter et ne pas oublier de le souhaiter.
        </Text>
        <View className="flex flex-row gap-2 mt-4">
          <TouchableOpacity
            className="flex flex-row gap-2 items-center justify-center p-4 rounded-xl w-full bg-main"
            onPress={() => router.push('/(home)/addBirthday')}
          >
            <Text className="text-dark font-semibold">Ajouter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function HeaderList(bdays?: Birthday[]) {
  const normalizedCurrentDate = dayjs().year(2000);
  if (bdays?.length === 0) return;
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
        {bdays?.map((bday, i) => (
          <View key={i} className="rounded-xl self-start overflow-hidden ml-6">
            <ImageBackground source={abstract}>
              <BlurView intensity={20} tint="dark">
                <View className="flex gap-4 p-4">
                  <Text className="text-white font-medium text-xl">
                    Dans{' '}
                    {Math.abs(
                      normalizedCurrentDate.diff(
                        dayjs(bday.date).year(2000),
                        'day',
                      ),
                    )}{' '}
                    jours
                  </Text>
                  <View className="flex flex-row items-center gap-4">
                    <View className="h-12 w-12 bg-white rounded-xl flex items-center justify-center">
                      <Text className="text-dark text-lg font-bold">
                        {bday.fullName.split(' ')[0].charAt(0)}
                        {bday.fullName.split(' ')[1].charAt(0)}
                      </Text>
                    </View>
                    <View className="flex">
                      <Text className="text-white text-xl font-bold">
                        {bday.fullName.split(' ')[0]}
                      </Text>
                      <Text className="text-white text-xl font-bold">
                        {bday.fullName.split(' ')[1]}
                      </Text>
                    </View>
                  </View>
                </View>
              </BlurView>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
