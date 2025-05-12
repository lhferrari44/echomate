
import { Link } from "react-router-dom";
import Particles from "@/components/Particles";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Particles />
      
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-4 leading-tight">
              <span className="text-gradient">Connect</span> in a<br /> 
              <span className="text-echo-primary">New Dimension</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-echo-light opacity-80">
              Share your thoughts with vibrant Echoes in a futuristic social experience
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-echo-primary hover:bg-echo-primary/90 text-white font-medium rounded-full transition-colors"
              >
                Get Started
              </Link>
              
              <Link
                to="/login"
                className="px-8 py-3 border border-echo-primary text-echo-primary hover:bg-echo-primary/10 font-medium rounded-full transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-echo-primary/20 backdrop-blur-xl border border-echo-primary/30 flex items-center justify-center mx-auto animate-float">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-echo-primary/30 backdrop-blur-xl border border-echo-primary/30 flex items-center justify-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-echo-primary to-echo-accent shadow-lg flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-orbitron font-bold text-white">EM</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-echo-accent/30 rounded-full backdrop-blur-xl animate-pulse-glow"></div>
              <div className="absolute bottom-1/4 right-0 transform translate-x-1/4 w-16 h-16 bg-echo-blue/30 rounded-full backdrop-blur-xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-orbitron font-bold text-center mb-10">
            Futuristic <span className="text-echo-primary">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="echo-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-echo-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-echo-primary text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Dynamic Echoes</h3>
              <p className="text-echo-muted">
                Create vibrant posts with customizable backgrounds and rich media
              </p>
            </div>
            
            <div className="echo-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-echo-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-echo-primary text-2xl">🌈</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Themes</h3>
              <p className="text-echo-muted">
                Choose from stunning visual themes with unique visual effects
              </p>
            </div>
            
            <div className="echo-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-echo-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-echo-primary text-2xl">🔔</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Notifications</h3>
              <p className="text-echo-muted">
                Stay connected with instant updates on interactions
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <span className="font-orbitron font-bold text-gradient text-xl">
                  EchoMate Lite
                </span>
                <p className="text-echo-muted text-sm mt-1">
                  © 2025 EchoMate. All rights reserved.
                </p>
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-echo-muted hover:text-echo-primary transition-colors">
                  About
                </a>
                <a href="#" className="text-echo-muted hover:text-echo-primary transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-echo-muted hover:text-echo-primary transition-colors">
                  Terms
                </a>
                <a href="#" className="text-echo-muted hover:text-echo-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
