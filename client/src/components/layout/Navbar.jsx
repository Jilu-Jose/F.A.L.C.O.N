import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Shield } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-dark/80 border-b border-gray-200 dark:border-dark-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <Shield className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">FALCON</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex space-x-8">
                            <Link to="/#features" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium">Features</Link>
                            <Link to="/#architecture" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium">Architecture</Link>
                        </div>
                        <ThemeToggle />
                        <Link to="/login" className="hidden md:inline-flex px-5 py-2 rounded-md bg-primary text-white font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
