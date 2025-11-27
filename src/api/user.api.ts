export type User = {
  id:       number;
  name:     string;
  username: string;
  email:    string;
};

export const getUser: () => Promise<User[]> = () => fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
