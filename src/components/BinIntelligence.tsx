import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Thermometer, 
  MapPin, 
  AlertCircle, 
  Wrench, 
  TrendingUp,
  Shield,
  Activity
} from 'lucide-react';

const BinIntelligence = () => {
  const [selectedBin, setSelectedBin] = useState('BIN-247-DT');
  const [binLevel, setBinLevel] = useState(73);
  const [temperature, setTemperature] = useState(24);
  const [isFraudAlert, setIsFraudAlert] = useState(false);

  const bins = [
    { id: 'BIN-247-DT', name: 'KJSS', level: 73, temp: 24, status: 'normal' },
    { id: 'BIN-891-TH', name: 'VVIT University', level: 95, temp: 28, status: 'critical' },
    { id: 'BIN-156-RS', name: 'Bhimadole', level: 45, temp: 22, status: 'optimal' },
    { id: 'BIN-334-SH', name: 'Guntur', level: 88, temp: 26, status: 'warning' },
  ];

  const usagePattern = [
    { time: '00:00', usage: 15 },
    { time: '06:00', usage: 25 },
    { time: '12:00', usage: 85 },
    { time: '18:00', usage: 95 },
    { time: '24:00', usage: 20 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBinLevel(prev => {
        const change = (Math.random() - 0.5) * 5;
        return Math.max(0, Math.min(100, prev + change));
      });
      setTemperature(prev => prev + (Math.random() - 0.5) * 2);
      
      // Random fraud detection simulation
      if (Math.random() > 0.95) {
        setIsFraudAlert(true);
        setTimeout(() => setIsFraudAlert(false), 5000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentBin = bins.find(bin => bin.id === selectedBin);

  return (
    <div className="space-y-6">
      {/* Bin Selector */}
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {bins.map((bin) => (
          <button
            key={bin.id}
            onClick={() => setSelectedBin(bin.id)}
            className={`flex-shrink-0 p-4 rounded-lg border transition-all duration-300 ${
              selectedBin === bin.id
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                : 'bg-gray-800/50 border-gray-600/30 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                bin.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                bin.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                <Trash2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-medium">{bin.name}</p>
                <p className="text-xs opacity-75">{bin.level}% full</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Bin Hologram */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 3D Bin Visualization */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-cyan-500/30 p-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Bin Hologram</h3>
            
            <div className="relative h-80 flex items-end justify-center">
              {/* 3D Bin Container */}
              <div className="relative w-24 h-64 bg-gradient-to-b from-gray-700/30 to-gray-800/50 rounded-lg border-2 border-gray-600/50">
                {/* Fill Level Animation */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500/60 to-green-400/40 rounded-b-lg transition-all duration-1000"
                  style={{ height: `${binLevel}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                </div>
                
                {/* Level Indicator */}
                <div className="absolute -right-12 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
              </div>

              {/* Sensor Indicators */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                <div className="space-y-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Current Level Display */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-cyan-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/30">
                <span className="text-cyan-400 font-bold text-lg">{binLevel.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sensor Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* IoT Sensor Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-blue-500/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-blue-400 font-medium">Fill Level Sensor</h4>
                <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
              <div className="text-2xl font-bold text-blue-500">{binLevel.toFixed(1)}%</div>
              <div className="text-sm text-gray-400 mt-1">
                {binLevel > 90 ? 'Critical - Schedule pickup' : 
                 binLevel > 75 ? 'Warning - Monitor closely' : 'Normal operation'}
              </div>
            </div>

            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-orange-500/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-orange-400 font-medium">Temperature</h4>
                <Thermometer className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-orange-500">{temperature.toFixed(1)}°C</div>
              <div className="text-sm text-gray-400 mt-1">Normal range</div>
            </div>

            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-green-500/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-green-400 font-medium">Location Lock</h4>
                <MapPin className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-500">✓ Secured</div>
              <div className="text-sm text-gray-400 mt-1">GPS: 40.7128, -74.0060</div>
            </div>

            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-purple-500/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-purple-400 font-medium">Maintenance</h4>
                <Wrench className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-500">Good</div>
              <div className="text-sm text-gray-400 mt-1">Last service: 3 days ago</div>
            </div>
          </div>

          {/* Usage Pattern Graph */}
          <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-gray-600/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-gray-300 font-medium">24h Usage Pattern</h4>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="relative h-32">
              <div className="absolute inset-0 flex items-end justify-between">
                {usagePattern.map((point, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-8 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t transition-all duration-1000"
                      style={{ height: `${point.usage}%` }}
                    ></div>
                    <span className="text-xs text-gray-400">{point.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fraud Detection Alert */}
      {isFraudAlert && (
        <div className="bg-red-500/20 backdrop-blur-md rounded-xl border border-red-500/50 p-6 animate-pulse">
          <div className="flex items-center space-x-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <div>
              <h4 className="text-red-400 font-bold text-lg">Fraud Detection Alert</h4>
              <p className="text-red-300">
                Manual report claims bin is full, but sensor data shows 73% capacity. 
                Investigating potential false reporting.
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded text-red-400 hover:bg-red-500/30">
                  Investigate
                </button>
                <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded text-gray-400 hover:bg-gray-700/50">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Panel */}
      <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-purple-500/30 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-purple-400" />
          <h4 className="text-purple-400 font-semibold">AI Insights</h4>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-purple-500/10 rounded-lg">
            <p className="text-purple-400 font-semibold">Predicted Full</p>
            <p className="text-2xl font-bold text-purple-500">18:30</p>
            <p className="text-sm text-gray-400">Today</p>
          </div>
          
          <div className="text-center p-4 bg-green-500/10 rounded-lg">
            <p className="text-green-400 font-semibold">Efficiency Score</p>
            <p className="text-2xl font-bold text-green-500">94%</p>
            <p className="text-sm text-gray-400">Above average</p>
          </div>
          
          <div className="text-center p-4 bg-blue-500/10 rounded-lg">
            <p className="text-blue-400 font-semibold">Next Maintenance</p>
            <p className="text-2xl font-bold text-blue-500">7 days</p>
            <p className="text-sm text-gray-400">Scheduled</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinIntelligence;
