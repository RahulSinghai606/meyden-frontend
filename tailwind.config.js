/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                meydan: {
                    blue: '#00518C',
                    green: '#62A830',
                    lime: '#B7D437',
                    cyan: '#35C0CA',
                    gray: '#F5F7FA',
                },
            },
            fontFamily: {
                sans: ['var(--font-jakarta)', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'meydan-gradient': 'linear-gradient(135deg, #00518C 0%, #62A830 100%)',
                'meydan-gradient-light': 'linear-gradient(135deg, #35C0CA 0%, #B7D437 100%)',
            },
        },
    },
    plugins: [],
}
