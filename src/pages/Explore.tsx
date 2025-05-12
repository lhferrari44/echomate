
import { useState } from "react";
import { Search } from "lucide-react";
import EchoCard from "@/components/EchoCard";
import { useEcho } from "@/context/EchoContext";

interface TrendingTopic {
  id: string;
  name: string;
  count: number;
}

// Mock trending topics
const TRENDING_TOPICS: TrendingTopic[] = [
  { id: "1", name: "DigitalNomad", count: 2458 },
  { id: "2", name: "TechWizard", count: 1893 },
  { id: "3", name: "TechEvolution", count: 1245 },
  { id: "4", name: "MetaverseLife", count: 987 },
  { id: "5", name: "SynthWave", count: 754 }
];

const Explore = () => {
  const { echoes } = useEcho();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredEchoes = echoes.filter(
    echo => 
      echo.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
      echo.creator.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold font-orbitron mb-6">
          Explore
        </h1>
        
        <div className="echo-card p-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search echoes, users, or hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-echo-dark/50 border border-white/10 rounded-full px-10 py-3 focus:outline-none focus:border-echo-primary transition-colors"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-echo-muted" size={20} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Latest Echoes</h2>
            
            {filteredEchoes.length > 0 ? (
              <div>
                {filteredEchoes.map(echo => (
                  <EchoCard key={echo.id} {...echo} />
                ))}
              </div>
            ) : (
              <div className="echo-card p-8 text-center">
                <p className="text-echo-muted">No echoes found</p>
              </div>
            )}
          </div>
          
          <div>
            <div className="echo-card p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Trending</h2>
              
              <div className="space-y-4">
                {TRENDING_TOPICS.map(topic => (
                  <div key={topic.id} className="border-b border-white/5 last:border-b-0 pb-3 last:pb-0">
                    <a 
                      href={`/hashtag/${topic.name}`} 
                      className="block hover:bg-echo-primary/5 rounded-lg transition-colors p-2 -mx-2"
                    >
                      <div className="font-medium">#{topic.name}</div>
                      <div className="text-sm text-echo-muted">{topic.count.toLocaleString()} echoes</div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
