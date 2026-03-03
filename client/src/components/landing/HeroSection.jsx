import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity, ArrowRight, Globe, Shield, Lock, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    // Feature 1: Live "Secured Transactions" Counter
    const [securedCount, setSecuredCount] = useState(14589320);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecuredCount(prev => prev + Math.floor(Math.random() * 5));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Feature 3: Dynamic Threat Map Nodes (Mocked coordinates for visual flair)
    const activeNodes = [
        { top: '20%', left: '30%', delay: '0s' },
        { top: '60%', left: '70%', delay: '1s' },
        { top: '40%', left: '80%', delay: '2s' },
        { top: '70%', left: '20%', delay: '1.5s' },
        { top: '30%', left: '50%', delay: '0.5s' },
    ];

    return (
        <section className="relative pt-24 pb-32 overflow-hidden bg-white dark:bg-dark transition-colors duration-300">
            {/* Feature 3: Dynamic Threat Map Visualization Background */}
            <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-40 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] border border-gray-200 dark:border-gray-800 rounded-full opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] border border-gray-300 dark:border-gray-700 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] border border-gray-400 dark:border-gray-600 rounded-full opacity-40"></div>

                {/* Expanding ping nodes */}
                {activeNodes.map((node, i) => (
                    <div key={i} className="absolute w-4 h-4" style={{ top: node.top, left: node.left }}>
                        <div className="w-full h-full bg-red-500 rounded-full opacity-75"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-full animate-ping" style={{ animationDelay: node.delay, animationDuration: '3s' }}></div>
                    </div>
                ))}
            </div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-primary mb-8 border border-red-100 dark:border-red-900/50 transition-colors shadow-sm cursor-default hover:bg-red-100 dark:hover:bg-red-900/40">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span className="text-xs font-bold tracking-widest uppercase">Intelligent Fraud Prevention</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                    Secure Transactions <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                        Powered by AI
                    </span>
                </h1>

                <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400 mx-auto mb-10 leading-relaxed">
                    FALCON analyzes telemetry data in real-time, instantly scoring risk and isolating fraudulent activity before it impacts your bottom line.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="/login" className="w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 text-base font-bold rounded-lg text-white bg-primary hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5">
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href="#features" className="w-full sm:w-auto px-8 py-3.5 flex items-center justify-center text-base font-bold rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700 transition-all">
                        Explore Platform
                    </a>
                </div>

                {/* Feature 1: Live Transactions Secured Counter */}
                <div className="mt-12 flex flex-col items-center justify-center space-y-2 animate-in fade-in duration-1000 delay-300">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Lock className="w-4 h-4 text-green-500" /> Live Transactions Secured
                    </p>
                    <div className="text-3xl md:text-5xl font-mono font-bold text-gray-800 dark:text-gray-200 tracking-wider">
                        {securedCount.toLocaleString()}
                    </div>
                </div>

                {/* UI Preview */}
                <div className="mt-16 relative mx-auto w-full max-w-4xl">
                    <div className="rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 group">
                        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-12 w-full flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="ml-4 flex-1 flex justify-center">
                                <div className="w-1/2 max-w-xs h-6 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex items-center px-3">
                                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[300px] w-full p-8 flex flex-col items-center justify-center relative bg-gray-50 dark:bg-gray-800/50">
                            <ShieldAlert className="w-24 h-24 text-gray-200 dark:text-gray-700 mb-6 group-hover:scale-110 transition-transform duration-500" />
                            <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3 transform group-hover:-translate-y-2 transition-transform duration-500">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <span className="font-mono text-sm text-gray-600 dark:text-gray-400 tracking-tight">Active Engine | Latency: 42ms | Risk Matrix: Optimal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
