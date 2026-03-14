import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, ShieldAlert, Activity, LogOut, Send, AlertCircle, TrendingUp, DollarSign, Database, Download, Globe, Server, Clock, Trash2, Edit } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ScatterChart, Scatter, ZAxis } from 'recharts';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        transaction_amount: 1200.50,
        transaction_time: 14,
        customer_age: 35,
        distance_from_home: 15.5,
        previous_fraud_history: 0,
        merchant_risk_score: 0.1,
        num_transactions_last_24hrs: 2,
        account_type: "Savings",
        region: "North",
        transaction_method: "Online",
        modelAlgorithm: "RandomForest"
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Feature 4: Device Footprint Mock
    const [deviceFootprint, setDeviceFootprint] = useState(null);

    // Feature 2: Live Feed Mock
    const [liveFeed, setLiveFeed] = useState([
        { id: 1, region: 'Europe', amount: 5400, type: 'Card Not Present' },
        { id: 2, region: 'Asia', amount: 12000, type: 'Wire Transfer' },
        { id: 3, region: 'North America', amount: 850, type: 'Mobile Payment' }
    ]);

    // **PERSISTENCE**: Load history securely from LocalStorage
    const [history, setHistory] = useState(() => {
        try {
            const savedItem = localStorage.getItem('falcon_history');
            return savedItem ? JSON.parse(savedItem) : [];
        } catch (e) {
            console.error("Failed to load history", e);
            return [];
        }
    });

    const [filter, setFilter] = useState('ALL');

    // **PERSISTENCE**: Save to LocalStorage whenever history updates
    useEffect(() => {
        localStorage.setItem('falcon_history', JSON.stringify(history));
    }, [history]);

    // Live Feed Simulator
    useEffect(() => {
        const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'];
        const types = ['Wire Transfer', 'Mobile Payment', 'Card Not Present', 'Crypto Exchange'];
        const interval = setInterval(() => {
            setLiveFeed(prev => {
                const newFeed = [{
                    id: Date.now(),
                    region: regions[Math.floor(Math.random() * regions.length)],
                    amount: Math.floor(Math.random() * 20000) + 500,
                    type: types[Math.floor(Math.random() * types.length)]
                }, ...prev.slice(0, 4)];
                return newFeed;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: ['account_type', 'region', 'transaction_method', 'modelAlgorithm'].includes(e.target.name) ? e.target.value : (parseFloat(e.target.value) || 0)
        });
    };

    const generateMockFootprint = () => {
        const osList = ['iOS 16.2', 'Windows 11', 'macOS Ventura', 'Android 13', 'Linux (Ubuntu)'];
        return {
            ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            browser: osList[Math.floor(Math.random() * osList.length)],
            vpn: Math.random() > 0.7 ? 'Detected' : 'None',
            latency: `${Math.floor(Math.random() * 100) + 15}ms`
        };
    };

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        setDeviceFootprint(null);

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const response = await axios.post('http://localhost:8000/predict', formData, {
                headers
            });

            const newResult = response.data;
            setResult(newResult);
            setDeviceFootprint(generateMockFootprint());

            const historyItem = {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString(),
                inputs: { ...formData },
                ...newResult
            };
            setHistory(prev => [historyItem, ...prev]);

            if (newResult.isFraud) {
                try {
                    const userEmail = localStorage.getItem('userEmail');
                    if (userEmail) {
                        await axios.post('http://localhost:5000/api/alert/fraud-alert', {
                            email: userEmail,
                            transactionDetails: historyItem
                        });
                        console.log('Fraud alert email triggered successfully.');
                    }
                } catch (alertErr) {
                    console.error('Failed to trigger fraud alert email:', alertErr);
                }
            }

        } catch (err) {
            if (err.response && err.response.status === 429) {
                setError(err.response.data.detail || "Rate limit exceeded.");
            } else {
                setError("Error connecting to the ML service. Make sure it's running.");
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const filteredHistory = history.filter(item => {
        if (filter === 'FRAUD') return item.isFraud;
        if (filter === 'SAFE') return !item.isFraud;
        return true;
    });

    // Table Action: Remove Item
    const handleRemoveItem = (id) => {
        setHistory(prev => prev.filter(item => item.id !== id));
    };

    // Table Action: Edit Item
    const handleEditItem = (item) => {
        setFormData(item.inputs);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Feature 1: CSV Export Action
    const handleExportCSV = () => {
        const headers = ['Time', 'Amount', 'Method', 'Region', 'Risk Score', 'Status'];
        const csvRows = [headers.join(',')];

        filteredHistory.forEach(item => {
            csvRows.push([
                item.timestamp,
                item.inputs.transaction_amount,
                item.inputs.transaction_method,
                item.inputs.region,
                item.riskScore + '%',
                item.isFraud ? 'Fraud' : 'Safe'
            ].join(','));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "falcon_fraud_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const chartData = [
        { name: 'Risk', value: result ? result.riskScore : 0 },
        { name: 'Safe', value: result ? 100 - result.riskScore : 100 }
    ];
    const COLORS = ['#ef4444', '#10b981'];

    const totalTransactions = history.length;
    const fraudCases = history.filter(h => h.isFraud).length;
    const avgRiskScore = totalTransactions > 0
        ? (history.reduce((acc, h) => acc + h.riskScore, 0) / totalTransactions).toFixed(1)
        : 0;
    const totalAmountAnalyzed = history.reduce((acc, h) => acc + Number(h.inputs.transaction_amount), 0);
    const validCases = totalTransactions - fraudCases;

    const donutData = [
        { name: 'Intercepted', value: fraudCases },
        { name: 'Valid', value: validCases }
    ];

    const trendData = [...history].reverse().slice(-15).map((h) => ({
        time: h.timestamp.split(' ')[0],
        Risk: h.riskScore,
        Amount: Number(h.inputs.transaction_amount),
        HourOfDay: Number(h.inputs.transaction_time)
    }));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                            <Activity className="w-8 h-8 text-primary animate-pulse" />
                            FALCON Global Platform
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Enterprise telemetry framework connected to localized ML models.
                        </p>
                    </div>
                    {localStorage.getItem('token') && (
                        <button onClick={logout} className="mt-4 sm:mt-0 flex items-center gap-2 text-sm bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg transition-all shadow-sm">
                            <LogOut className="w-4 h-4" />
                            Secure Sign Out
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg">
                            <Database className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Analyzed</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalTransactions}</h3>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
                        <div className="p-3 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Threats Stopped</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{fraudCases}</h3>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 rounded-lg">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Network Avg Risk</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{avgRiskScore}%</h3>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
                        <div className="p-3 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cumulative Monitored Volume</p>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">${totalAmountAnalyzed.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">

                    {/* Live Global Threat Feed */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="bg-gray-100 dark:bg-black rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden relative transition-colors">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                                <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">Live Intercept Feed</h3>
                            </div>
                            <div className="space-y-3 relative z-10">
                                {liveFeed.map((feed) => (
                                    <div key={feed.id} className="bg-white/90 dark:bg-gray-800/80 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-xs animate-in slide-in-from-right duration-500">
                                        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 mb-1">
                                            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {feed.region}</span>
                                            <span className="text-red-500 dark:text-red-400 font-bold">BLOCKED</span>
                                        </div>
                                        <div className="text-gray-900 dark:text-white font-medium">${feed.amount.toLocaleString()} • {feed.type}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/80 dark:from-black/80 to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700 relative">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                            Model Input Pipeline
                        </h2>
                        <form onSubmit={handlePredict} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            {Object.keys(formData).map(key => (
                                <div key={key}>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                                        {key.replace(/_/g, ' ')}
                                    </label>
                                    {key === "modelAlgorithm" ? (
                                        <select
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors sm:text-sm"
                                        >
                                            <option value="RandomForest">Random Forest Ensembles</option>
                                            <option value="LogisticRegression">Logistic Regression</option>
                                            <option value="MLPClassifier">Deep Neural Network (MLP)</option>
                                            <option value="KNN">K-Nearest Neighbors</option>
                                            <option value="SVC">Support Vector Margin (SVC)</option>
                                            <option value="GaussianNB">Gaussian Naive Bayes Prediction</option>
                                        </select>
                                    ) : (
                                        <input
                                            type={['account_type', 'region', 'transaction_method'].includes(key) ? 'text' : 'number'}
                                            step={['account_type', 'region', 'transaction_method'].includes(key) ? undefined : 'any'}
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-colors sm:text-sm"
                                        />
                                    )}
                                </div>
                            ))}

                            <div className="sm:col-span-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-all shadow-primary/30 hover:shadow-primary/50 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Executing Machine Learning Models...
                                        </>
                                    ) : (
                                        <>
                                            <Server className="w-5 h-5" />
                                            Analyze Vector
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col relative overflow-hidden">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                            Diagnostic Integrity
                        </h2>

                        <div className="flex-grow flex flex-col justify-center">
                            {error && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-start gap-3 border border-red-200 dark:border-red-900/50">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium">{error}</span>
                                </div>
                            )}

                            {!result && !error && !loading && (
                                <div className="text-center text-gray-400 dark:text-gray-500 py-10">
                                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p className="text-sm">Awaiting pipeline vector execution.</p>
                                </div>
                            )}

                            {result && (
                                <div className="animate-in fade-in duration-300">
                                    <div className="h-40 relative mb-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    cx="50%"
                                                    cy="80%"
                                                    startAngle={180}
                                                    endAngle={0}
                                                    innerRadius={50}
                                                    outerRadius={75}
                                                    paddingAngle={0}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute top-[50%] left-0 w-full text-center">
                                            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                                {result.riskScore}<span className="text-lg text-gray-500">%</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className={`p-3 rounded-lg flex items-center gap-3 mb-4 ${result.isFraud
                                        ? 'bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100 border border-red-200 dark:border-red-800'
                                        : 'bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100 border border-green-200 dark:border-green-800'
                                        }`}>
                                        <div className={`p-2 rounded-full ${result.isFraud ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' : 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400'
                                            }`}>
                                            {result.isFraud ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold">
                                                {result.isFraud ? 'HIGH THREAT DETECTED' : 'SECURE CONNECTION'}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Feature: Device Footprint Mock */}
                                    {deviceFootprint && (
                                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700/50 text-xs text-gray-600 dark:text-gray-400">
                                            <p className="font-semibold text-gray-900 dark:text-gray-200 mb-2">Network Fingerprint</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div><span className="opacity-70">IP:</span> {deviceFootprint.ip}</div>
                                                <div><span className="opacity-70">OS:</span> {deviceFootprint.browser}</div>
                                                <div><span className="opacity-70">VPN:</span> <span className={deviceFootprint.vpn === 'Detected' ? 'text-red-500 font-semibold' : ''}>{deviceFootprint.vpn}</span></div>
                                                <div><span className="opacity-70">Latency:</span> {deviceFootprint.latency}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                            Model Reliability Analysis
                        </h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '0.5rem' }}
                                    />
                                    <Area type="monotone" dataKey="Risk" stroke="#ef4444" fillOpacity={1} fill="url(#colorRisk)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-purple-500" />
                            Time-of-day Risk Analyzer
                        </h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                {/* Feature: Scatter Chart to show Time vs Risk */}
                                <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                                    <XAxis dataKey="HourOfDay" name="Hour" unit="H" type="number" domain={[0, 24]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                    <YAxis dataKey="Risk" name="Risk Score" unit="%" type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                    <ZAxis range={[50, 400]} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '0.5rem' }} />
                                    <Scatter name="Transactions" data={trendData} fill="#8b5cf6" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* NEW Donut Chart */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 flex items-center gap-2">
                            <Database className="w-5 h-5 text-green-500" />
                            Global Distribution
                        </h2>
                        <div className="h-64 flex flex-col items-center justify-center">
                            {totalTransactions > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={donutData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {donutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '0.5rem' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-sm text-gray-400">No telemetry data available.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">
                            Central Auditing Matrix
                        </h2>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex bg-gray-100 dark:bg-gray-900/50 rounded-lg p-1 border border-gray-200 dark:border-gray-700/50 shadow-inner">
                                <button
                                    onClick={() => setFilter('ALL')}
                                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${filter === 'ALL' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                                >All</button>
                                <button
                                    onClick={() => setFilter('FRAUD')}
                                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${filter === 'FRAUD' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-500 hover:text-red-600 dark:text-gray-400'}`}
                                >Threats</button>
                                <button
                                    onClick={() => setFilter('SAFE')}
                                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${filter === 'SAFE' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-500 hover:text-green-600 dark:text-gray-400'}`}
                                >Secured</button>
                            </div>

                            {/* Feature: CSV Export */}
                            <button
                                onClick={handleExportCSV}
                                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm shadow-sm"
                            >
                                <Download className="w-4 h-4" /> Export CSV
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Execution Time</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Financial Vol</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Protocol</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Global Zone</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Model Index (Risk)</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Security Action</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <Activity className="w-10 h-10 text-gray-300 dark:text-gray-600 animate-pulse" />
                                                <p>Auditing framework is empty down this vector.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredHistory.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 font-mono">{item.timestamp}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 dark:text-gray-200">${Number(item.inputs.transaction_amount).toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"><span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{item.inputs.transaction_method}</span></td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.inputs.region}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-gray-900 dark:text-white">{item.riskScore}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-md uppercase tracking-wider ${item.isFraud ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'}`}>
                                                    {item.isFraud ? 'Intercepted' : 'Valid'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleEditItem(item)} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mr-4 transition-colors">
                                                    <Edit className="w-4 h-4 inline" />
                                                </button>
                                                <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                                                    <Trash2 className="w-4 h-4 inline" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
