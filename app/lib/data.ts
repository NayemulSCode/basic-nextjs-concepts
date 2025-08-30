export type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  email: string;
  password?: string | null;
  role: 'admin' | 'user';
  provider: 'credentials' | 'google';
};

export const users: User[] = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin',
    role: 'admin',
    provider: 'credentials',
  },
  {
    id: '2',
    firstName: 'Regular',
    lastName: 'User',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user',
    role: 'user',
    provider: 'credentials',
  },
];
