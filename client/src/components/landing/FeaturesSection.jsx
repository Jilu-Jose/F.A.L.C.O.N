import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Lock, Monitor, Database, Zap, ArrowRight, Shield } from 'lucide-react';

const features = [
    {
        name: 'Real-Time Monitoring',
        description: 'Socket.io streams transaction data instantly, allowing your team to respond to threats in milliseconds.',
        icon: Activity,
    },
    {
        name: 'AI Risk Scoring',
        description: 'Our Python ML microservice evaluates patterns and assigns a precise probability risk score (0-100).',
        icon: Zap,
    },
    {
        name: 'Secure Authentication',
        description: 'Robust JWT-based role access ensures analysts and admins see exactly what they need, safely.',
        icon: Lock,
    },
    {
        name: 'Interactive Dashboard',
        description: 'A dark/light themed React Vite frontend with Recharts, enabling rapid data comprehension.',
        icon: Monitor,
    },
    {
        name: 'Microservice Architecture',
        description: 'Decoupled Node.js and FastAPI backends allow for horizontally scaling machine learning tasks independently.',
        icon: Database,
    },
    {
        name: 'Industry-Grade Security',
        description: 'Enterprise-ready standards to prevent data leaks while preserving complete visibility.',
        icon: ShieldCheck,
    },
];

const FeaturesSection = () => {
    // Feature 4: Mini Risk Calculator State
    const [mockAmount, setMockAmount] = useState(500);
    const [mockCount, setMockCount] = useState(1);
    const [mockScore, setMockScore] = useState(12);

    useEffect(() => {
        // Mock logic for frontend demonstration
        let score = (mockAmount / 1000) * 15 + (mockCount * 8);
        if (score > 99) score = 99;
        if (score < 1) score = 1;
        setMockScore(score.toFixed(1));
    }, [mockAmount, mockCount]);

    return (
        <section id="features" className="py-24 bg-gray-50 dark:bg-dark-100 transition-colors duration-300 relative overflow-hidden">

            {/* Feature 2: Interactive Trust/Security Badges Marquee */}
            <div className="w-full bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-6 mb-20 overflow-hidden relative flex items-center">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>

                {/* CSS Marquee Animation could be added here, but flex wrap is clean for static industry feel */}
                <div className="flex mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-x-12 sm:space-x-24 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2 text-xl font-bold font-mono"><ShieldCheck className="text-green-500 w-8 h-8" /> SOC2 TYPE II</div>
                    <div className="flex items-center gap-2 text-xl font-bold font-mono"><Lock className="text-blue-500 w-8 h-8" /> PCI-DSS L1</div>
                    <div className="flex items-center gap-2 text-xl font-bold font-mono"><Database className="text-purple-500 w-8 h-8" /> ISO 27001</div>
                    <div className="flex items-center gap-2 text-xl font-bold font-mono hidden md:flex"><Shield className="text-yellow-500 w-8 h-8" /> GDPR COMPLIANT</div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Core Capabilities</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        A Better Way to Stop Fraud
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
                        FALCON is built with modern tech stacks to handle massive transaction volumes securely and intelligently.
                    </p>
                </div>

                <div className="mt-20 mb-20">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="pt-6">
                                <div className="flow-root bg-white dark:bg-dark rounded-xl px-6 pb-8 h-full shadow-md border border-gray-100 dark:border-dark-200 hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="-mt-6">
                                        <div>
                                            <span className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary to-rose-500 rounded-md shadow-lg">
                                                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-xl font-bold text-gray-900 dark:text-white tracking-tight">{feature.name}</h3>
                                        <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature 4: Mini "Try it Out" Risk Calculator */}
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mt-12 mb-12 flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Interactive Risk Matrix</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
                            Adjust the telemetry sliders to see how the FALCON logic core evaluates potential risks in real-time.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Transaction Amount</label>
                                    <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">${mockAmount}</span>
                                </div>
                                <input
                                    type="range"
                                    min="10" max="15000" step="50"
                                    value={mockAmount}
                                    onChange={(e) => setMockAmount(e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Velocity (24Hrs)</label>
                                    <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">{mockCount} txns</span>
                                </div>
                                <input
                                    type="range"
                                    min="1" max="15" step="1"
                                    value={mockCount}
                                    onChange={(e) => setMockCount(e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 pointer-events-none"></div>
                        <div className={`p-5 rounded-full mb-6 relative z-10 transition-colors duration-500 ${mockScore > 50 ? 'bg-red-100 text-red-500 dark:bg-red-900/50 dark:text-red-400' : 'bg-green-100 text-green-500 dark:bg-green-900/50 dark:text-green-400'}`}>
                            {mockScore > 50 ? <ShieldAlert className="w-12 h-12" /> : <ShieldCheck className="w-12 h-12" />}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 z-10">Calculated Risk Score</h4>
                        <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black dark:from-white dark:to-gray-400 mb-2 z-10">
                            {mockScore}<span className="text-3xl text-gray-400">%</span>
                        </div>
                        <p className={`text-sm font-semibold tracking-wider uppercase z-10 transition-colors duration-500 ${mockScore > 50 ? 'text-red-500' : 'text-green-500'}`}>
                            {mockScore > 50 ? 'Anomaly Detected' : 'Threshold Secure'}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturesSection;
