
import { useAuth } from "@/context/AuthContext";
import Home from "./Home";
import Landing from "./Landing";

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  // Show home page for authenticated users, landing page for guests
  return isAuthenticated ? <Home /> : <Landing />;
};

export default Index;
