import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

type InsertBirthdayQueryParams = {
  user_id: string;
  name: string;
  familyName: string;
  date: Date;
};

const GET_BIRTHDAYS_QUERY_KEY = ['GetBirthdays'];
const INSERT_BIRTHDAY_QUERY_KEY = ['InsertBirthday'];

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

const addBirthday = async (
  params: InsertBirthdayQueryParams,
): Promise<Birthday> => {
  const { data, error } = await supabase
    .from('birthdays')
    .insert({
      full_name: `${params.name} ${params.familyName}`,
      date: params.date,
      user_id: params.user_id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    fullName: data.full_name,
    date: new Date(data.date),
  };
};

export const useGetBirthdays = (params: GetBirthdaysQueryParams) => {
  return useQuery<BirthdayGroup[], Error>({
    queryKey: [GET_BIRTHDAYS_QUERY_KEY, params.id],
    queryFn: () => fetchBirthdays(params),
  });
};

export const useInsertBirthday = () => {
  const queryClient = useQueryClient();

  return useMutation<Birthday, Error, InsertBirthdayQueryParams>({
    mutationKey: INSERT_BIRTHDAY_QUERY_KEY,
    mutationFn: addBirthday,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: GET_BIRTHDAYS_QUERY_KEY }),
  });
};
