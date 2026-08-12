/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          bg: '#0D1117',         // GitHub Dark Canvas
          surface: '#161B22',    // GitHub Dark Surface / Panel
          subtle: '#21262D',     // Sub-surface
          border: '#30363D',     // GitHub Border Neutral
          blue: '#58A6FF',       // GitHub Link / Accent Blue
          blueLight: '#0969DA',  // GitHub Light Link Blue
          ink: '#F0F6FC',        // High-contrast text
          slate: '#8B949E'       // Muted secondary text
        },
        midnight: {
          bg: '#0D1117',
          surface: '#161B22',
          card: '#161B22',
          border: '#30363D',
        },
        neon: {
          cyan: '#58A6FF',       // Replaced with GitHub Link Blue for technical clarity
          emerald: '#3FB950',    // GitHub Green
          coral: '#F85149',      // GitHub Red
          purple: '#A371F7',     // GitHub Purple
          amber: '#D29922'       // GitHub Yellow
        }
      },
      fontFamily: {
        sans: ['Inter', 'Mona Sans', 'sans-serif'],
        mono: ['Fira Code', 'Geist Mono', 'Consolas', 'monospace']
      },
      boxShadow: {
        'gist': '0 1px 0 0 rgba(27, 31, 36, 0.04)',
        'gist-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'bento': '0 4px 12px rgba(0, 0, 0, 0.3)'
      },
      borderRadius: {
        'gist': '6px',
        'bento': '8px'
      }
    },
  },
  plugins: [],
}
