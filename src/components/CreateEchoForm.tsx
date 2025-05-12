
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useEcho } from "@/context/EchoContext";
import { toast } from "@/hooks/use-toast";

const GRADIENT_OPTIONS = [
  { id: "1", gradient: "linear-gradient(to right, #9b87f5, #D946EF)" },
  { id: "2", gradient: "linear-gradient(to right, #0EA5E9, #9b87f5)" },
  { id: "3", gradient: "linear-gradient(to right, #F97316, #D946EF)" },
  { id: "4", gradient: "linear-gradient(to right, #10B981, #0EA5E9)" },
  { id: "5", gradient: "linear-gradient(to right, #6366F1, #D946EF)" }
];

const CreateEchoForm = () => {
  const { user } = useAuth();
  const { createEcho } = useEcho();
  const [content, setContent] = useState("");
  const [selectedGradient, setSelectedGradient] = useState<string | undefined>(undefined);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to create an echo",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) return;
    
    createEcho(content, selectedGradient);
    setContent("");
    setSelectedGradient(undefined);
    setIsExpanded(false);
    
    toast({
      title: "Echo created!",
      description: "Your echo has been posted"
    });
  };
  
  if (!user) return null;
  
  return (
    <div className="echo-card mb-8">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-start space-x-3">
          <img 
            src={user.avatar} 
            alt={user.username} 
            className="w-10 h-10 rounded-full glow-effect"
          />
          
          <div className="flex-1">
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="w-full bg-transparent border border-white/10 rounded-lg p-3 focus:outline-none focus:border-echo-primary resize-none transition-colors"
              rows={isExpanded ? 4 : 2}
              maxLength={280}
              style={selectedGradient ? { background: selectedGradient } : {}}
            />
            
            {isExpanded && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {GRADIENT_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`w-6 h-6 rounded-full transition-transform ${
                          selectedGradient === option.gradient ? "ring-2 ring-white scale-125" : ""
                        }`}
                        style={{ background: option.gradient }}
                        onClick={() => setSelectedGradient(
                          selectedGradient === option.gradient ? undefined : option.gradient
                        )}
                      />
                    ))}
                    
                    {selectedGradient && (
                      <button
                        type="button"
                        className="text-xs text-echo-muted hover:text-white transition-colors"
                        onClick={() => setSelectedGradient(undefined)}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  
                  <span className="text-xs text-echo-muted">
                    {content.length}/280
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    className="text-sm text-echo-muted hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={!content.trim()}
                    className="px-4 py-1.5 bg-echo-primary hover:bg-echo-primary/90 text-white rounded-full text-sm disabled:opacity-50 transition-colors"
                  >
                    Echo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEchoForm;
