import { Fontisto } from '@expo/vector-icons';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';

export default function TabOneScreen() {
  const DATA = [
    {
      month: 'Février',
      data: [
        {
          name: 'Damien',
          familyName: 'Dumontet',
          birthday: new Date(1995, 0, 24),
        },
        {
          name: 'Alexandre',
          familyName: 'Machelon',
          birthday: new Date(1995, 11, 22),
        },
        {
          name: 'Florian',
          familyName: 'Rasoamanana',
          birthday: new Date(1995, 7, 12),
        },
      ],
    },
    {
      month: 'Avril',
      data: [
        {
          name: 'Damien',
          familyName: 'Dumontet',
          birthday: new Date(1995, 0, 24),
        },
        {
          name: 'Alexandre',
          familyName: 'Machelon',
          birthday: new Date(1995, 11, 22),
        },
        {
          name: 'Florian',
          familyName: 'Rasoamanana',
          birthday: new Date(1995, 7, 12),
        },
      ],
    },
    {
      month: 'Septembre',
      data: [
        {
          name: 'Damien',
          familyName: 'Dumontet',
          birthday: new Date(1995, 0, 24),
        },
        {
          name: 'Alexandre',
          familyName: 'Machelon',
          birthday: new Date(1995, 11, 22),
        },
        {
          name: 'Florian',
          familyName: 'Rasoamanana',
          birthday: new Date(1995, 7, 12),
        },
      ],
    },
  ];

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <SectionList
        className="w-full"
        sections={DATA}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-main rounded-xl p-4 w-full mb-2 flex flex-row items-center">
            <View className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <Text className="text-main font-bold">DD</Text>
            </View>
            <View className="ml-4">
              <View className="flex flex-row gap-1">
                <Text className="text-dark font-bold">{item.name}</Text>
                <Text className="text-dark font-bold">{item.familyName}</Text>
              </View>
              <Text className="text-dark font-medium mt-1">
                {item.birthday.toLocaleDateString('fr-fr', {
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
          <View className="bg-white py-2 mb-2 flex flex-row items-center w-full">
            <View className="h-0.5 rounded-full w-24 bg-lightGray flex-1" />
            <Text className="font-heading text-dark ml-4 text-xl">
              {section.month}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
