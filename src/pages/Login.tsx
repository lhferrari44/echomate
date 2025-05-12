
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import Particles from "@/components/Particles";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Particles />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-orbitron text-gradient">
            EchoMate Lite
          </h1>
          <p className="text-echo-muted mt-2">
            Connect and share in a new dimension
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
