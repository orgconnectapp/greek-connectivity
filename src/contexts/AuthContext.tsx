import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  verifiedEmail: boolean;
  organization?: string;
  profilePicture?: string;
  memberType?: 'active' | 'alumni';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id' | 'verifiedEmail'> & { password: string }) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  requestJoinOrganization: (organizationId: string) => Promise<void>;
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

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email.endsWith('.edu') && password.length >= 6) {
        const user: User = {
          id: Math.random().toString(36).substring(2, 15),
          firstName: 'Test',
          lastName: 'User',
          email,
          phoneNumber: '555-555-5555',
          verifiedEmail: true,
          organization: 'AXA Phi Alpha Zeta' // Default organization for demo
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

  const signup = async (userData: Omit<User, 'id' | 'verifiedEmail'> & { password: string }) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!userData.email.endsWith('.edu')) {
        throw new Error('Please use a valid school email (.edu)');
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        verifiedEmail: false,
        organization: userData.organization,
        profilePicture: userData.profilePicture,
        memberType: userData.memberType
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      console.log('Verification email sent to', userData.email);
      console.log('User signup successful, redirecting to message board');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('User logged out successfully');
  };

  const requestJoinOrganization = async (organizationId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Request to join organization ${organizationId} submitted`);
      // In a real app, this would make an API call to request joining the organization
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
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
