import React, { useState, useEffect } from 'react';
import { MapPin, Truck, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

const CityOverview = () => {
  const [binData, setBinData] = useState([
    { id: 1, x: 20, y: 30, level: 85, status: 'warning', district: 'Downtown' },
    { id: 2, x: 45, y: 25, level: 95, status: 'critical', district: 'Tech Hub' },
    { id: 3, x: 70, y: 40, level: 45, status: 'optimal', district: 'Residential' },
    { id: 4, x: 25, y: 60, level: 70, status: 'optimal', district: 'Shopping' },
    { id: 5, x: 80, y: 70, level: 90, status: 'warning', district: 'Industrial' },
    { id: 6, x: 60, y: 55, level: 30, status: 'optimal', district: 'Parks' },
  ]);

  const [trucks, setTrucks] = useState([
    { id: 1, x: 15, y: 35, route: [1, 4], efficiency: 92 },
    { id: 2, x: 75, y: 45, route: [3, 6], efficiency: 88 },
    { id: 3, x: 50, y: 30, route: [2, 5], efficiency: 95 },
  ]);

  const [dataStreams, setDataStreams] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update bin levels randomly
      setBinData(prev => prev.map(bin => ({
        ...bin,
        level: Math.max(0, Math.min(100, bin.level + (Math.random() - 0.5) * 10)),
        status: bin.level > 90 ? 'critical' : bin.level > 75 ? 'warning' : 'optimal'
      })));

      // Move trucks along their routes
      setTrucks(prev => prev.map(truck => ({
        ...truck,
        x: truck.x + (Math.random() - 0.5) * 2,
        y: truck.y + (Math.random() - 0.5) * 2,
      })));

      // Generate data streams
      setDataStreams([
        { from: { x: 20, y: 30 }, to: { x: 50, y: 10 }, type: 'data' },
        { from: { x: 70, y: 40 }, to: { x: 50, y: 10 }, type: 'alert' },
        { from: { x: 80, y: 70 }, to: { x: 50, y: 10 }, type: 'prediction' }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-500 bg-red-500/20 border-red-500';
      case 'warning': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500';
      default: return 'text-green-500 bg-green-500/20 border-green-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-3 h-3" />;
      case 'warning': return <Activity className="w-3 h-3" />;
      default: return <CheckCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-green-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm">Active Bins</p>
              <p className="text-2xl font-bold text-green-500">247</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">98.7% operational</span>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-blue-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm">Fleet Active</p>
              <p className="text-2xl font-bold text-blue-500">34</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Avg efficiency 91%</span>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-yellow-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm">Alerts</p>
              <p className="text-2xl font-bold text-yellow-500">12</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
            <span className="text-xs text-gray-400">3 critical</span>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-purple-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm">AI Predictions</p>
              <p className="text-2xl font-bold text-purple-500">156</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Next 24h forecast</span>
          </div>
        </div>
      </div>

      {/* Main City Hologram */}
      <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-cyan-500/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-cyan-400">City-Wide Hologram Network</h2>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors">
              3D View
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-gray-400 hover:bg-gray-700/50 transition-colors">
              Satellite
            </button>
          </div>
        </div>

        {/* Interactive City Map */}
        <div className="relative h-96 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/50 overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-12 grid-rows-8 h-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="border border-cyan-500/20"></div>
              ))}
            </div>
          </div>

          {/* Data Stream Lines */}
          {dataStreams.map((stream, i) => (
            <div
              key={i}
              className={`absolute w-px h-px ${
                stream.type === 'alert' ? 'bg-red-500' : 
                stream.type === 'prediction' ? 'bg-purple-500' : 'bg-green-500'
              }`}
              style={{
                left: `${stream.from.x}%`,
                top: `${stream.from.y}%`,
                width: `${Math.abs(stream.to.x - stream.from.x)}%`,
                height: `${Math.abs(stream.to.y - stream.from.y)}%`,
                transform: `rotate(${Math.atan2(stream.to.y - stream.from.y, stream.to.x - stream.from.x) * 180 / Math.PI}deg)`,
                transformOrigin: '0 0',
                animation: 'dataFlow 2s infinite'
              }}
            ></div>
          ))}

          {/* Smart Bins */}
          {binData.map((bin) => (
            <div
              key={bin.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${bin.x}%`, top: `${bin.y}%` }}
            >
              <div className={`relative w-6 h-6 rounded-full border-2 ${getStatusColor(bin.status)} animate-pulse`}>
                <div className="absolute inset-1 rounded-full bg-current opacity-50"></div>
                {getStatusIcon(bin.status)}
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm rounded px-2 py-1 text-xs whitespace-nowrap">
                <p className="text-white">{bin.district}</p>
                <p className="text-gray-400">{bin.level}%</p>
              </div>
            </div>
          ))}

          {/* Truck Fleet */}
          {trucks.map((truck) => (
            <div
              key={truck.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${truck.x}%`, top: `${truck.y}%` }}
            >
              <div className="relative w-8 h-8 bg-blue-500/20 rounded-lg border border-blue-500 flex items-center justify-center">
                <Truck className="w-4 h-4 text-blue-400" />
                <div className="absolute -top-2 -right-2 bg-green-500 text-xs rounded-full px-1">
                  {truck.efficiency}%
                </div>
              </div>
            </div>
          ))}

          {/* Command Center */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-cyan-500/30 backdrop-blur-md rounded-lg border border-cyan-500 p-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>
                <span className="text-cyan-400 text-sm font-medium">Command Center</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Optimal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Warning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-sm text-gray-400">Critical</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Last updated: <span className="text-cyan-400">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityOverview;