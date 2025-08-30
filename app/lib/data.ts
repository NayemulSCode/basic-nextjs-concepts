import fs from 'fs';
import path from 'path';

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

const dataFilePath = path.join(process.cwd(), 'app/lib/data.json');

export function readUsers(): User[] {
  try {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading users data:', error);
    return [];
  }
}

export function writeUsers(users: User[]): void {
  try {
    const jsonData = JSON.stringify(users, null, 2);
    fs.writeFileSync(dataFilePath, jsonData, 'utf-8');
  } catch (error) {
    console.error('Error writing users data:', error);
  }
}
