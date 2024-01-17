import { useQuery } from '@tanstack/react-query';

import { supabase } from '../lib/supabase';

type Birthday = {
  id: string;
  fullName: string;
  date: Date;
};

type GetBirthdaysQueryParams = {
  id: string;
};

// type UpdateProfileQueryParams = {
//   id: string;
//   name: string;
//   familyName: string;
//   birthday: Date;
// };

const GET_BIRTHDAYS_QUERY_KEY = ['GetBirthdays'];
// const UPDATE_PROFILE_QUERY_KEY = ['UpdateProfile'];

const fetchBirthdays = async (
  params: GetBirthdaysQueryParams,
): Promise<Birthday[]> => {
  const { data } = await supabase
    .from('birthdays')
    .select()
    .eq('user_id', params.id);

  return (
    data?.map((item) => {
      return {
        id: item.id as string,
        fullName: item.full_name as string,
        date: new Date(item.date),
      };
    }) || []
  );
};

// const updateProfile = async (
//   params: UpdateProfileQueryParams,
// ): Promise<Profile> => {
//   const { data, error } = await supabase
//     .from('profiles')
//     .update({
//       updated_at: new Date(),
//       full_name: `${params.name} ${params.familyName}`,
//       birthday: params.birthday,
//     })
//     .eq('id', params.id)
//     .select()
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return {
//     id: data.id,
//     updatedAt: new Date(data.updated_at),
//     fullName: data.full_name,
//     birthday: new Date(data.birthday),
//   };
// };

export const useGetBirthdays = (params: GetBirthdaysQueryParams) => {
  return useQuery<Birthday[], Error>({
    queryKey: GET_BIRTHDAYS_QUERY_KEY,
    queryFn: () => fetchBirthdays(params),
  });
};

// export const useUpdateProfile = () => {
//   const queryClient = useQueryClient();

//   return useMutation<Profile, Error, UpdateProfileQueryParams>({
//     mutationKey: UPDATE_PROFILE_QUERY_KEY,
//     mutationFn: updateProfile,
//     onSuccess: () =>
//       queryClient.invalidateQueries({ queryKey: GET_PROFILE_QUERY_KEY }),
//   });
// };
