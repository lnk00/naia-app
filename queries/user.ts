import { useQuery } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const QUERY_KEY = ['Users'];

const fetchUser = async (): Promise<User[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  return data;
};

export const useGetUsers = () => {
  return useQuery<User[], Error>({
    queryKey: QUERY_KEY,
    queryFn: fetchUser,
  });
};
