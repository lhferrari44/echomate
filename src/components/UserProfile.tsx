
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEcho } from "@/context/EchoContext";
import EchoCard from "./EchoCard";
import { toast } from "@/hooks/use-toast";

interface UserProfileProps {
  userId: string;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const { user } = useAuth();
  const { getUserEchoes } = useEcho();
  const [profile, setProfile] = useState<any>(null);
  const [userEchoes, setUserEchoes] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch user profile from API
    // For now use mock data
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockUsers = [
          {
            id: "1",
            username: "neon_rider",
            email: "neon@example.com",
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
            avatar: "https://i.pravatar.cc/150?img=3",
            bio: "Riding the digital wave.",
            theme: "retro",
            following: ["1"],
            followers: ["1"]
          }
        ];
        
        const foundUser = mockUsers.find(u => u.id === userId);
        if (foundUser) {
          setProfile(foundUser);
          
          // Check if the current user is following this profile
          if (user && foundUser.followers.includes(user.id)) {
            setIsFollowing(true);
          }
        }
        
        // Get user echoes
        const echoes = getUserEchoes(userId);
        setUserEchoes(echoes);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [userId, user, getUserEchoes]);
  
  const handleFollowToggle = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to follow users",
        variant: "destructive"
      });
      return;
    }
    
    setIsFollowing(prev => !prev);
    
    if (isFollowing) {
      toast({
        title: "Unfollowed",
        description: `You are no longer following @${profile.username}`
      });
    } else {
      toast({
        title: "Following",
        description: `You are now following @${profile.username}`
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-echo-primary">Loading profile...</div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
        <p className="text-echo-muted">The user you're looking for doesn't exist</p>
        <Link to="/" className="mt-4 inline-block text-echo-primary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="echo-card mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="mx-auto md:mx-0">
              <div className="relative">
                <img 
                  src={profile.avatar} 
                  alt={profile.username} 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-echo-primary glow-effect"
                />
                <div className="absolute inset-0 rounded-full border-4 border-echo-primary animate-pulse-glow opacity-50"></div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-orbitron font-bold mb-2">
                @{profile.username}
              </h1>
              
              <p className="text-echo-muted mb-4">
                {profile.bio}
              </p>
              
              <div className="flex justify-center md:justify-start items-center space-x-6 mb-4">
                <div>
                  <span className="block text-lg font-bold">{profile.following.length}</span>
                  <span className="text-sm text-echo-muted">Following</span>
                </div>
                <div>
                  <span className="block text-lg font-bold">{profile.followers.length}</span>
                  <span className="text-sm text-echo-muted">Followers</span>
                </div>
                <div>
                  <span className="block text-lg font-bold">{userEchoes.length}</span>
                  <span className="text-sm text-echo-muted">Echoes</span>
                </div>
              </div>
              
              {user && user.id !== profile.id && (
                <button
                  onClick={handleFollowToggle}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    isFollowing 
                      ? "bg-transparent border border-echo-primary text-echo-primary hover:bg-echo-primary/10" 
                      : "bg-echo-primary hover:bg-echo-primary/90 text-white"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-4">Echoes</h2>
        
        {userEchoes.length > 0 ? (
          <div>
            {userEchoes.map(echo => (
              <EchoCard key={echo.id} {...echo} />
            ))}
          </div>
        ) : (
          <div className="echo-card p-8 text-center">
            <p className="text-echo-muted">No echoes yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
