import { User } from '../types';

// Sample user data for development
export const users: User[] = [
  {
    id: 'u1',
    email: 'admin@humbleautos.com',
    username: 'admin',
    isAdmin: true,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'u2',
    email: 'user@example.com',
    username: 'regularUser',
    isAdmin: false,
    createdAt: '2023-01-02T00:00:00Z',
  },
];

// In a real application, we would never store passwords in frontend code
// This is for demonstration purposes only
export const userCredentials = {
  'admin@humbleautos.com': 'admin123',
  'user@example.com': 'user123',
};