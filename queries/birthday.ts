import { useQuery } from '@tanstack/react-query';

import { supabase } from '../lib/supabase';

type BirthdayGroup = {
  title: string;
  data: Birthday[];
};

type Birthday = {
  id: string;
  fullName: string;
  date: Date;
};

type GetBirthdaysQueryParams = {
  id: string;
};

const GET_BIRTHDAYS_QUERY_KEY = ['GetBirthdays'];

const fetchBirthdays = async (
  params: GetBirthdaysQueryParams,
): Promise<BirthdayGroup[]> => {
  const { data } = await supabase
    .from('birthdays')
    .select()
    .eq('user_id', params.id);

  const groups: BirthdayGroup[] = [];

  data?.forEach((bday) => {
    const groupExist = groups.find(
      (group) =>
        group.title ===
        new Date(bday.date).toLocaleDateString('fr-fr', { month: 'long' }),
    );

    if (!groupExist) {
      groups.push({
        title: new Date(bday.date).toLocaleDateString('fr-fr', {
          month: 'long',
        }),
        data: [
          { id: bday.id, fullName: bday.full_name, date: new Date(bday.date) },
        ],
      });
    } else {
      groupExist.data.push({
        id: bday.id,
        fullName: bday.full_name,
        date: new Date(bday.date),
      });
    }
  });

  return groups;
};

export const useGetBirthdays = (params: GetBirthdaysQueryParams) => {
  return useQuery<BirthdayGroup[], Error>({
    queryKey: [GET_BIRTHDAYS_QUERY_KEY, params.id],
    queryFn: () => fetchBirthdays(params),
  });
};
