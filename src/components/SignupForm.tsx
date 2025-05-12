
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const SignupForm = () => {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await signup(username, email, password);
      toast({
        title: "Account created!",
        description: "Welcome to EchoMate Lite"
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Username or email already exists",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="echo-card max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-orbitron text-gradient mb-2">
          Join EchoMate
        </h2>
        <p className="text-echo-muted">
          Create an account to start echoing
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="username" 
            className="block text-sm font-medium mb-2"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white/10 bg-echo-dark/30 focus:outline-none focus:border-echo-primary transition-colors"
            required
          />
        </div>
        
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
        
        <div className="mb-4">
          <label 
            htmlFor="password" 
            className="block text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white/10 bg-echo-dark/30 focus:outline-none focus:border-echo-primary transition-colors"
            required
          />
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="confirmPassword" 
            className="block text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white/10 bg-echo-dark/30 focus:outline-none focus:border-echo-primary transition-colors"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-echo-primary hover:bg-echo-primary/90 text-white py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-echo-muted text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-echo-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
