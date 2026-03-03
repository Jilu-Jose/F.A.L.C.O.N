import React from 'react';
import { Activity, ShieldCheck, Lock, Monitor, Database, Zap } from 'lucide-react';

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
    return (
        <section id="features" className="py-24 bg-gray-50 dark:bg-dark-100 transition-colors duration-300">
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

                <div className="mt-20">
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
            </div>
        </section>
    );
};

export default FeaturesSection;
