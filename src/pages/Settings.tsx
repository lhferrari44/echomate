
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const { user, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const [bio, setBio] = useState("");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (user) {
      setBio(user.bio);
    }
  }, [isAuthenticated, navigate, user]);
  
  const handleThemeChange = (newTheme: any) => {
    setTheme(newTheme);
    toast({
      title: "Theme changed",
      description: `Your theme has been updated to ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}`
    });
  };
  
  const handleSaveBio = () => {
    // In a real app, this would update the user's bio on the server
    toast({
      title: "Profile updated",
      description: "Your bio has been updated successfully"
    });
  };
  
  if (!user) return null;
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold font-orbitron mb-6">
          Settings
        </h1>
        
        <div className="space-y-8">
          <div className="echo-card p-6">
            <h2 className="text-xl font-bold mb-4">Theme</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                className={`theme-button p-4 rounded-xl border-2 transition-all ${
                  theme === "neon"
                    ? "border-echo-primary scale-105"
                    : "border-white/10 hover:border-white/30"
                }`}
                onClick={() => handleThemeChange("neon")}
              >
                <div className="bg-gradient-to-r from-echo-primary to-echo-accent h-20 rounded-lg mb-2"></div>
                <h3 className="font-bold">Neon Nights</h3>
                <p className="text-xs text-echo-muted">Vibrant, energetic theme</p>
              </button>
              
              <button
                className={`theme-button p-4 rounded-xl border-2 transition-all ${
                  theme === "cosmic"
                    ? "border-echo-primary scale-105"
                    : "border-white/10 hover:border-white/30"
                }`}
                onClick={() => handleThemeChange("cosmic")}
              >
                <div className="bg-gradient-to-r from-[#0c0e18] to-[#2b2457] h-20 rounded-lg mb-2"></div>
                <h3 className="font-bold">Cosmic Void</h3>
                <p className="text-xs text-echo-muted">Deep space visuals</p>
              </button>
              
              <button
                className={`theme-button p-4 rounded-xl border-2 transition-all ${
                  theme === "retro"
                    ? "border-echo-primary scale-105"
                    : "border-white/10 hover:border-white/30"
                }`}
                onClick={() => handleThemeChange("retro")}
              >
                <div className="bg-gradient-to-r from-[#ff2975] to-[#4939ff] h-20 rounded-lg mb-2"></div>
                <h3 className="font-bold">Retro Wave</h3>
                <p className="text-xs text-echo-muted">80s synthwave style</p>
              </button>
            </div>
          </div>
          
          <div className="echo-card p-6">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            
            <div className="mb-4 flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-16 h-16 rounded-full border-2 border-echo-primary"
              />
              
              <div>
                <h3 className="font-bold">@{user.username}</h3>
                <p className="text-sm text-echo-muted">{user.email}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <label 
                htmlFor="bio" 
                className="block text-sm font-medium mb-2"
              >
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-white/10 bg-echo-dark/30 focus:outline-none focus:border-echo-primary transition-colors"
                rows={3}
                maxLength={100}
              ></textarea>
              <div className="text-right text-xs text-echo-muted mt-1">
                {bio.length}/100
              </div>
            </div>
            
            <button
              onClick={handleSaveBio}
              className="bg-echo-primary hover:bg-echo-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
