import React from 'react';
import { ShieldAlert, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative pt-24 pb-32 overflow-hidden bg-white dark:bg-dark transition-colors duration-300">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 dark:opacity-20 flex justify-center items-center">
                <div className="w-[800px] h-[800px] bg-gradient-to-r from-red-500/20 to-rose-600/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-primary mb-8 border border-red-100 dark:border-red-900/50 transition-colors">
                    <Activity className="w-4 h-4" />
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

                {/* UI Preview */}
                <div className="mt-24 relative mx-auto w-full max-w-4xl">
                    <div className="rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
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
                            <ShieldAlert className="w-24 h-24 text-gray-200 dark:text-gray-700 mb-6" />
                            <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <span className="font-mono text-sm text-gray-600 dark:text-gray-400 tracking-tight">Active Engine | Latency: 42ms</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
