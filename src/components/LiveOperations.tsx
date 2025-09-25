import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  User, 
  MapPin, 
  Clock, 
  Battery, 
  Star,
  AlertTriangle,
  PlayCircle,
  Camera,
  Trophy
} from 'lucide-react';

const LiveOperations = () => {
  const [trucks, setTrucks] = useState([
    { 
      id: 'T-001', 
      driver: 'Alex Chen', 
      location: 'Downtown Plaza', 
      efficiency: 94, 
      battery: 87, 
      status: 'active',
      route: 'Route A',
      collected: 12,
      target: 15,
      speed: 45
    },
    { 
      id: 'T-002', 
      driver: 'Maria Santos', 
      location: 'Tech Hub', 
      efficiency: 89, 
      battery: 62, 
      status: 'active',
      route: 'Route B',
      collected: 8,
      target: 12,
      speed: 38
    },
    { 
      id: 'T-003', 
      driver: 'James Wilson', 
      location: 'Residential Park', 
      efficiency: 91, 
      battery: 94, 
      status: 'maintenance',
      route: 'Route C',
      collected: 0,
      target: 10,
      speed: 0
    },
    { 
      id: 'T-004', 
      driver: 'Sarah Kim', 
      location: 'Shopping District', 
      efficiency: 96, 
      battery: 78, 
      status: 'active',
      route: 'Route D',
      collected: 14,
      target: 16,
      speed: 42
    }
  ]);

  const [selectedTruck, setSelectedTruck] = useState('T-001');
  const [emergencyMode, setEmergencyMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(prev => prev.map(truck => ({
        ...truck,
        battery: Math.max(0, truck.battery - Math.random() * 2),
        efficiency: Math.min(100, truck.efficiency + (Math.random() - 0.5) * 3),
        collected: truck.status === 'active' ? Math.min(truck.target, truck.collected + Math.random() * 0.1) : truck.collected,
        speed: truck.status === 'active' ? 35 + Math.random() * 15 : 0
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-500/20 border-green-500';
      case 'maintenance': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500';
      case 'emergency': return 'text-red-500 bg-red-500/20 border-red-500';
      default: return 'text-gray-500 bg-gray-500/20 border-gray-500';
    }
  };

  const currentTruck = trucks.find(truck => truck.id === selectedTruck);

  return (
    <div className="space-y-6">
      {/* Emergency Control Panel */}
      <div className={`transition-all duration-500 ${emergencyMode ? 'bg-red-500/20 border-red-500/50' : 'bg-gray-900/30 border-gray-600/30'} backdrop-blur-md rounded-xl border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className={`w-6 h-6 ${emergencyMode ? 'text-red-400 animate-pulse' : 'text-gray-400'}`} />
            <h2 className={`text-xl font-bold ${emergencyMode ? 'text-red-400' : 'text-gray-300'}`}>
              Emergency Command Center
            </h2>
          </div>
          <button
            onClick={() => setEmergencyMode(!emergencyMode)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              emergencyMode
                ? 'bg-red-500/30 text-red-400 border border-red-500/50'
                : 'bg-gray-800/50 text-gray-400 border border-gray-600/30 hover:bg-red-500/20 hover:text-red-400'
            }`}
          >
            {emergencyMode ? 'Exit Emergency Mode' : 'Emergency Override'}
          </button>
        </div>

        {emergencyMode && (
          <div className="grid md:grid-cols-3 gap-4 animate-fadeIn">
            <button className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors">
              <PlayCircle className="w-6 h-6 mx-auto mb-2" />
              <p className="font-semibold">Dispatch All Units</p>
            </button>
            <button className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-colors">
              <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
              <p className="font-semibold">Alert All Drivers</p>
            </button>
            <button className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
              <MapPin className="w-6 h-6 mx-auto mb-2" />
              <p className="font-semibold">Reroute Fleet</p>
            </button>
          </div>
        )}
      </div>

      {/* Fleet Overview Grid */}
      <div className="grid lg:grid-cols-4 gap-4">
        {trucks.map((truck) => (
          <button
            key={truck.id}
            onClick={() => setSelectedTruck(truck.id)}
            className={`p-4 rounded-xl border transition-all duration-300 text-left ${
              selectedTruck === truck.id
                ? 'bg-cyan-500/20 border-cyan-500 scale-105'
                : 'bg-gray-900/30 border-gray-600/30 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(truck.status)}`}>
                <Truck className="w-6 h-6" />
              </div>
              <div className={`px-2 py-1 rounded text-xs ${getStatusColor(truck.status)}`}>
                {truck.status}
              </div>
            </div>
            
            <h3 className="text-white font-semibold">{truck.id}</h3>
            <p className="text-gray-400 text-sm">{truck.driver}</p>
            <p className="text-gray-500 text-xs">{truck.location}</p>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Efficiency</span>
                <span className="text-green-400 font-semibold">{truck.efficiency.toFixed(0)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-blue-400 font-semibold">{truck.collected.toFixed(0)}/{truck.target}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Truck Detail */}
      {currentTruck && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Driver Performance */}
          <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-blue-500/30 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-blue-400" />
              <h3 className="text-blue-400 font-bold text-lg">Driver Performance</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{currentTruck.driver}</h4>
                  <p className="text-gray-400">{currentTruck.id} • {currentTruck.route}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-semibold">4.8/5.0</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-500/20 rounded-lg">
                  <Trophy className="w-5 h-5 text-green-400 mx-auto mb-1" />
                  <p className="text-green-400 text-sm">Collections Today</p>
                  <p className="text-green-500 font-bold">{currentTruck.collected.toFixed(0)}</p>
                </div>
                <div className="text-center p-3 bg-blue-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-blue-400 text-sm">Avg Speed</p>
                  <p className="text-blue-500 font-bold">{currentTruck.speed.toFixed(0)} km/h</p>
                </div>
                <div className="text-center p-3 bg-purple-500/20 rounded-lg">
                  <Star className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <p className="text-purple-400 text-sm">Efficiency</p>
                  <p className="text-purple-500 font-bold">{currentTruck.efficiency.toFixed(0)}%</p>
                </div>
                <div className="text-center p-3 bg-yellow-500/20 rounded-lg">
                  <Battery className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-yellow-400 text-sm">Battery</p>
                  <p className="text-yellow-500 font-bold">{currentTruck.battery.toFixed(0)}%</p>
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="mt-6">
                <h5 className="text-gray-400 font-medium mb-3">Recent Achievements</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">
                    🏆 Route Master
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm">
                    ⚡ Speed Demon
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm">
                    🎯 Perfect Week
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Camera Feed */}
          <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-gray-600/30 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Camera className="w-6 h-6 text-gray-400" />
              <h3 className="text-gray-400 font-bold text-lg">Live Camera Feed</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm">LIVE</span>
              </div>
            </div>

            {/* Mock Camera Feed */}
            <div className="relative h-48 bg-gray-800/50 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700/50 to-gray-900/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-500">Camera Feed: {currentTruck.location}</p>
                    <p className="text-gray-600 text-sm">Real-time truck view</p>
                  </div>
                </div>
              </div>

              {/* AR Overlay */}
              <div className="absolute top-4 left-4 space-y-2">
                <div className="bg-cyan-500/20 backdrop-blur-sm rounded px-2 py-1 text-cyan-400 text-sm">
                  Speed: {currentTruck.speed.toFixed(0)} km/h
                </div>
                <div className="bg-green-500/20 backdrop-blur-sm rounded px-2 py-1 text-green-400 text-sm">
                  Next Stop: 250m
                </div>
                <div className="bg-blue-500/20 backdrop-blur-sm rounded px-2 py-1 text-blue-400 text-sm">
                  Collection Progress: {((currentTruck.collected / currentTruck.target) * 100).toFixed(0)}%
                </div>
              </div>

              {/* Recording indicator */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm rounded px-3 py-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm">REC</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <button className="p-2 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 hover:bg-blue-500/30 transition-colors">
                📞 Call Driver
              </button>
              <button className="p-2 bg-yellow-500/20 border border-yellow-500/30 rounded text-yellow-400 hover:bg-yellow-500/30 transition-colors">
                📍 Track Location
              </button>
              <button className="p-2 bg-green-500/20 border border-green-500/30 rounded text-green-400 hover:bg-green-500/30 transition-colors">
                🎯 Send Waypoint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-xl border border-yellow-500/30 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h3 className="text-yellow-400 font-bold text-lg">Daily Leaderboard</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {trucks
            .sort((a, b) => b.efficiency - a.efficiency)
            .map((truck, index) => (
              <div key={truck.id} className={`p-4 rounded-lg border ${
                index === 0 ? 'bg-yellow-500/20 border-yellow-500/50' :
                index === 1 ? 'bg-gray-400/20 border-gray-400/50' :
                index === 2 ? 'bg-orange-500/20 border-orange-500/50' :
                'bg-gray-700/20 border-gray-600/30'
              }`}>
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏃'}
                  </div>
                  <p className="text-white font-semibold">{truck.driver}</p>
                  <p className="text-gray-400 text-sm">{truck.id}</p>
                  <p className={`font-bold ${
                    index === 0 ? 'text-yellow-400' :
                    index === 1 ? 'text-gray-400' :
                    index === 2 ? 'text-orange-400' :
                    'text-gray-500'
                  }`}>
                    {truck.efficiency.toFixed(0)}% efficiency
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LiveOperations;