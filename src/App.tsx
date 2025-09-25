import React, { useState, useEffect } from 'react';
import { 
  Map, 
  Truck, 
  Brain, 
  Users, 
  BarChart3, 
  Shield, 
  Zap,
  MapPin,
  TrendingUp,
  Activity,
  Eye,
  Mic
} from 'lucide-react';
import CityOverview from './components/CityOverview';
import BinIntelligence from './components/BinIntelligence';
import RouteOptimization from './components/RouteOptimization';
import LiveOperations from './components/LiveOperations';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import PublicEngagement from './components/PublicEngagement';
import AuditDashboard from './components/AuditDashboard';

const stages = [
  { id: 'city', name: 'City Overview', icon: Map, component: CityOverview },
  { id: 'bins', name: 'Bin Intelligence', icon: Activity, component: BinIntelligence },
  { id: 'routes', name: 'Route AI', icon: Brain, component: RouteOptimization },
  { id: 'operations', name: 'Live Ops', icon: Truck, component: LiveOperations },
  { id: 'analytics', name: 'Predictive', icon: TrendingUp, component: PredictiveAnalytics },
  { id: 'public', name: 'Public Portal', icon: Users, component: PublicEngagement },
  { id: 'audit', name: 'Audit Center', icon: BarChart3, component: AuditDashboard }
];

function App() {
  const [currentStage, setCurrentStage] = useState('city');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [systemStatus, setSystemStatus] = useState('optimal');

  const CurrentComponent = stages.find(stage => stage.id === currentStage)?.component || CityOverview;

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(Math.random() > 0.8 ? 'alert' : 'optimal');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleVoiceCommand = () => {
    setIsVoiceActive(!isVoiceActive);
    setTimeout(() => setIsVoiceActive(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-blue-950/20 to-purple-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      {/* Neural Network Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-green-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="neural-line absolute top-1/4 left-1/4 w-64 h-px bg-gradient-to-r from-cyan-500/50 to-transparent transform rotate-45"></div>
        <div className="neural-line absolute top-1/2 right-1/3 w-48 h-px bg-gradient-to-l from-green-500/50 to-transparent transform -rotate-12"></div>
      </div>

      {/* Header Command Bar */}
      <header className="relative z-20 border-b border-cyan-500/30 bg-gray-950/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  ECO TRACK
                </h1>
                <p className="text-xs text-gray-400">Smart City Command Center</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleVoiceCommand}
              className={`p-3 rounded-full transition-all duration-300 ${
                isVoiceActive 
                  ? 'bg-red-500/20 text-red-400 animate-pulse' 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                systemStatus === 'optimal' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-400">
                System {systemStatus === 'optimal' ? 'Optimal' : 'Alert'}
              </span>
            </div>
          </div>
        </div>

        {/* Voice Command Indicator */}
        {isVoiceActive && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-red-500/20 backdrop-blur-md rounded-lg px-4 py-2 border border-red-500/30">
            <p className="text-red-400 text-sm animate-pulse">🎤 Listening for voice command...</p>
          </div>
        )}
      </header>

      {/* Navigation Hologram */}
      <nav className="relative z-20 border-b border-blue-500/20 bg-gray-950/60 backdrop-blur-md">
        <div className="flex overflow-x-auto">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setCurrentStage(stage.id)}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all duration-300 whitespace-nowrap ${
                currentStage === stage.id
                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-400'
              }`}
            >
              <stage.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{stage.name}</span>
              {currentStage === stage.id && (
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Command Interface */}
      <main className="relative z-10 p-6">
        <div className="animate-fadeIn">
          <CurrentComponent />
        </div>
      </main>

      {/* Floating Action Nodes */}
      <div className="fixed bottom-6 right-6 space-y-3 z-30">
        <div className="bg-green-500/20 backdrop-blur-md rounded-full p-3 border border-green-500/30">
          <Eye className="w-6 h-6 text-green-400" />
        </div>
        <div className="bg-blue-500/20 backdrop-blur-md rounded-full p-3 border border-blue-500/30 animate-pulse">
          <Zap className="w-6 h-6 text-blue-400" />
        </div>
      </div>
    </div>
  );
}

export default App;