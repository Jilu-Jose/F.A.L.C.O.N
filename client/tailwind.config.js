/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#ea580c', // Darker Orange
                },
                dark: {
                    DEFAULT: '#0f0f0f',
                    100: '#1f1f1f',
                    200: '#2d2d2d',
                },
                light: {
                    DEFAULT: '#ffffff',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                }
            }
        },
    },
    plugins: [],
}
