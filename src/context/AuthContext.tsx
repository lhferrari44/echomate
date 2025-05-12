
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  theme: string;
  following: string[];
  followers: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS = [
  {
    id: "1",
    username: "neon_rider",
    email: "neon@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Digital nomad traversing the neon grid.",
    theme: "neon",
    following: ["2", "3"],
    followers: ["2", "4", "5"]
  },
  {
    id: "2",
    username: "cyber_punk",
    email: "cyber@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Hacking the mainframe since 2077.",
    theme: "cosmic",
    following: ["1"],
    followers: ["1", "3"]
  },
  {
    id: "3",
    username: "synth_wave",
    email: "synth@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Riding the digital wave.",
    theme: "retro",
    following: ["1"],
    followers: ["1"]
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in local storage
    const savedUser = localStorage.getItem("echoUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulating API call
    setIsLoading(true);
    try {
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = MOCK_USERS.find(u => u.email === email);
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid credentials");
      }
      
      // Remove password from user data
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem("echoUser", JSON.stringify(userWithoutPassword));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    // Simulating API call
    setIsLoading(true);
    try {
      // Mock registration
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email || u.username === username)) {
        throw new Error("User already exists");
      }
      
      // Create new user (in a real app, this would be done on the server)
      const newUser = {
        id: (MOCK_USERS.length + 1).toString(),
        username,
        email,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        bio: "New to EchoMate!",
        theme: "neon",
        following: [],
        followers: []
      };
      
      setUser(newUser);
      localStorage.setItem("echoUser", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("echoUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
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
