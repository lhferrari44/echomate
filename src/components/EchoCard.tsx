
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, Share, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { useEcho } from "@/context/EchoContext";
import { toast } from "@/hooks/use-toast";

interface EchoCardProps {
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
  replies: Array<{
    id: string;
    content: string;
    creator: {
      id: string;
      username: string;
      avatar: string;
    };
    createdAt: string;
  }>;
  showActions?: boolean;
}

const EchoCard = ({
  id,
  content,
  creator,
  createdAt,
  background,
  reactions,
  reEchoes,
  replies,
  showActions = true
}: EchoCardProps) => {
  const { user } = useAuth();
  const { reactToEcho, deleteEcho, reEcho, addReply } = useEcho();
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const isLoved = user ? reactions.love.includes(user.id) : false;
  const totalReactions = reactions.love.length + reactions.wow.length + reactions.laugh.length;
  
  const handleReact = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to react to echoes",
        variant: "destructive"
      });
      return;
    }
    
    reactToEcho(id, "love");
  };
  
  const handleReEcho = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to re-echo",
        variant: "destructive"
      });
      return;
    }
    
    reEcho(id);
    toast({
      title: "Re-echoed!",
      description: "Your followers will see this echo",
    });
  };
  
  const handleDelete = () => {
    deleteEcho(id);
    toast({
      title: "Echo deleted",
      description: "Your echo has been removed"
    });
  };
  
  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to add replies",
        variant: "destructive"
      });
      return;
    }
    
    if (!replyText.trim()) return;
    
    addReply(id, replyText);
    setReplyText("");
    setShowReplies(true);
    toast({
      title: "Reply added",
      description: "Your reply has been posted"
    });
  };

  return (
    <div 
      className={`echo-card mb-6 overflow-hidden animate-fade-in`}
      style={{ animationDelay: `${Math.random() * 0.5}s` }}
    >
      <div 
        className={`p-4 relative`}
        style={background ? { background } : {}}
      >
        <div className="flex items-start space-x-3">
          <Link to={`/user/${creator.id}`}>
            <img 
              src={creator.avatar} 
              alt={creator.username} 
              className="w-10 h-10 rounded-full glow-effect"
            />
          </Link>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <Link 
                to={`/user/${creator.id}`}
                className="font-medium hover:text-echo-primary transition-colors"
              >
                @{creator.username}
              </Link>
              
              <span className="text-xs text-echo-muted">
                {formattedDate}
              </span>
            </div>
            
            <p className="mt-2 text-sm md:text-base whitespace-pre-wrap">
              {content}
            </p>
            
            {showActions && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={handleReact}
                    className="flex items-center space-x-1 group"
                  >
                    <Heart 
                      size={18} 
                      className={`${
                        isLoved 
                          ? "fill-echo-accent text-echo-accent" 
                          : "text-echo-light group-hover:text-echo-accent"
                      } transition-colors`}
                    />
                    <span className="text-xs">{reactions.love.length}</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowReplies(!showReplies)}
                    className="flex items-center space-x-1 group"
                  >
                    <MessageSquare 
                      size={18} 
                      className="text-echo-light group-hover:text-echo-primary transition-colors"
                    />
                    <span className="text-xs">{replies.length}</span>
                  </button>
                  
                  <button 
                    onClick={handleReEcho}
                    className="flex items-center space-x-1 group"
                  >
                    <Share 
                      size={18} 
                      className="text-echo-light group-hover:text-echo-blue transition-colors"
                    />
                    <span className="text-xs">{reEchoes}</span>
                  </button>
                </div>
                
                {user && user.id === creator.id && (
                  <button 
                    onClick={handleDelete}
                    className="text-echo-muted hover:text-echo-accent transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showReplies && replies.length > 0 && (
        <div className="border-t border-white/10 bg-echo-dark/50">
          {replies.map(reply => (
            <div key={reply.id} className="p-3 border-b border-white/5 last:border-b-0">
              <div className="flex items-start space-x-2">
                <Link to={`/user/${reply.creator.id}`}>
                  <img 
                    src={reply.creator.avatar} 
                    alt={reply.creator.username} 
                    className="w-6 h-6 rounded-full"
                  />
                </Link>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Link 
                      to={`/user/${reply.creator.id}`}
                      className="text-sm font-medium hover:text-echo-primary transition-colors"
                    >
                      @{reply.creator.username}
                    </Link>
                    
                    <span className="text-xs text-echo-muted">
                      {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <p className="text-sm mt-1">{reply.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showReplies && user && (
        <div className="p-3 border-t border-white/10 bg-echo-dark/30">
          <form onSubmit={handleSubmitReply} className="flex items-center space-x-2">
            <img 
              src={user.avatar} 
              alt={user.username} 
              className="w-6 h-6 rounded-full"
            />
            
            <input
              type="text"
              placeholder="Add a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-white/10 border border-white/10 rounded-full px-3 py-1 text-sm focus:outline-none focus:border-echo-primary transition-colors"
              maxLength={150}
            />
            
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="px-3 py-1 bg-echo-primary text-white rounded-full text-sm disabled:opacity-50"
            >
              Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EchoCard;
