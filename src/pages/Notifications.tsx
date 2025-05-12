
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Notification {
  id: string;
  type: "like" | "follow" | "reply" | "mention";
  content: string;
  from: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  read: boolean;
}

// Mock notifications
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "like",
    content: "liked your echo: \"Just discovered a hidden digital oasis...\"",
    from: {
      id: "2",
      username: "cyber_punk",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    createdAt: "2025-05-08T09:15:00Z",
    read: false
  },
  {
    id: "2",
    type: "follow",
    content: "started following you",
    from: {
      id: "3",
      username: "synth_wave",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    createdAt: "2025-05-07T22:30:00Z",
    read: false
  },
  {
    id: "3",
    type: "reply",
    content: "replied to your echo: \"Send me the coordinates! I need to see this.\"",
    from: {
      id: "2",
      username: "cyber_punk",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    createdAt: "2025-05-07T16:05:00Z",
    read: true
  }
];

const Notifications = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) return null;
  
  // Format time distance
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "just now";
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }
    
    return date.toLocaleDateString();
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold font-orbitron mb-6">
          Notifications
        </h1>
        
        <div className="echo-card">
          {MOCK_NOTIFICATIONS.length > 0 ? (
            <div>
              {MOCK_NOTIFICATIONS.map(notification => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 p-4 border-b border-white/5 last:border-b-0 ${
                    !notification.read ? "bg-echo-primary/5" : ""
                  }`}
                >
                  <a href={`/user/${notification.from.id}`}>
                    <img
                      src={notification.from.avatar}
                      alt={notification.from.username}
                      className="w-10 h-10 rounded-full"
                    />
                  </a>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p>
                        <a 
                          href={`/user/${notification.from.id}`}
                          className="font-medium hover:text-echo-primary transition-colors"
                        >
                          @{notification.from.username}
                        </a>{" "}
                        <span className="text-echo-muted">
                          {notification.content}
                        </span>
                      </p>
                      
                      <span className="text-xs text-echo-muted whitespace-nowrap">
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-echo-muted">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
