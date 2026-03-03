import React from 'react';
import { Shield, Github, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-dark-100 border-t border-gray-200 dark:border-dark-200 transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-center md:justify-start space-x-6 md:order-2">
                        <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-white transition-colors">
                            <span className="sr-only">GitHub</span>
                            <Github className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-white transition-colors">
                            <span className="sr-only">Contact</span>
                            <Mail className="h-6 w-6" />
                        </a>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1 flex flex-col md:flex-row md:items-center text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4 md:mb-0">
                            <Shield className="h-5 w-5 text-primary" />
                            <span className="font-bold text-gray-900 dark:text-white">FALCON</span>
                        </div>
                        <span className="md:ml-4 text-base text-gray-400 dark:text-gray-500">
                            &copy; {new Date().getFullYear()} FALCON Inc. All rights reserved.
                        </span>
                        <span className="md:ml-4 text-xs font-mono bg-gray-200 dark:bg-dark-200 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                            v1.0.0
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
