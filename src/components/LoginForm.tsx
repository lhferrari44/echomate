
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in"
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="echo-card max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-orbitron text-gradient mb-2">
          Welcome Back
        </h2>
        <p className="text-echo-muted">
          Log in to continue your journey
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white/10 bg-echo-dark/30 focus:outline-none focus:border-echo-primary transition-colors"
            required
          />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium"
            >
              Password
            </label>
            <Link 
              to="/forgot-password" 
              className="text-xs text-echo-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white/10 bg-echo-dark/30 focus:outline-none focus:border-echo-primary transition-colors"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-echo-primary hover:bg-echo-primary/90 text-white py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-echo-muted text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-echo-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
