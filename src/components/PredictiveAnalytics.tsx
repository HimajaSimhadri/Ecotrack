import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Cloud, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  Zap,
  FastForward,
  Sun,
  CloudRain,
  Music
} from 'lucide-react';

const PredictiveAnalytics = () => {
  const [timeCompression, setTimeCompression] = useState(1);
  const [currentHour, setCurrentHour] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);
  const [weatherImpact, setWeatherImpact] = useState('sunny');
  const [specialEvent, setSpecialEvent] = useState(null);

  const hourlyData = [
    { hour: 0, waste: 15, bins: 5, weather: 'clear' },
    { hour: 6, waste: 25, bins: 8, weather: 'clear' },
    { hour: 8, waste: 45, bins: 15, weather: 'sunny' },
    { hour: 12, waste: 85, bins: 35, weather: 'sunny' },
    { hour: 15, waste: 65, bins: 28, weather: 'cloudy' },
    { hour: 18, waste: 95, bins: 42, weather: 'rainy' },
    { hour: 20, waste: 80, bins: 38, weather: 'rainy' },
    { hour: 24, waste: 30, bins: 12, weather: 'clear' }
  ];

  const events = [
    { name: 'Summer Music Festival', impact: 'high', time: 16, color: 'purple' },
    { name: 'Food Truck Rally', impact: 'medium', time: 12, color: 'orange' },
    { name: 'Tech Conference', impact: 'medium', time: 10, color: 'blue' }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentHour(prev => {
          const next = prev + timeCompression;
          if (next >= 24) {
            setIsPlaying(false);
            return 24;
          }
          return next;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeCompression]);

  useEffect(() => {
    // Check for special events
    const currentEvent = events.find(event => Math.abs(event.time - currentHour) < 2);
    setSpecialEvent(currentEvent);
    
    // Update weather based on hour
    if (currentHour >= 16 && currentHour <= 20) {
      setWeatherImpact('rainy');
    } else if (currentHour >= 8 && currentHour <= 15) {
      setWeatherImpact('sunny');
    } else {
      setWeatherImpact('clear');
    }
  }, [currentHour]);

  const getCurrentData = () => {
    const prevHour = Math.floor(currentHour);
    const nextHour = Math.min(23, prevHour + 1);
    const progress = currentHour - prevHour;
    
    const prevData = hourlyData.find(d => d.hour <= prevHour) || hourlyData[0];
    const nextData = hourlyData.find(d => d.hour >= nextHour) || hourlyData[hourlyData.length - 1];
    
    return {
      waste: prevData.waste + (nextData.waste - prevData.waste) * progress,
      bins: prevData.bins + (nextData.bins - prevData.bins) * progress
    };
  };

  const currentData = getCurrentData();

  const startSimulation = () => {
    setCurrentHour(0);
    setIsPlaying(true);
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-400" />;
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-400" />;
      default: return <Cloud className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Time Travel Control Panel */}
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-xl border border-purple-500/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FastForward className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-purple-400">Time Travel Simulator</h2>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={timeCompression}
              onChange={(e) => setTimeCompression(Number(e.target.value))}
              className="bg-gray-800/50 border border-gray-600/30 rounded px-3 py-2 text-white"
            >
              <option value={0.5}>0.5x Speed</option>
              <option value={1}>1x Speed</option>
              <option value={2}>2x Speed</option>
              <option value={4}>4x Speed</option>
            </select>
            <button
              onClick={startSimulation}
              disabled={isPlaying}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isPlaying
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-500/20 border border-purple-500/50 text-purple-400 hover:bg-purple-500/30'
              }`}
            >
              {isPlaying ? 'Simulating...' : 'Start 24h Simulation'}
            </button>
          </div>
        </div>

        {/* Time Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Current Time</span>
            <span>{Math.floor(currentHour)}:00 - {Math.floor(currentHour + 1)}:00</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-200 relative"
              style={{ width: `${(currentHour / 24) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
            {/* Hour markers */}
            <div className="absolute inset-0 flex justify-between items-center px-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-px h-2 bg-gray-500"></div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>
      </div>

      {/* Real-time City State */}
      <div className="grid lg:grid-cols-4 gap-4">
        <div className="bg-green-500/10 backdrop-blur-md rounded-xl border border-green-500/30 p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-green-400 font-medium">Waste Generation</h4>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-500">{currentData.waste.toFixed(0)}%</div>
          <p className="text-green-300 text-sm">City capacity</p>
        </div>

        <div className="bg-blue-500/10 backdrop-blur-md rounded-xl border border-blue-500/30 p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-blue-400 font-medium">Active Bins</h4>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-500">{Math.floor(currentData.bins)}</div>
          <p className="text-blue-300 text-sm">Requiring attention</p>
        </div>

        <div className="bg-orange-500/10 backdrop-blur-md rounded-xl border border-orange-500/30 p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-orange-400 font-medium">Weather Impact</h4>
            {getWeatherIcon(weatherImpact)}
          </div>
          <div className="text-2xl font-bold text-orange-500 capitalize">{weatherImpact}</div>
          <p className="text-orange-300 text-sm">
            {weatherImpact === 'rainy' ? '+15% waste' : 'Normal levels'}
          </p>
        </div>

        <div className="bg-purple-500/10 backdrop-blur-md rounded-xl border border-purple-500/30 p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-purple-400 font-medium">Events Detected</h4>
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-500">
            {specialEvent ? '1' : '0'}
          </div>
          <p className="text-purple-300 text-sm">
            {specialEvent ? specialEvent.name : 'No events'}
          </p>
        </div>
      </div>

      {/* Predictive Chart */}
      <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-gray-600/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-300 font-bold text-lg">24-Hour Prediction Model</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Waste Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Active Bins</span>
            </div>
          </div>
        </div>

        <div className="relative h-64 bg-gray-800/30 rounded-lg">
          <div className="absolute inset-4">
            <svg className="w-full h-full">
              {/* Grid lines */}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={`${(i + 1) * 20}%`}
                  x2="100%"
                  y2={`${(i + 1) * 20}%`}
                  stroke="#374151"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}
              
              {/* Waste level line */}
              <polyline
                points={hourlyData.map((d, i) => 
                  `${(i / (hourlyData.length - 1)) * 100}%,${100 - d.waste}%`
                ).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                className="animate-pulse"
              />
              
              {/* Bins line */}
              <polyline
                points={hourlyData.map((d, i) => 
                  `${(i / (hourlyData.length - 1)) * 100}%,${100 - (d.bins * 2)}%`
                ).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                className="animate-pulse"
              />
              
              {/* Current time indicator */}
              <line
                x1={`${(currentHour / 24) * 100}%`}
                y1="0"
                x2={`${(currentHour / 24) * 100}%`}
                y2="100%"
                stroke="#f59e0b"
                strokeWidth="2"
                className="animate-pulse"
              />
            </svg>
            
            {/* Event markers */}
            {events.map((event, i) => (
              <div
                key={i}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  Math.abs(event.time - currentHour) < 2 ? 'animate-pulse' : ''
                }`}
                style={{ 
                  left: `${(event.time / 24) * 100}%`, 
                  top: '20%' 
                }}
              >
                <div className={`w-4 h-4 bg-${event.color}-500 rounded-full border-2 border-${event.color}-300`}>
                  <Music className="w-2 h-2 text-white m-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Prediction Results */}
      {specialEvent && (
        <div className="bg-purple-500/20 backdrop-blur-md rounded-xl border border-purple-500/50 p-6 animate-fadeIn">
          <div className="flex items-center space-x-4 mb-4">
            <AlertTriangle className="w-8 h-8 text-purple-400 animate-pulse" />
            <div>
              <h4 className="text-purple-400 font-bold text-lg">AI Prediction Alert</h4>
              <p className="text-purple-300">
                Detected: <strong>{specialEvent.name}</strong> at {specialEvent.time}:00
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-4 bg-blue-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-blue-400 font-semibold">Pre-dispatch</p>
              <p className="text-blue-500 text-2xl font-bold">3</p>
              <p className="text-blue-300 text-sm">Extra trucks</p>
            </div>
            
            <div className="text-center p-4 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 font-semibold">Capacity Boost</p>
              <p className="text-green-500 text-2xl font-bold">150%</p>
              <p className="text-green-300 text-sm">Collection rate</p>
            </div>
            
            <div className="text-center p-4 bg-yellow-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-yellow-400 font-semibold">Response Time</p>
              <p className="text-yellow-500 text-2xl font-bold">2h</p>
              <p className="text-yellow-300 text-sm">Before event</p>
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Trends */}
      <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-cyan-500/30 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-cyan-400" />
          <h3 className="text-cyan-400 font-bold text-lg">Seasonal Patterns</h3>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-500/10 rounded-lg">
            <p className="text-green-400 font-semibold">Spring</p>
            <p className="text-2xl font-bold text-green-500">+12%</p>
            <p className="text-green-300 text-sm">Yard waste increase</p>
          </div>
          
          <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
            <p className="text-yellow-400 font-semibold">Summer</p>
            <p className="text-2xl font-bold text-yellow-500">+25%</p>
            <p className="text-yellow-300 text-sm">Festival season</p>
          </div>
          
          <div className="text-center p-4 bg-orange-500/10 rounded-lg">
            <p className="text-orange-400 font-semibold">Fall</p>
            <p className="text-2xl font-bold text-orange-500">+18%</p>
            <p className="text-orange-300 text-sm">Leaf collection</p>
          </div>
          
          <div className="text-center p-4 bg-blue-500/10 rounded-lg">
            <p className="text-blue-400 font-semibold">Winter</p>
            <p className="text-2xl font-bold text-blue-500">-8%</p>
            <p className="text-blue-300 text-sm">Holiday cleanup</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;