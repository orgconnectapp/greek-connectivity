
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  verifiedEmail: boolean;
  organization?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id' | 'verifiedEmail'> & { password: string }) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  requestJoinOrganization: (orgId: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - would come from API in real app
      if (email.endsWith('.edu') && password.length >= 6) {
        const user: User = {
          id: Math.random().toString(36).substring(2, 15),
          firstName: 'Test',
          lastName: 'User',
          email,
          phoneNumber: '555-555-5555',
          verifiedEmail: true
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (userData: Omit<User, 'id' | 'verifiedEmail'> & { password: string }) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email is .edu
      if (!userData.email.endsWith('.edu')) {
        throw new Error('Please use a valid school email (.edu)');
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        verifiedEmail: false // Would be false until verified
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // In a real app, this would send a verification email
      console.log('Verification email sent to', userData.email);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock verify email function
  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would validate the token with an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, verifiedEmail: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock request to join organization
  const requestJoinOrganization = async (orgId: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, organization: orgId };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        login, 
        signup, 
        logout, 
        verifyEmail,
        requestJoinOrganization
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
