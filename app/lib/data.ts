import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  provider: 'credentials' | 'google';
}

// Path to the data.json file
const dataFilePath = path.join(process.cwd(), 'data.json');
console.log("🚀 ~ dataFilePath:", dataFilePath)

/**
 * Read users from data.json file
 * @returns Array of users
 */
export function readUsers(): User[] {
  try {
    // Check if file exists
    if (!fs.existsSync(dataFilePath)) {
      console.warn('data.json file not found, returning empty array');
      return [];
    }

    // Read and parse the file
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const users = JSON.parse(fileContents) as User[];
    
    return users;
  } catch (error) {
    console.error('Error reading users from data.json:', error);
    return [];
  }
}

/**
 * Write users to data.json file
 * @param users - Array of users to write
 * @returns boolean indicating success
 */
export function writeUsers(users: User[]): boolean {
  try {
    // Convert users array to JSON with proper formatting
    const jsonData = JSON.stringify(users, null, 2);
    
    // Write to file
    fs.writeFileSync(dataFilePath, jsonData, 'utf8');
    
    console.log('Users successfully written to data.json');
    return true;
  } catch (error) {
    console.error('Error writing users to data.json:', error);
    return false;
  }
}

/**
 * Find a user by email
 * @param email - User email to search for
 * @returns User object or undefined if not found
 */
export function findUserByEmail(email: string): User | undefined {
  const users = readUsers();
  return users.find(user => user.email === email);
}

/**
 * Find a user by ID
 * @param id - User ID to search for
 * @returns User object or undefined if not found
 */
export function findUserById(id: string): User | undefined {
  const users = readUsers();
  return users.find(user => user.id === id);
}

/**
 * Add a new user
 * @param user - User object to add
 * @returns boolean indicating success
 */
export function addUser(user: User): boolean {
  try {
    const users = readUsers();
    
    // Check if user with email already exists
    if (users.some(existingUser => existingUser.email === user.email)) {
      console.error('User with this email already exists');
      return false;
    }
    
    // Add new user
    users.push(user);
    
    return writeUsers(users);
  } catch (error) {
    console.error('Error adding user:', error);
    return false;
  }
}

/**
 * Update an existing user
 * @param id - User ID to update
 * @param updates - Partial user object with updates
 * @returns boolean indicating success
 */
export function updateUser(id: string, updates: Partial<User>): boolean {
  try {
    const users = readUsers();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      console.error('User not found');
      return false;
    }
    
    // Update user
    users[userIndex] = { ...users[userIndex], ...updates };
    
    return writeUsers(users);
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
}

/**
 * Delete a user by ID
 * @param id - User ID to delete
 * @returns boolean indicating success
 */
export function deleteUser(id: string): boolean {
  try {
    const users = readUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    
    if (filteredUsers.length === users.length) {
      console.error('User not found');
      return false;
    }
    
    return writeUsers(filteredUsers);
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}

/**
 * Get next available user ID
 * @returns string representing the next ID
 */
export function getNextUserId(): string {
  const users = readUsers();
  const maxId = users.reduce((max, user) => {
    const currentId = parseInt(user.id);
    return currentId > max ? currentId : max;
  }, 0);
  
  return (maxId + 1).toString();
}