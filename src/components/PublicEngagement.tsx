import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Trophy, 
  Star, 
  Medal, 
  Gift,
  Camera,
  MessageCircle,
  Zap,
  Target,
  Award,
  Gamepad2
} from 'lucide-react';

const PublicEngagement = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('Downtown');
  const [userPoints, setUserPoints] = useState(1247);
  const [showAR, setShowAR] = useState(false);

  const districts = [
    { name: 'Downtown', score: 94, population: 15240, rank: 1 },
    { name: 'Tech Hub', score: 91, population: 8920, rank: 2 },
    { name: 'Residential', score: 88, population: 22100, rank: 3 },
    { name: 'Shopping', score: 85, population: 12600, rank: 4 },
    { name: 'Industrial', score: 79, population: 5200, rank: 5 }
  ];

  const achievements = [
    { id: 1, name: 'Eco Warrior', points: 100, icon: '🌿', unlocked: true },
    { id: 2, name: 'Sort Master', points: 150, icon: '♻️', unlocked: true },
    { id: 3, name: 'Report Hero', points: 200, icon: '📸', unlocked: true },
    { id: 4, name: 'Green Leader', points: 300, icon: '🏆', unlocked: false },
    { id: 5, name: 'City Champion', points: 500, icon: '👑', unlocked: false }
  ];

  const recentReports = [
    { id: 1, user: 'Alex M.', location: 'Central Park', type: 'Full bin', points: 50, verified: true },
    { id: 2, user: 'Sarah K.', location: 'Main Street', type: 'Damaged bin', points: 75, verified: true },
    { id: 3, user: 'Mike R.', location: 'Tech Plaza', type: 'Overflow', points: 60, verified: false },
    { id: 4, user: 'Lisa C.', location: 'School Zone', type: 'Maintenance', points: 40, verified: true }
  ];

  const [gameActive, setGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameItems, setGameItems] = useState([]);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        setGameItems(prev => [
          ...prev,
          {
            id: Date.now(),
            type: Math.random() > 0.5 ? 'recyclable' : 'waste',
            x: Math.random() * 300,
            y: Math.random() * 200
          }
        ].slice(-5));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameActive]);

  const startARGame = () => {
    setShowAR(true);
    setGameActive(true);
    setGameScore(0);
    setGameItems([]);
  };

  const handleItemClick = (item) => {
    setGameScore(prev => prev + (item.type === 'recyclable' ? 10 : 5));
    setGameItems(prev => prev.filter(i => i.id !== item.id));
    setUserPoints(prev => prev + 5);
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
      case 2: return 'text-gray-300 bg-gray-500/20 border-gray-400';
      case 3: return 'text-orange-400 bg-orange-500/20 border-orange-500';
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* User Profile & Points */}
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-xl border border-green-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center border border-green-500">
              <Users className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Welcome, Eco Citizen!</h3>
              <p className="text-gray-400">Making the city cleaner, one action at a time</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-500">{userPoints.toLocaleString()}</div>
            <p className="text-green-400">EcoPoints</p>
            <div className="flex items-center space-x-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < 3 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Community Leaderboard */}
      <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-purple-500/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-purple-400" />
            <h3 className="text-purple-400 font-bold text-lg">District Championship</h3>
          </div>
          <div className="text-sm text-gray-400">Updated live</div>
        </div>

        <div className="grid gap-4">
          {districts.map((district) => (
            <button
              key={district.name}
              onClick={() => setSelectedDistrict(district.name)}
              className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                selectedDistrict === district.name
                  ? 'bg-purple-500/20 border-purple-500'
                  : 'bg-gray-800/30 border-gray-600/30 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(district.rank)}`}>
                    #{district.rank}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{district.name}</h4>
                    <p className="text-gray-400 text-sm">{district.population.toLocaleString()} residents</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-500">{district.score}</div>
                  <p className="text-green-400 text-sm">Eco Score</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-gray-700/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${district.score}%` }}
                ></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* AR Waste Sorting Game */}
        <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-cyan-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Gamepad2 className="w-6 h-6 text-cyan-400" />
              <h3 className="text-cyan-400 font-bold text-lg">AR Sorting Challenge</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-cyan-400 font-semibold">Score: {gameScore}</span>
            </div>
          </div>

          <div className="relative h-64 bg-gradient-to-br from-gray-800/50 to-cyan-900/20 rounded-lg overflow-hidden">
            {!gameActive ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-cyan-400 font-semibold mb-2">AR Waste Sorting</p>
                  <p className="text-gray-400 text-sm mb-4">Point your camera at waste items to sort them!</p>
                  <button
                    onClick={startARGame}
                    className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                  >
                    Start AR Game
                  </button>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 bg-cyan-500/20 backdrop-blur-sm rounded px-3 py-1 text-cyan-400">
                  AR Mode Active
                </div>
                
                {/* Game Items */}
                {gameItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`absolute w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${
                      item.type === 'recyclable' 
                        ? 'bg-green-500/30 border border-green-500 text-green-400'
                        : 'bg-red-500/30 border border-red-500 text-red-400'
                    }`}
                    style={{ left: item.x, top: item.y }}
                  >
                    {item.type === 'recyclable' ? '♻️' : '🗑️'}
                  </button>
                ))}
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => {setGameActive(false); setShowAR(false);}}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded text-red-400"
                  >
                    Stop Game
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Citizen Reports */}
        <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-orange-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Camera className="w-6 h-6 text-orange-400" />
              <h3 className="text-orange-400 font-bold text-lg">Citizen Reports</h3>
            </div>
            <button className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded text-orange-400 hover:bg-orange-500/30 transition-colors">
              Submit Report
            </button>
          </div>

          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Camera className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{report.user}</p>
                      <p className="text-gray-400 text-sm">{report.location} • {report.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center space-x-1 ${report.verified ? 'text-green-400' : 'text-yellow-400'}`}>
                      <span className="font-semibold">+{report.points}</span>
                      <Zap className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-gray-500">
                      {report.verified ? 'Verified' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements System */}
      <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-yellow-500/30 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Award className="w-6 h-6 text-yellow-400" />
          <h3 className="text-yellow-400 font-bold text-lg">Achievement Gallery</h3>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-lg border text-center transition-all duration-300 ${
                achievement.unlocked
                  ? 'bg-yellow-500/20 border-yellow-500/50 scale-100'
                  : 'bg-gray-700/20 border-gray-600/30 opacity-60 scale-95'
              }`}
            >
              <div className={`text-4xl mb-2 ${achievement.unlocked ? 'animate-bounce' : 'grayscale'}`}>
                {achievement.icon}
              </div>
              <h4 className={`font-semibold ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'}`}>
                {achievement.name}
              </h4>
              <p className={`text-sm ${achievement.unlocked ? 'text-yellow-300' : 'text-gray-600'}`}>
                {achievement.points} pts
              </p>
              {achievement.unlocked && (
                <div className="mt-2 flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
                  <span className="text-yellow-400 text-xs">Unlocked!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Store */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-xl border border-purple-500/30 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Gift className="w-6 h-6 text-purple-400" />
          <h3 className="text-purple-400 font-bold text-lg">EcoRewards Store</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
            <div className="text-3xl mb-2">🌱</div>
            <h4 className="text-purple-400 font-semibold">Tree Planting</h4>
            <p className="text-purple-300 text-sm">500 points</p>
            <button className="w-full mt-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 hover:bg-purple-500/30 transition-colors">
              Redeem
            </button>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <div className="text-3xl mb-2">🎫</div>
            <h4 className="text-blue-400 font-semibold">Transit Pass</h4>
            <p className="text-blue-300 text-sm">300 points</p>
            <button className="w-full mt-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 hover:bg-blue-500/30 transition-colors">
              Redeem
            </button>
          </div>

          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <div className="text-3xl mb-2">☕</div>
            <h4 className="text-green-400 font-semibold">Café Discount</h4>
            <p className="text-green-300 text-sm">150 points</p>
            <button className="w-full mt-2 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded text-green-400 hover:bg-green-500/30 transition-colors">
              Redeem
            </button>
          </div>

          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
            <div className="text-3xl mb-2">📱</div>
            <h4 className="text-orange-400 font-semibold">Phone Case</h4>
            <p className="text-orange-300 text-sm">800 points</p>
            <button className="w-full mt-2 px-3 py-2 bg-gray-600/50 border border-gray-600/30 rounded text-gray-500 cursor-not-allowed">
              Need 553 more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicEngagement;