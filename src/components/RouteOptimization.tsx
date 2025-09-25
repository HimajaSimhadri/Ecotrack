import React, { useState, useEffect } from 'react';
import { 
  Route, 
  Brain, 
  Zap, 
  TrendingDown, 
  Clock, 
  Fuel,
  TreePine,
  Target
} from 'lucide-react';

const RouteOptimization = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const beforeStats = {
    distance: 127.4,
    time: 4.2,
    fuel: 18.7,
    co2: 42.3,
    efficiency: 62
  };

  const afterStats = {
    distance: 89.1,
    time: 2.8,
    fuel: 11.2,
    co2: 25.4,
    efficiency: 94
  };

  const neuronNodes = [
    { id: 1, x: 20, y: 30, active: false },
    { id: 2, x: 40, y: 20, active: false },
    { id: 3, x: 60, y: 35, active: false },
    { id: 4, x: 80, y: 25, active: false },
    { id: 5, x: 30, y: 60, active: false },
    { id: 6, x: 70, y: 70, active: false }
  ];

  const [activeNeurons, setActiveNeurons] = useState(neuronNodes);

  useEffect(() => {
    if (isOptimizing) {
      const interval = setInterval(() => {
        setOptimizationProgress(prev => {
          if (prev >= 100) {
            setIsOptimizing(false);
            setShowComparison(true);
            return 100;
          }
          return prev + 2;
        });

        // Activate neurons randomly during optimization
        setActiveNeurons(prev => 
          prev.map(neuron => ({
            ...neuron,
            active: Math.random() > 0.7
          }))
        );
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isOptimizing]);

  const startOptimization = () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);
    setShowComparison(false);
  };

  const getSavingsPercentage = (before, after) => {
    return Math.round(((before - after) / before) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Neural Network Visualization */}
      <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-purple-500/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-purple-400">AI Route Optimization Engine</h2>
          </div>
          <button
            onClick={startOptimization}
            disabled={isOptimizing}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isOptimizing
                ? 'bg-purple-500/30 text-purple-400 cursor-not-allowed'
                : 'bg-purple-500/20 border border-purple-500/50 text-purple-400 hover:bg-purple-500/30'
            }`}
          >
            {isOptimizing ? `Optimizing... ${optimizationProgress}%` : 'Start AI Optimization'}
          </button>
        </div>

        {/* Neural Network Visual */}
        <div className="relative h-64 bg-gradient-to-br from-gray-800/30 to-purple-900/20 rounded-lg border border-purple-500/20">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {activeNeurons.map((neuron, i) => 
              activeNeurons.slice(i + 1).map((target, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={`${neuron.x}%`}
                  y1={`${neuron.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke={neuron.active && target.active ? '#8b5cf6' : '#4b5563'}
                  strokeWidth={neuron.active && target.active ? '2' : '1'}
                  opacity={neuron.active && target.active ? '0.8' : '0.3'}
                />
              ))
            )}
          </svg>

          {/* Neuron Nodes */}
          {activeNeurons.map((neuron) => (
            <div
              key={neuron.id}
              className={`absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                neuron.active
                  ? 'bg-purple-500 shadow-lg shadow-purple-500/50 animate-pulse'
                  : 'bg-gray-600'
              }`}
              style={{ left: `${neuron.x}%`, top: `${neuron.y}%` }}
            >
              {neuron.active && (
                <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75"></div>
              )}
            </div>
          ))}

          {/* Processing Indicators */}
          {isOptimizing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-purple-500/20 backdrop-blur-md rounded-lg p-4 border border-purple-500/50">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-purple-400 animate-pulse" />
                  <div>
                    <p className="text-purple-400 font-semibold">Neural Processing</p>
                    <p className="text-purple-300 text-sm">Analyzing {(optimizationProgress * 2.47).toFixed(0)} route combinations</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {isOptimizing && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Optimization Progress</span>
              <span>{optimizationProgress}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${optimizationProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Route Comparison */}
      {showComparison && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Before Optimization */}
          <div className="bg-red-500/10 backdrop-blur-md rounded-xl border border-red-500/30 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Route className="w-6 h-6 text-red-400" />
              <h3 className="text-red-400 font-bold text-lg">Before: Inefficient Routes</h3>
            </div>

            {/* Chaotic Route Visualization */}
            <div className="relative h-48 bg-gray-800/30 rounded-lg mb-4 overflow-hidden">
              <div className="absolute inset-0">
                <svg className="w-full h-full">
                  {/* Chaotic spaghetti routes */}
                  <path
                    d="M10,40 Q50,80 90,30 Q130,70 170,20 Q200,90 250,50"
                    stroke="#ef4444"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.8"
                  />
                  <path
                    d="M30,90 Q80,20 120,60 Q160,30 200,80 Q240,40 280,70"
                    stroke="#f97316"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.8"
                  />
                  <path
                    d="M50,20 Q90,90 140,40 Q180,80 220,30"
                    stroke="#eab308"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.8"
                  />
                </svg>
              </div>
              <div className="absolute top-2 right-2 bg-red-500/20 backdrop-blur-sm rounded px-3 py-1">
                <span className="text-red-400 text-sm font-semibold">Inefficient</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-red-400 text-sm">Time</p>
                <p className="text-red-500 font-bold">{beforeStats.time}h</p>
              </div>
              <div className="text-center p-3 bg-red-500/20 rounded-lg">
                <Route className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-red-400 text-sm">Distance</p>
                <p className="text-red-500 font-bold">{beforeStats.distance}km</p>
              </div>
              <div className="text-center p-3 bg-red-500/20 rounded-lg">
                <Fuel className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-red-400 text-sm">Fuel</p>
                <p className="text-red-500 font-bold">{beforeStats.fuel}L</p>
              </div>
              <div className="text-center p-3 bg-red-500/20 rounded-lg">
                <TreePine className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-red-400 text-sm">CO₂</p>
                <p className="text-red-500 font-bold">{beforeStats.co2}kg</p>
              </div>
            </div>
          </div>

          {/* After Optimization */}
          <div className="bg-green-500/10 backdrop-blur-md rounded-xl border border-green-500/30 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-green-400" />
              <h3 className="text-green-400 font-bold text-lg">After: Optimized Routes</h3>
            </div>

            {/* Clean Route Visualization */}
            <div className="relative h-48 bg-gray-800/30 rounded-lg mb-4 overflow-hidden">
              <div className="absolute inset-0">
                <svg className="w-full h-full">
                  {/* Clean optimized routes */}
                  <path
                    d="M20,60 L80,60 L140,60 L200,60 L260,60"
                    stroke="#10b981"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.9"
                    className="animate-pulse"
                  />
                  <path
                    d="M20,80 L100,80 L180,80 L260,80"
                    stroke="#06d6a0"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.9"
                    className="animate-pulse"
                  />
                </svg>
                {/* Efficiency indicators */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-green-500/30 backdrop-blur-md rounded-full p-3 animate-pulse">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-green-500/20 backdrop-blur-sm rounded px-3 py-1">
                <span className="text-green-400 text-sm font-semibold">Optimized</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-green-400 text-sm">Time</p>
                <p className="text-green-500 font-bold">{afterStats.time}h</p>
                <p className="text-green-300 text-xs">-{getSavingsPercentage(beforeStats.time, afterStats.time)}%</p>
              </div>
              <div className="text-center p-3 bg-green-500/20 rounded-lg">
                <Route className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-green-400 text-sm">Distance</p>
                <p className="text-green-500 font-bold">{afterStats.distance}km</p>
                <p className="text-green-300 text-xs">-{getSavingsPercentage(beforeStats.distance, afterStats.distance)}%</p>
              </div>
              <div className="text-center p-3 bg-green-500/20 rounded-lg">
                <Fuel className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-green-400 text-sm">Fuel</p>
                <p className="text-green-500 font-bold">{afterStats.fuel}L</p>
                <p className="text-green-300 text-xs">-{getSavingsPercentage(beforeStats.fuel, afterStats.fuel)}%</p>
              </div>
              <div className="text-center p-3 bg-green-500/20 rounded-lg">
                <TreePine className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-green-400 text-sm">CO₂</p>
                <p className="text-green-500 font-bold">{afterStats.co2}kg</p>
                <p className="text-green-300 text-xs">-{getSavingsPercentage(beforeStats.co2, afterStats.co2)}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Constraints */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-500/10 backdrop-blur-md rounded-xl border border-blue-500/30 p-6">
          <h4 className="text-blue-400 font-semibold mb-4">Traffic Conditions</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Highway A1</span>
              <span className="text-green-400">Light</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Downtown</span>
              <span className="text-yellow-400">Moderate</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Industrial Zone</span>
              <span className="text-red-400">Heavy</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-500/10 backdrop-blur-md rounded-xl border border-orange-500/30 p-6">
          <h4 className="text-orange-400 font-semibold mb-4">Weather Impact</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Temperature</span>
              <span className="text-orange-400">22°C</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Rain Probability</span>
              <span className="text-blue-400">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Wind Speed</span>
              <span className="text-green-400">8 km/h</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/10 backdrop-blur-md rounded-xl border border-purple-500/30 p-6">
          <h4 className="text-purple-400 font-semibold mb-4">Fleet Capacity</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Truck A</span>
              <span className="text-green-400">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Truck B</span>
              <span className="text-yellow-400">72%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Truck C</span>
              <span className="text-red-400">95%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Meter */}
      {showComparison && (
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-xl border border-green-500/30 p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-400 mb-2">Optimization Results</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">40%</div>
                <div className="text-green-400">Efficiency Gain</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">€2,847</div>
                <div className="text-blue-400">Monthly Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">16.9kg</div>
                <div className="text-purple-400">CO₂ Reduced</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-500">1.4h</div>
                <div className="text-cyan-400">Time Saved</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteOptimization;