
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'donor' | 'volunteer' | 'admin';
  phone?: string;
  location?: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('zwc_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    try {
      // Mock login - replace with AWS Cognito
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: role as 'donor' | 'volunteer' | 'admin',
      };
      
      setUser(mockUser);
      localStorage.setItem('zwc_user', JSON.stringify(mockUser));
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setLoading(true);
    try {
      // Mock registration - replace with AWS Cognito
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email!,
        name: userData.name!,
        role: userData.role!,
        phone: userData.phone,
        location: userData.location,
      };
      
      setUser(newUser);
      localStorage.setItem('zwc_user', JSON.stringify(newUser));
      
      // Redirect to home page after successful registration
      navigate('/');
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zwc_user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
