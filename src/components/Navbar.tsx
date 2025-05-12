
import { Link } from "react-router-dom";
import { Bell, Home, Search, User, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "glass shadow-lg py-3" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-orbitron font-bold text-gradient">
            EchoMate
          </span>
          <span className="bg-echo-primary px-2 py-0.5 text-xs rounded-full text-white">
            Lite
          </span>
        </Link>

        {user ? (
          <>
            <div className="hidden md:flex items-center space-x-10">
              <Link to="/" className="text-echo-light hover:text-echo-primary transition-colors">
                <Home size={20} />
              </Link>
              <Link to="/explore" className="text-echo-light hover:text-echo-primary transition-colors">
                <Search size={20} />
              </Link>
              <Link to="/notifications" className="text-echo-light hover:text-echo-primary transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-echo-accent rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                  3
                </span>
              </Link>
              <Link to="/profile" className="text-echo-light hover:text-echo-primary transition-colors">
                <User size={20} />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                to="/settings" 
                className="text-echo-light hover:text-echo-primary transition-colors md:hidden"
              >
                <Settings size={20} />
              </Link>
              
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <img 
                    src={user.avatar} 
                    alt={user.username} 
                    className="w-8 h-8 rounded-full border-2 border-echo-primary"
                  />
                  <span className="hidden md:block text-sm font-medium">
                    {user.username}
                  </span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm hover:bg-echo-primary/10 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm hover:bg-echo-primary/10 transition-colors"
                  >
                    Settings
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-echo-primary/10 transition-colors text-echo-accent"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-full border border-echo-primary text-echo-primary hover:bg-echo-primary/10 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 rounded-full bg-echo-primary hover:bg-echo-primary/90 text-white transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
