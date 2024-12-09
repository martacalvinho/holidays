export const themes = {
  winter: {
    colors: {
      background: 'bg-gradient-to-b from-[#E3F4F4] via-[#D4F1F9] to-[#A5F2F3]',
      text: 'text-blue-900',
      overlay: 'bg-gradient-to-b from-white/60 via-winter-light/40 to-winter/30',
      accent: 'text-blue-600',
      muted: 'text-blue-800/80',
    },
    effects: {
      card: `
        backdrop-blur-xl 
        bg-gradient-to-br from-white/80 to-winter-light/40 
        border border-white/80 
        shadow-[0_8px_32px_rgba(165,242,243,0.3)] 
        rounded-xl 
        hover:shadow-[0_12px_48px_rgba(165,242,243,0.5)] 
        hover:scale-[1.02]
        transition-all duration-300
      `,
      button: `
        bg-gradient-to-r from-winter-light via-winter to-winter-light 
        hover:from-winter hover:via-winter-light hover:to-winter
        text-blue-900 
        rounded-full 
        shadow-lg 
        hover:shadow-winter/50 
        transform hover:-translate-y-0.5
        transition-all duration-300
      `,
      header: `
        backdrop-blur-xl 
        bg-gradient-to-b from-white/90 to-winter-light/80
        border-b border-white/50
        shadow-lg shadow-winter-light/20
      `,
      heroOverlay: `
        absolute inset-0 
        bg-gradient-to-b from-winter-light/30 via-white/40 to-winter/50
        backdrop-blur-sm
      `,
      snowflake: `
        animate-snowfall
        opacity-80
        blur-[0.5px]
        filter
        brightness-110
      `,
    },
    fonts: {
      heading: 'font-serif tracking-wide',
      body: 'font-sans',
    },
  },
  christmas: {
    colors: {
      background: 'bg-gradient-to-b from-christmas-red/10 to-christmas-green/20',
      text: 'text-christmas-green',
      overlay: 'bg-gradient-to-b from-christmas-red/30 to-christmas-green/40',
    },
    effects: {
      card: 'bg-white/95 border-2 border-christmas-green/20 rounded-lg shadow-lg',
      button: 'bg-gradient-to-r from-christmas-red to-christmas-green hover:from-christmas-green hover:to-christmas-red text-white rounded-full shadow-md',
    },
    fonts: {
      heading: 'font-serif',
      body: 'font-sans',
    },
  },
  newyear: {
    colors: {
      background: 'bg-black',
      text: 'text-newyear-gold',
      overlay: 'bg-gradient-to-b from-black/60 to-black/80',
    },
    effects: {
      card: 'bg-black/50 backdrop-blur-md border border-newyear-gold/10 rounded-lg shadow-lg',
      button: 'bg-gradient-to-r from-newyear-gold to-newyear-silver hover:from-newyear-silver hover:to-newyear-gold text-black rounded-full shadow-md',
    },
    fonts: {
      heading: 'font-serif',
      body: 'font-sans',
    },
  },
} as const;