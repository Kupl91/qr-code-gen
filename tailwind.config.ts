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
  				DEFAULT: 'rgb(72, 85, 203)',
  				hover: 'rgb(58, 69, 163)',
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
  				DEFAULT: '#F33A3A',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: {
  				text: 'rgb(36, 36, 43)',
  				bg: 'rgb(249, 249, 251)',
  				focus: 'rgb(72, 85, 203)',
  				border: '#E3E4E8'
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
  			text: {
  				primary: 'rgb(36, 36, 43)',
  				secondary: 'rgb(169, 169, 178)',
  				placeholder: '#898989'
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			form: '8px',
  			input: '4px',
  			card: '32px'
  		},
  		fontFamily: {
  			fact: ['var(--font-fact)'],
  		},
  		spacing: {
  			'fluid-1': 'clamp(1rem, 2vw, 2rem)',
  			'fluid-2': 'clamp(1.5rem, 3vw, 3rem)',
  			'fluid-3': 'clamp(2rem, 4vw, 4rem)',
  			'form-padding': '24px',
  			'form-gap': '16px',
  			'form-header-height': '72px',
  			'form-input-height': '36px',
  			'form-button-width': '100px',
  			'form-button-height': '36px'
  		},
  		fontSize: {
  			'fluid-sm': 'clamp(0.875rem, 1vw, 1rem)',
  			'fluid-base': 'clamp(1rem, 1.5vw, 1.125rem)',
  			'fluid-lg': 'clamp(1.125rem, 2vw, 1.25rem)',
  			'preview-title': '20px',
  			'preview-text': '14px',
  			'form-title': '20px',
  			'back-btn': '12px'
  		},
  		size: {
  			'qr-sm': 'clamp(256px, 70vw, 280px)',
  			'qr-md': 'clamp(280px, 60vw, 320px)', 
  			'qr-lg': 'clamp(320px, 50vw, 360px)',
  			preview: {
  				width: '360px',
  				'container-width': '476px',
  				'card-min-height': '618px',
  				'avatar-size': '64px',
  				padding: '24px'
  			},
  			qr: {
  				sm: 'clamp(256px, 70vw, 280px)',
  				md: 'clamp(280px, 60vw, 320px)',
  				lg: 'clamp(320px, 50vw, 360px)'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
