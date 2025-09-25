import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Leaf, 
  Shield, 
  AlertTriangle, 
  TrendingUp,
  Target,
  Award,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AuditDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [carbonCredits, setCarbonCredits] = useState(127.5);
  const [costSavings, setCostSavings] = useState(245890);
  const [fraudDetected, setFraudDetected] = useState(3);

  const auditMetrics = {
    compliance: 94.7,
    efficiency: 91.2,
    transparency: 98.1,
    sustainability: 89.6
  };

  const financialData = [
    { category: 'Fuel Savings', amount: 45720, change: 12 },
    { category: 'Route Optimization', amount: 89340, change: 18 },
    { category: 'Maintenance Reduction', amount: 23890, change: -3 },
    { category: 'Penalty Avoidance', amount: 86940, change: 25 }
  ];

  const complianceItems = [
    { item: 'EPA Regulations', status: 'compliant', score: 98 },
    { item: 'City Ordinances', status: 'compliant', score: 96 },
    { item: 'Safety Standards', status: 'warning', score: 87 },
    { item: 'Data Privacy', status: 'compliant', score: 99 }
  ];

  const fraudAlerts = [
    { id: 1, type: 'False Report', location: 'Sector 7', severity: 'low', status: 'resolved' },
    { id: 2, type: 'Route Deviation', location: 'Route B', severity: 'medium', status: 'investigating' },
    { id: 3, type: 'Time Fraud', location: 'Fleet #23', severity: 'high', status: 'confirmed' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCarbonCredits(prev => prev + Math.random() * 2);
      setCostSavings(prev => prev + Math.random() * 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-green-500 bg-green-500/20';
      case 'warning': return 'text-yellow-500 bg-yellow-500/20';
      case 'violation': return 'text-red-500 bg-red-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Audit & Compliance Center</h2>
        <div className="flex items-center space-x-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800/50 border border-gray-600/30 rounded px-4 py-2 text-white"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="px-6 py-2 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 hover:bg-blue-500/30 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-green-500/10 backdrop-blur-md rounded-xl border border-green-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <Leaf className="w-8 h-8 text-green-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-green-500">{carbonCredits.toFixed(1)}</div>
              <div className="text-green-400 text-sm">CO₂ Credits (tons)</div>
            </div>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full w-3/4 animate-pulse"></div>
          </div>
          <div className="mt-2 text-green-300 text-sm">+15.2% from last month</div>
        </div>

        <div className="bg-blue-500/10 backdrop-blur-md rounded-xl border border-blue-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-blue-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-500">€{(costSavings / 1000).toFixed(0)}K</div>
              <div className="text-blue-400 text-sm">Cost Savings</div>
            </div>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full w-4/5 animate-pulse"></div>
          </div>
          <div className="mt-2 text-blue-300 text-sm">+€47K this month</div>
        </div>

        <div className="bg-purple-500/10 backdrop-blur-md rounded-xl border border-purple-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-purple-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-500">{auditMetrics.compliance}%</div>
              <div className="text-purple-400 text-sm">Compliance</div>
            </div>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${auditMetrics.compliance}%` }}
            ></div>
          </div>
          <div className="mt-2 text-purple-300 text-sm">Excellent standing</div>
        </div>

        <div className="bg-red-500/10 backdrop-blur-md rounded-xl border border-red-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-red-500">{fraudDetected}</div>
              <div className="text-red-400 text-sm">Fraud Alerts</div>
            </div>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full w-1/4"></div>
          </div>
          <div className="mt-2 text-red-300 text-sm">-2 from last month</div>
        </div>
      </div>

      {/* Financial Breakdown */}
      <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-yellow-500/30 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <DollarSign className="w-6 h-6 text-yellow-400" />
          <h3 className="text-yellow-400 font-bold text-lg">Financial Impact Analysis</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {financialData.map((item) => (
            <div key={item.category} className="p-4 bg-gray-800/30 rounded-lg border border-gray-600/30">
              <h4 className="text-gray-400 text-sm font-medium">{item.category}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-white">€{(item.amount / 1000).toFixed(0)}K</span>
                <div className={`flex items-center space-x-1 ${
                  item.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${item.change < 0 ? 'rotate-180' : ''}`} />
                  <span className="text-sm font-semibold">{Math.abs(item.change)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Savings Visualization */}
        <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">€{(costSavings / 1000).toFixed(0)}K</div>
            <p className="text-green-400 font-semibold">Total Monthly Savings</p>
            <p className="text-green-300 text-sm">Equivalent to 47 days of operational costs</p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{((costSavings / 12) / 1000).toFixed(0)}K</div>
                <div className="text-gray-400 text-xs">Per month avg</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{(costSavings * 12 / 1000).toFixed(0)}K</div>
                <div className="text-gray-400 text-xs">Projected yearly</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Compliance Status */}
        <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-green-500/30 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-green-400" />
            <h3 className="text-green-400 font-bold text-lg">Compliance Monitor</h3>
          </div>

          <div className="space-y-4">
            {complianceItems.map((item) => (
              <div key={item.item} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'compliant' ? 'bg-green-500' : 'bg-yellow-500'
                  } animate-pulse`}></div>
                  <span className="text-white">{item.item}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">{item.score}%</span>
                  {item.status === 'compliant' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Compliance Certificate Valid</span>
            </div>
            <p className="text-green-300 text-sm mt-1">Next audit: March 2025</p>
          </div>
        </div>

        {/* Fraud Detection */}
        <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-red-500/30 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="w-6 h-6 text-red-400" />
            <h3 className="text-red-400 font-bold text-lg">Fraud Detection Center</h3>
          </div>

          <div className="space-y-4">
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{alert.type}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{alert.location}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.status === 'resolved' ? 'bg-green-500' :
                    alert.status === 'investigating' ? 'bg-yellow-500' :
                    'bg-red-500'
                  } animate-pulse`}></div>
                  <span className="text-gray-300 text-sm capitalize">{alert.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="p-3 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 hover:bg-blue-500/30 transition-colors">
              View All Alerts
            </button>
            <button className="p-3 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 hover:bg-purple-500/30 transition-colors">
              AI Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-xl border border-green-500/30 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Leaf className="w-6 h-6 text-green-400" />
          <h3 className="text-green-400 font-bold text-lg">Environmental Impact Dashboard</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-green-500">{carbonCredits.toFixed(1)}</div>
            <p className="text-green-400">Carbon Credits</p>
            <p className="text-green-300 text-sm">Tons CO₂ saved</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-500">92%</div>
            <p className="text-blue-400">Recycling Rate</p>
            <p className="text-blue-300 text-sm">Above city target</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-500">18%</div>
            <p className="text-purple-400">Efficiency Gain</p>
            <p className="text-purple-300 text-sm">Route optimization</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-yellow-500">A+</div>
            <p className="text-yellow-400">Sustainability</p>
            <p className="text-yellow-300 text-sm">City rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditDashboard;