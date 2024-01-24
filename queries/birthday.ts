import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { supabase } from '../lib/supabase';

export type BirthdayGroup = {
  title: string;
  data: Birthday[];
};

export type Birthday = {
  id: string;
  fullName: string;
  date: Date;
  normalizedDate: Date;
  isReminderActivated: boolean;
  isGiftIdeaSet?: boolean;
};

type GetBirthdaysQueryParams = {
  userId?: string;
};

type DeleteBirthdayQueryParams = {
  id: string;
};

type InsertBirthdayQueryParams = {
  user_id: string;
  name: string;
  familyName: string;
  date: Date;
};

type UpdateBirthdayQueryParams = {
  updatedBirthday: Pick<
    Birthday,
    'id' | 'isReminderActivated' | 'isGiftIdeaSet'
  >;
};

const GET_BIRTHDAYS_QUERY_KEY = ['GetBirthdays'];
const INSERT_BIRTHDAY_QUERY_KEY = ['InsertBirthday'];
const DELETE_BIRTHDAY_QUERY_KEY = ['DeleteBirthday'];
const UPDATE_BIRTHDAY_QUERY_KEY = ['UpdateBirthday'];

const fetchBirthdays = async (
  params: GetBirthdaysQueryParams,
): Promise<Birthday[]> => {
  if (!params.userId) return [];
  const { data } = await supabase
    .from('birthdays')
    .select()
    .eq('user_id', params.userId)
    .order('normalized_date');

  const bdays: Birthday[] = [];

  data?.forEach((bday) => {
    bdays.push({
      id: bday.id,
      fullName: bday.full_name,
      date: new Date(bday.date),
      normalizedDate: new Date(bday.normalized_date),
      isReminderActivated: bday.is_reminder_activated,
      isGiftIdeaSet: bday.is_gift_idea_set,
    });
  });

  return bdays;
};

const addBirthday = async (
  params: InsertBirthdayQueryParams,
): Promise<Birthday> => {
  const normalized_date = new Date(params.date.getTime());
  normalized_date.setFullYear(2000);
  const { data, error } = await supabase
    .from('birthdays')
    .insert({
      full_name: `${params.name} ${params.familyName}`,
      date: params.date,
      normalized_date,
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
    normalizedDate: new Date(data.normalized_date),
    isReminderActivated: data.is_reminder_activated,
    isGiftIdeaSet: data.is_gift_idea_set,
  };
};

const deleteBirthday = async (
  params: DeleteBirthdayQueryParams,
): Promise<void> => {
  const { error } = await supabase
    .from('birthdays')
    .delete()
    .eq('id', params.id);

  if (error) {
    throw new Error(error.message);
  }
};

const updateBirthday = async (
  params: UpdateBirthdayQueryParams,
): Promise<void> => {
  const { error } = await supabase
    .from('birthdays')
    .update({
      is_reminder_activated: params.updatedBirthday.isReminderActivated,
      is_gift_idea_set: params.updatedBirthday.isGiftIdeaSet,
    })
    .eq('id', params.updatedBirthday.id);

  if (error) {
    throw new Error(error.message);
  }
};

// eslint-disable-next-line prettier/prettier
export const useGetBirthdays = <TData = Birthday[],>(
  params: GetBirthdaysQueryParams,
  select?: (data: Birthday[]) => TData,
) => {
  return useQuery<Birthday[], Error, TData>({
    queryKey: [GET_BIRTHDAYS_QUERY_KEY, params.userId],
    queryFn: () => fetchBirthdays(params),
    select,
  });
};

export const useGetBirthdaysGroup = (params: GetBirthdaysQueryParams) => {
  return useGetBirthdays<BirthdayGroup[]>(params, (data) => {
    const groups: BirthdayGroup[] = [];

    data?.forEach((bday) => {
      const groupExist = groups.find(
        (group) => group.title === dayjs(bday.date).utc().format('MMMM'),
      );

      if (!groupExist) {
        groups.push({
          title: dayjs(bday.date).utc().format('MMMM'),
          data: [
            {
              id: bday.id,
              fullName: bday.fullName,
              date: new Date(bday.date),
              normalizedDate: new Date(bday.normalizedDate),
              isReminderActivated: bday.isReminderActivated,
              isGiftIdeaSet: bday.isGiftIdeaSet,
            },
          ],
        });
      } else {
        groupExist.data.push({
          id: bday.id,
          fullName: bday.fullName,
          date: new Date(bday.date),
          normalizedDate: new Date(bday.normalizedDate),
          isReminderActivated: bday.isReminderActivated,
          isGiftIdeaSet: bday.isGiftIdeaSet,
        });
      }
    });

    return groups;
  });
};

export const useGetUpcommingBirthdays = (params: GetBirthdaysQueryParams) => {
  return useGetBirthdays(params, (data) => {
    const upcomming = data
      .filter((bday) => {
        const normalizedCurrentDate = dayjs().year(
          dayjs(bday.normalizedDate).year(),
        );
        return dayjs(bday.normalizedDate).isAfter(normalizedCurrentDate);
      })
      .slice(0, 3);

    return upcomming;
  });
};

export const useInsertBirthday = () => {
  const queryClient = useQueryClient();

  return useMutation<Birthday, Error, InsertBirthdayQueryParams>({
    mutationKey: INSERT_BIRTHDAY_QUERY_KEY,
    mutationFn: addBirthday,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [GET_BIRTHDAYS_QUERY_KEY] }),
  });
};

export const useDeleteBirthday = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteBirthdayQueryParams>({
    mutationKey: DELETE_BIRTHDAY_QUERY_KEY,
    mutationFn: deleteBirthday,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [GET_BIRTHDAYS_QUERY_KEY] }),
  });
};

export const useUpdateBirthday = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateBirthdayQueryParams>({
    mutationKey: UPDATE_BIRTHDAY_QUERY_KEY,
    mutationFn: updateBirthday,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [GET_BIRTHDAYS_QUERY_KEY] }),
  });
};
