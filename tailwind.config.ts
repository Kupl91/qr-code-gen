import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			sm: '2rem',
  			lg: '4rem',
  			xl: '5rem',
  		},
  		screens: {
  			sm: '640px',    // Mobile
  			md: '768px',    // Tablet
  			lg: '1024px',   // Small Desktop
  			xl: '1280px',   // Desktop
  			'2xl': '1536px' // Large Desktop
  		},
  	},
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'rgb(255, 255, 255)',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'rgba(72, 85, 203, 1)',
  				foreground: 'rgb(255, 255, 255)'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: {
  				text: 'rgba(36, 36, 43, 1)',
  				bg: 'rgba(249, 249, 251, 1)',
  				focus: 'rgba(72, 85, 203, 1)'
  			},
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			label: {
  				text: 'rgba(169, 169, 178, 1)'
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			fact: ['var(--font-fact)'],
  		},
  		spacing: {
  			'fluid-1': 'clamp(1rem, 2vw, 2rem)',
  			'fluid-2': 'clamp(1.5rem, 3vw, 3rem)',
  			'fluid-3': 'clamp(2rem, 4vw, 4rem)',
  		},
  		fontSize: {
  			'fluid-sm': 'clamp(0.875rem, 1vw, 1rem)',
  			'fluid-base': 'clamp(1rem, 1.5vw, 1.125rem)',
  			'fluid-lg': 'clamp(1.125rem, 2vw, 1.25rem)',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
