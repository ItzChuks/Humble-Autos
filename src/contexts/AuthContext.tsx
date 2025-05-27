import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, LoginFormValues, RegisterFormValues } from '../types';
import { users, userCredentials } from '../data/users';

interface AuthContextType extends AuthState {
  login: (data: LoginFormValues) => Promise<void>;
  register: (data: RegisterFormValues) => Promise<void>;
  logout: () => void;
}

const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType>({
  ...defaultAuthState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
        setAuthState({
          ...defaultAuthState,
          isLoading: false,
        });
      }
    } else {
      setAuthState({
        ...defaultAuthState,
        isLoading: false,
      });
    }
  }, []);

  // Mock login function
  const login = async (data: LoginFormValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be a backend API call
      const { email, password } = data;
      
      // Check if user exists and password matches
      const storedPassword = (userCredentials as Record<string, string>)[email];
      
      if (!storedPassword || storedPassword !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Find user by email
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Set auth state
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
    } catch (error) {
      setAuthState({
        ...authState,
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  };

  // Mock register function
  const register = async (data: RegisterFormValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be a backend API call
      const { email, username, password } = data;
      
      // Check if email already exists
      if ((userCredentials as Record<string, string>)[email]) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser: User = {
        id: `u${users.length + 1}`,
        email,
        username,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      };
      
      // In a real app, we would save this to a database
      // For this demo, we'll just update our in-memory arrays
      users.push(newUser);
      (userCredentials as Record<string, string>)[email] = password;
      
      // Set auth state
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      
    } catch (error) {
      setAuthState({
        ...authState,
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};