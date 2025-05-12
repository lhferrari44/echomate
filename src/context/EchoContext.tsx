
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface Echo {
  id: string;
  content: string;
  creator: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  background?: string;
  reactions: {
    love: string[];
    wow: string[];
    laugh: string[];
  };
  reEchoes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  content: string;
  creator: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
}

interface EchoContextType {
  echoes: Echo[];
  createEcho: (content: string, background?: string) => void;
  deleteEcho: (id: string) => void;
  reactToEcho: (echoId: string, reaction: "love" | "wow" | "laugh") => void;
  reEcho: (echoId: string) => void;
  addReply: (echoId: string, content: string) => void;
  getUserEchoes: (userId: string) => Echo[];
}

const EchoContext = createContext<EchoContextType | undefined>(undefined);

// Mock data for initial echoes
const MOCK_ECHOES: Echo[] = [
  {
    id: "1",
    content: "Just discovered a hidden digital oasis in the metaverse! The neon waterfalls are mesmerizing. ✨🌊 #DigitalNomad",
    creator: {
      id: "1",
      username: "neon_rider",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    createdAt: "2025-05-07T15:30:00Z",
    background: "linear-gradient(to right, #9b87f5, #D946EF)",
    reactions: {
      love: ["2", "3"],
      wow: ["4"],
      laugh: []
    },
    reEchoes: 5,
    replies: [
      {
        id: "r1",
        content: "Send me the coordinates! I need to see this.",
        creator: {
          id: "2",
          username: "cyber_punk",
          avatar: "https://i.pravatar.cc/150?img=2"
        },
        createdAt: "2025-05-07T16:05:00Z"
      }
    ]
  },
  {
    id: "2",
    content: "Hacked my smart home system to respond to synthwave beats. Now my lights pulse to the rhythm! 🎵💡 #TechWizard",
    creator: {
      id: "2",
      username: "cyber_punk",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    createdAt: "2025-05-07T12:45:00Z",
    background: "linear-gradient(to right, #0EA5E9, #9b87f5)",
    reactions: {
      love: ["1"],
      wow: ["3", "5"],
      laugh: ["4"]
    },
    reEchoes: 8,
    replies: []
  },
  {
    id: "3",
    content: "Remember when we thought 1TB was unlimited storage? Now my neural interface uses that just for cache! 😂 #TechEvolution",
    creator: {
      id: "3",
      username: "synth_wave",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    createdAt: "2025-05-06T23:15:00Z",
    reactions: {
      love: [],
      wow: ["1", "2"],
      laugh: ["4", "5"]
    },
    reEchoes: 3,
    replies: []
  },
  {
    id: "4",
    content: "The sunset over the cybercity skyline tonight is simply breathtaking. Sometimes you need to look up from your screens to see the real beauty. 🌆",
    creator: {
      id: "1",
      username: "neon_rider",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    createdAt: "2025-05-06T20:30:00Z",
    background: "linear-gradient(to right, #F97316, #D946EF)",
    reactions: {
      love: ["2", "3", "5"],
      wow: [],
      laugh: []
    },
    reEchoes: 12,
    replies: []
  }
];

export const EchoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [echoes, setEchoes] = useState<Echo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, we'd fetch from an API
    // For now, use mock data
    setEchoes(MOCK_ECHOES);
  }, []);

  const createEcho = (content: string, background?: string) => {
    if (!user) return;
    
    const newEcho: Echo = {
      id: Date.now().toString(),
      content,
      creator: {
        id: user.id,
        username: user.username,
        avatar: user.avatar
      },
      createdAt: new Date().toISOString(),
      background,
      reactions: {
        love: [],
        wow: [],
        laugh: []
      },
      reEchoes: 0,
      replies: []
    };
    
    setEchoes(prev => [newEcho, ...prev]);
  };

  const deleteEcho = (id: string) => {
    if (!user) return;
    
    setEchoes(prev => prev.filter(echo => {
      // Only allow deletion if the user is the creator
      if (echo.id === id && echo.creator.id === user.id) {
        return false;
      }
      return true;
    }));
  };

  const reactToEcho = (echoId: string, reaction: "love" | "wow" | "laugh") => {
    if (!user) return;
    
    setEchoes(prev => prev.map(echo => {
      if (echo.id === echoId) {
        // Check if user already reacted with this reaction
        const hasReacted = echo.reactions[reaction].includes(user.id);
        
        // Toggle reaction
        const updatedReactions = { ...echo.reactions };
        if (hasReacted) {
          updatedReactions[reaction] = updatedReactions[reaction].filter(id => id !== user.id);
        } else {
          updatedReactions[reaction] = [...updatedReactions[reaction], user.id];
        }
        
        return { ...echo, reactions: updatedReactions };
      }
      return echo;
    }));
  };

  const reEcho = (echoId: string) => {
    setEchoes(prev => prev.map(echo => {
      if (echo.id === echoId) {
        return { ...echo, reEchoes: echo.reEchoes + 1 };
      }
      return echo;
    }));
  };

  const addReply = (echoId: string, content: string) => {
    if (!user) return;
    
    setEchoes(prev => prev.map(echo => {
      if (echo.id === echoId) {
        const newReply: Reply = {
          id: `r${Date.now()}`,
          content,
          creator: {
            id: user.id,
            username: user.username,
            avatar: user.avatar
          },
          createdAt: new Date().toISOString()
        };
        
        return {
          ...echo,
          replies: [...echo.replies, newReply]
        };
      }
      return echo;
    }));
  };

  const getUserEchoes = (userId: string): Echo[] => {
    return echoes.filter(echo => echo.creator.id === userId);
  };

  return (
    <EchoContext.Provider
      value={{
        echoes,
        createEcho,
        deleteEcho,
        reactToEcho,
        reEcho,
        addReply,
        getUserEchoes
      }}
    >
      {children}
    </EchoContext.Provider>
  );
};

export const useEcho = () => {
  const context = useContext(EchoContext);
  if (context === undefined) {
    throw new Error("useEcho must be used within an EchoProvider");
  }
  return context;
};
