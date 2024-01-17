import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../lib/supabase';

type Profile = {
  id: number;
  updatedAt: Date;
  fullName: string;
  birthday: Date;
};

type GetProfileQueryParams = {
  id: string;
};

type UpdateProfileQueryParams = {
  id: string;
  name: string;
  familyName: string;
  birthday: Date;
};

const GET_PROFILE_QUERY_KEY = ['GetProfile'];
const UPDATE_PROFILE_QUERY_KEY = ['UpdateProfile'];

const fetchProfile = async (
  params: GetProfileQueryParams,
): Promise<Profile> => {
  const { data } = await supabase
    .from('profiles')
    .select()
    .eq('id', params.id)
    .single();
  return {
    id: data.id,
    updatedAt: new Date(data.updated_at),
    fullName: data.full_name,
    birthday: new Date(data.birthday),
  };
};

const updateProfile = async (
  params: UpdateProfileQueryParams,
): Promise<Profile> => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      updated_at: new Date(),
      full_name: `${params.name} ${params.familyName}`,
      birthday: params.birthday,
    })
    .eq('id', params.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    updatedAt: new Date(data.updated_at),
    fullName: data.full_name,
    birthday: new Date(data.birthday),
  };
};

export const useGetProfile = (params: GetProfileQueryParams) => {
  return useQuery<Profile, Error>({
    queryKey: GET_PROFILE_QUERY_KEY,
    queryFn: () => fetchProfile(params),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<Profile, Error, UpdateProfileQueryParams>({
    mutationKey: UPDATE_PROFILE_QUERY_KEY,
    mutationFn: updateProfile,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: GET_PROFILE_QUERY_KEY }),
  });
};
