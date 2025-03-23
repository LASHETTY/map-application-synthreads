
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock data for demonstration
const MOCK_USERS = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?u=john"
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?u=jane"
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("mapUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("mapUser");
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Omit password when setting user
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("mapUser", JSON.stringify(userWithoutPassword));
      toast.success("Login successful");
    } else {
      toast.error("Invalid credentials");
      throw new Error("Invalid credentials");
    }
    
    setIsLoading(false);
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error("Email already in use");
      throw new Error("Email already in use");
    }
    
    // In a real app, you would create the user in your database
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `https://i.pravatar.cc/150?u=${name.replace(" ", "")}` 
    };
    
    setUser(newUser);
    localStorage.setItem("mapUser", JSON.stringify(newUser));
    toast.success("Account created successfully");
    
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("mapUser");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
