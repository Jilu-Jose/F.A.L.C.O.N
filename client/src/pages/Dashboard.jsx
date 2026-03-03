import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, ShieldAlert, Activity, LogOut, Send, AlertCircle, TrendingUp, DollarSign, Database } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

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

    // History State
    const [history, setHistory] = useState([]);
    const [filter, setFilter] = useState('ALL');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: ['account_type', 'region', 'transaction_method', 'modelAlgorithm'].includes(e.target.name) ? e.target.value : (parseFloat(e.target.value) || 0)
        });
    };

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const response = await axios.post('http://localhost:8000/predict', formData, {
                headers
            });

            const newResult = response.data;
            setResult(newResult);

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

    const chartData = [
        { name: 'Risk', value: result ? result.riskScore : 0 },
        { name: 'Safe', value: result ? 100 - result.riskScore : 100 }
    ];
    const COLORS = ['#ef4444', '#10b981'];

    // Stats calculations
    const totalTransactions = history.length;
    const fraudCases = history.filter(h => h.isFraud).length;
    const avgRiskScore = totalTransactions > 0
        ? (history.reduce((acc, h) => acc + h.riskScore, 0) / totalTransactions).toFixed(1)
        : 0;
    const totalAmountAnalyzed = history.reduce((acc, h) => acc + Number(h.inputs.transaction_amount), 0);

    const trendData = [...history].reverse().slice(-15).map((h) => ({
        time: h.timestamp.split(' ')[0],
        Risk: h.riskScore,
        Amount: Number(h.inputs.transaction_amount)
    }));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                            <Activity className="w-8 h-8 text-primary" />
                            Fraud Prediction Center
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Analyze transaction telemetry against the FALCON ML model.
                        </p>
                    </div>
                    {localStorage.getItem('token') && (
                        <button onClick={logout} className="mt-4 sm:mt-0 flex items-center gap-2 text-sm bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg transition-all shadow-sm">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    )}
                </div>

                {/* NEW STATS OVERVIEW ROW */}
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
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fraud Detected</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{fraudCases}</h3>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 rounded-lg">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Risk</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{avgRiskScore}%</h3>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
                        <div className="p-3 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Vol</p>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">${totalAmountAnalyzed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                            Transaction Telemetry
                        </h2>
                        <form onSubmit={handlePredict} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
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
                                            <option value="RandomForest">Random Forest</option>
                                            <option value="LogisticRegression">Logistic Regression</option>
                                            <option value="MLPClassifier">Neural Network (MLP)</option>
                                            <option value="KNN">K-Nearest Neighbors</option>
                                            <option value="SVC">Support Vector Classifier (SVC)</option>
                                            <option value="GaussianNB">Gaussian Naive Bayes</option>
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

                            <div className="sm:col-span-2 lg:col-span-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Analyze Transaction
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                            Analysis Results
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
                                    <p className="text-sm">Submit a transaction to view<br />the AI risk analysis.</p>
                                </div>
                            )}

                            {result && (
                                <div className="animate-in fade-in duration-300">
                                    <div className="h-56 relative mb-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    cx="50%"
                                                    cy="75%"
                                                    startAngle={180}
                                                    endAngle={0}
                                                    innerRadius={70}
                                                    outerRadius={95}
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
                                        <div className="absolute top-[60%] left-0 w-full text-center">
                                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                                {result.riskScore}<span className="text-xl text-gray-500">%</span>
                                            </span>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">Risk Score</p>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-lg flex items-center gap-4 ${result.isFraud
                                        ? 'bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100 border border-red-200 dark:border-red-800'
                                        : 'bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100 border border-green-200 dark:border-green-800'
                                        }`}>
                                        <div className={`p-2 rounded-full ${result.isFraud ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' : 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400'
                                            }`}>
                                            {result.isFraud ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold">
                                                {result.isFraud ? 'FRAUD DETECTED' : 'TRANSACTION SAFE'}
                                            </h3>
                                            <p className="text-xs opacity-80 mt-0.5">
                                                {result.isFraud
                                                    ? 'High probability of unauthorized activity.'
                                                    : 'Behavior verified as standard.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* NEW CHARTS SECTION */}
                {history.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                                Risk Trend Analysis
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
                                            itemStyle={{ color: '#f3f4f6' }}
                                        />
                                        <Area type="monotone" dataKey="Risk" stroke="#ef4444" fillOpacity={1} fill="url(#colorRisk)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-500" />
                                Transaction Amounts
                            </h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '0.5rem' }}
                                            itemStyle={{ color: '#f3f4f6' }}
                                            formatter={(value) => [`$${value}`, 'Amount']}
                                        />
                                        <Bar dataKey="Amount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">
                            Transaction History
                        </h2>
                        <div className="inline-flex bg-gray-100 dark:bg-gray-900/50 rounded-lg p-1 border border-gray-200 dark:border-gray-700/50 shadow-inner">
                            <button
                                onClick={() => setFilter('ALL')}
                                className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${filter === 'ALL' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('FRAUD')}
                                className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${filter === 'FRAUD' ? 'bg-red-500 text-white shadow-sm shadow-red-500/30' : 'text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-white/50 dark:hover:bg-gray-800/50'}`}
                            >
                                Fraud
                            </button>
                            <button
                                onClick={() => setFilter('SAFE')}
                                className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${filter === 'SAFE' ? 'bg-green-500 text-white shadow-sm shadow-green-500/30' : 'text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 hover:bg-white/50 dark:hover:bg-gray-800/50'}`}
                            >
                                Safe
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Time</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Method</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Region</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Risk Score</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <Activity className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                                                <p>No transactions found for this filter.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredHistory.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{item.timestamp}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${Number(item.inputs.transaction_amount).toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.inputs.transaction_method}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.inputs.region}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.riskScore}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isFraud ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400' : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400'}`}>
                                                    {item.isFraud ? 'Fraud' : 'Safe'}
                                                </span>
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
