import React from 'react';
import { Server, Cpu, Layers, Database } from 'lucide-react';

const ArchitectureSection = () => {
    return (
        <section id="architecture" className="py-24 bg-white dark:bg-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Scalable Microservice Architecture
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                        The FALCON infrastructure separates the UI, backend logic, and AI modeling into distinct robust services.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative">
                    {/* Connecting Lines (hidden on mobile) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-dark-100 -translate-y-1/2 z-0"></div>

                    {/* React Component */}
                    <div className="bg-white dark:bg-dark-100 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-100 z-10 w-full md:w-64 text-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Layers size={32} />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white mb-2">React Client</h3>
                    </div>

                    <div className="hidden md:flex flex-col items-center z-10">
                        <div className="h-2 w-2 rounded-full bg-primary animate-ping"></div>
                    </div>

                    {/* Node Component */}
                    <div className="bg-white dark:bg-dark-100 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-100 z-10 w-full md:w-64 text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Server size={32} />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white mb-2">Node.js API</h3>
                    </div>

                    <div className="hidden md:flex flex-col items-center z-10 space-y-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    </div>

                    {/* ML Component */}
                    <div className="bg-white dark:bg-dark-100 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-100 z-10 w-full md:w-64 text-center">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Cpu size={32} />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white mb-2">FastAPI ML</h3>
                    </div>

                    <div className="hidden md:flex flex-col items-center z-10 space-y-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.4s' }}></div>
                    </div>

                    {/* DB Component */}
                    <div className="bg-white dark:bg-dark-100 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-100 z-10 w-full md:w-64 text-center">
                        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Database size={32} />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white mb-2">MongoDB</h3>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ArchitectureSection;
