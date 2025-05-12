
import { useAuth } from "@/context/AuthContext";
import CreateEchoForm from "@/components/CreateEchoForm";
import EchoCard from "@/components/EchoCard";
import { useEcho } from "@/context/EchoContext";
import Particles from "@/components/Particles";

const Home = () => {
  const { user } = useAuth();
  const { echoes } = useEcho();
  
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Particles />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold font-orbitron mb-6">
            Home Feed
          </h1>
          
          <CreateEchoForm />
          
          <div className="space-y-6">
            {echoes.length > 0 ? (
              echoes.map(echo => (
                <EchoCard key={echo.id} {...echo} />
              ))
            ) : (
              <div className="echo-card p-8 text-center">
                <p className="text-echo-muted">No echoes yet</p>
                {!user && (
                  <p className="mt-2 text-sm">
                    <a href="/login" className="text-echo-primary hover:underline">
                      Log in
                    </a>{" "}
                    or{" "}
                    <a href="/signup" className="text-echo-primary hover:underline">
                      sign up
                    </a>{" "}
                    to start creating echoes
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
