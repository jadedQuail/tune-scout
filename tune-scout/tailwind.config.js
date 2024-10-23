/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "electric-blue": {
                    DEFAULT: "#1E90FF",
                },
                "midnight-navy": {
                    DEFAULT: "#191970",
                },
                "lime-green": {
                    DEFAULT: "#32CD32",
                },
                "neon-coral": {
                    DEFAULT: "#FF6F61",
                },
                // Neutral Colors
                "soft-charcoal": {
                    DEFAULT: "#2E2E2E",
                },
                "light-gray": {
                    DEFAULT: "#D3D3D3",
                },
            },
        },
    },
    plugins: [],
};
