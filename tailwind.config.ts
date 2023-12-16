import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {

        'lt': '1366px',
        // => @media (min-width: 375px) { ... }
        's8': '360px',
        // => @media (min-width: 375px) { ... }
        'fr': '428px',
        // => @media (min-width: 375px) { ... }
        '14': '430px',
        // => @media (min-width: 375px) { ... }
        '12': '390px',
        // => @media (min-width: 375px) { ... }

        'xs': '375px',
        // => @media (min-width: 375px) { ... }

        'sm': '414px',
        // => @media (min-width: 414px) { ... }
  
        'md': '960px',
        // => @media (min-width: 960px) { ... }
  
        'lg': '1440px',
        // => @media (min-width: 1440px) { ... }
      },
    },
  },
 
}
export default config
