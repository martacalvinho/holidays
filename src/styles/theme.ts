export const themes = {
  winter: {
    colors: {
      primary: '#A5F2F3',
      secondary: '#D4F1F9',
      accent: '#C0C0C0',
      background: 'from-[#A5F2F3]/10 via-white to-[#D4F1F9]/10',
      text: 'text-[#2A4365]',
      border: 'border-[#D4F1F9]',
    },
    fonts: {
      heading: 'font-serif',
      body: 'font-sans',
    },
    effects: {
      card: 'backdrop-blur-lg bg-white/30 border border-white/50 hover:shadow-[#A5F2F3]/20 hover:border-[#A5F2F3]/50 transition-all duration-300',
      button: 'bg-gradient-to-r from-[#A5F2F3] to-[#D4F1F9] hover:from-[#D4F1F9] hover:to-[#A5F2F3] text-[#2A4365] shadow-lg hover:shadow-[#A5F2F3]/25',
      hover: 'hover:scale-102 hover:shadow-lg transition-all duration-300',
    },
  },
  christmas: {
    colors: {
      primary: '#146B3A',
      secondary: '#EA4630',
      accent: '#FFD700',
      background: 'from-[#146B3A]/5 via-white to-[#EA4630]/5',
      text: 'text-[#146B3A]',
      border: 'border-[#EA4630]/20',
    },
    fonts: {
      heading: 'font-display',
      body: 'font-sans',
    },
    effects: {
      card: 'bg-white shadow-lg border-2 border-[#146B3A]/20 hover:border-[#EA4630]/30 hover:shadow-[#EA4630]/10 transition-all duration-300',
      button: 'bg-gradient-to-r from-[#EA4630] to-[#146B3A] hover:from-[#146B3A] hover:to-[#EA4630] text-white shadow-lg hover:shadow-[#EA4630]/25',
      hover: 'hover:scale-102 hover:shadow-lg transition-all duration-300',
    },
  },
  newyear: {
    colors: {
      primary: '#F7E7CE',
      secondary: '#000000',
      accent: '#E8E8E8',
      background: 'from-black via-[#1A1A1A] to-black',
      text: 'text-[#F7E7CE]',
      border: 'border-[#F7E7CE]/20',
    },
    fonts: {
      heading: 'font-serif',
      body: 'font-sans',
    },
    effects: {
      card: 'bg-black/50 backdrop-blur-md border border-[#F7E7CE]/10 hover:border-[#F7E7CE]/30 hover:shadow-[#F7E7CE]/5 transition-all duration-300',
      button: 'bg-gradient-to-r from-[#F7E7CE] to-[#E8E8E8] hover:from-[#E8E8E8] hover:to-[#F7E7CE] text-black shadow-lg hover:shadow-[#F7E7CE]/25',
      hover: 'hover:scale-102 hover:shadow-lg transition-all duration-300',
    },
  },
} as const;