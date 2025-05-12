
import { Link } from "react-router-dom";
import { Bell, Home, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-echo-dark glass md:hidden z-50 border-t border-white/10">
      <div className="flex justify-around items-center py-2">
        <Link 
          to="/" 
          className={`p-2 rounded-full ${
            location.pathname === "/" 
              ? "text-echo-primary bg-echo-primary/10" 
              : "text-echo-light"
          }`}
        >
          <Home size={24} />
        </Link>
        
        <Link 
          to="/explore" 
          className={`p-2 rounded-full ${
            location.pathname === "/explore" 
              ? "text-echo-primary bg-echo-primary/10" 
              : "text-echo-light"
          }`}
        >
          <Search size={24} />
        </Link>
        
        <Link 
          to="/notifications" 
          className={`p-2 rounded-full relative ${
            location.pathname === "/notifications" 
              ? "text-echo-primary bg-echo-primary/10" 
              : "text-echo-light"
          }`}
        >
          <Bell size={24} />
          <span className="absolute top-1 right-1 bg-echo-accent rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
            3
          </span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`p-2 rounded-full ${
            location.pathname === "/profile" 
              ? "text-echo-primary bg-echo-primary/10" 
              : "text-echo-light"
          }`}
        >
          <User size={24} />
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
