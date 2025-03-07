
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

interface User {
  _id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  googleLogin: () => void;
  logout: () => void;
  updatePassword: (password: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    setIsLoading(true);
    const response = await api.user.getProfile(authToken);
    
    if (response.success && response.user) {
      setUser(response.user);
    } else {
      logout();
      toast({
        title: "Session expired",
        description: "Please login again",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const response = await api.auth.login(email, password);
    
    if (response.success && response.token) {
      setToken(response.token);
      localStorage.setItem('token', response.token);
      await fetchUserProfile(response.token);
      
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      return true;
    } else {
      toast({
        title: "Login failed",
        description: response.message || "Invalid credentials",
        variant: "destructive"
      });
      
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    const response = await api.auth.register(email, password);
    
    if (response.success && response.token) {
      setToken(response.token);
      localStorage.setItem('token', response.token);
      await fetchUserProfile(response.token);
      
      toast({
        title: "Account created",
        description: "Your account has been successfully created.",
      });
      
      return true;
    } else {
      toast({
        title: "Registration failed",
        description: response.message || "Could not create account",
        variant: "destructive"
      });
      
      setIsLoading(false);
      return false;
    }
  };

  const googleLogin = () => {
    api.auth.googleLogin();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const updatePassword = async (password: string) => {
    if (!user || !token) return false;
    
    const response = await api.user.updatePassword(user._id, token, password);
    
    if (response.success) {
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
      return true;
    } else {
      toast({
        title: "Update failed",
        description: response.message || "Could not update password",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteAccount = async () => {
    if (!user || !token) return false;
    
    const response = await api.user.deleteAccount(user._id, token);
    
    if (response.success) {
      logout();
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });
      return true;
    } else {
      toast({
        title: "Delete failed",
        description: response.message || "Could not delete account",
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      register,
      googleLogin,
      logout,
      updatePassword,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
