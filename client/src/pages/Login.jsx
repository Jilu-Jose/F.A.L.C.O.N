import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock authentication by saving a fake token
        localStorage.setItem('token', 'mock_valid_token_12345');
        localStorage.setItem('userEmail', email);
        navigate('/dashboard');
    };

    const handleOAuth = (provider) => {
        // Mock OAuth login
        localStorage.setItem('token', `mock_${provider}_token_12345`);
        localStorage.setItem('userEmail', `user@${provider}.com`);
        navigate('/dashboard');
    };

    return (
        <div className="flex items-center justify-center min-h-[85vh] bg-gray-50 dark:bg-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Sign in to access the FALCON dashboard
                    </p>
                </div>

                {/* OAuth Buttons */}
                <div className="mt-8 space-y-3">
                    <button
                        onClick={() => handleOAuth('google')}
                        className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <button
                        onClick={() => handleOAuth('apple')}
                        className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-transparent rounded-lg shadow-sm bg-black text-white text-sm font-medium hover:bg-gray-900 dark:bg-black dark:border-gray-700 transition-colors"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.43-1.09-.45-2.18-.47-3.23.06-1.07.56-2.02.5-2.9-.45-3.34-3.47-4.66-9.11-1.37-12.83 1.55-1.74 3.52-2.15 4.88-2.19 1.48-.04 2.83.92 3.57.94 1.11.02 2.65-1.13 4.31-.96 1.83.18 3.38.99 4.39 2.47-3.8 2.22-3.14 7.37.58 8.87a9.7 9.7 0 0 1-2.15 3.66zm-5.46-15.3c-1.48.04-2.83-.92-3.57-.94-1.11-.02-2.65 1.13-4.31.96-1.83-.18-3.38-.99-4.39-2.47 3.8-2.22 3.14-7.37-.58-8.87a9.7 9.7 0 0 1 2.15-3.66z" style={{ display: 'none' }} />
                            <path d="M16.98 19.34c-1.01 1.47-2.06 2.93-3.71 3-1.58.07-2.13-1.01-4-1.01s-2.48 1.05-4.04 1.01c-1.61-.05-2.79-1.64-3.81-3.11C-.53 14.16-.92 9.07 1.53 5.97c1.21-1.53 2.92-2.51 4.77-2.54 1.56-.05 3.06 1.04 4.04 1.04.99 0 2.76-1.31 4.63-1.11 1.99.11 3.58 1.01 4.6 2.53-3.85 2.24-3.2 7.7 1.05 9.42-.87 1.94-1.95 4.03-3.64 6.53zM15.42 2.95c-.84 1.02-2.31 1.71-3.56 1.63-.16-1.3.51-2.61 1.34-3.53.86-1.01 2.39-1.76 3.49-1.62.16 1.25-.42 2.51-1.27 3.52z" />
                        </svg>
                        Continue with Apple
                    </button>

                    <button
                        onClick={() => handleOAuth('microsoft')}
                        className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 21 21">
                            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                        </svg>
                        Continue with Microsoft
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with email</span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="email"
                                required
                                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-primary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98]"
                        >
                            Sign in to FALCON
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
