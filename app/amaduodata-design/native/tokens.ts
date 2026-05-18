// Ama Duo Data — Design tokens for React Native.
// Mirror of colors_and_type.css. Update both files in sync.

export const Color = {
  // Pulse Violet — primary hero
  violet: {
    50:  '#F1ECFF',  100: '#E1D6FF',  200: '#C5ADFF',  300: '#A684FF',
    400: '#8B5CFF',  500: '#6938EF',  600: '#5424D6',  700: '#4218A8',
    800: '#2F107B',  900: '#1A0A4F',
  },
  // Sky Blue — secondary brand (streaks / progress / learning)
  blue: {
    50:  '#E6F0FF',  100: '#C6DEFF',  200: '#94BFFF',  300: '#5C9CFF',
    400: '#2D7FF9',  500: '#1F66E0',  600: '#1450B8',  700: '#0E3A88',
    800: '#082858',  900: '#051736',
  },
  // Magic Pink — celebrations, hearts, accent
  pink: {
    50:  '#FFE9F2',  100: '#FFCFE0',  200: '#FFA1C1',  300: '#FF6FA0',
    400: '#FF3D8E',  500: '#E51F73',  600: '#B7115A',  700: '#850A41',
    800: '#5C062D',  900: '#38031B',
  },
  // Sun — XP gem / streak flame / gold star
  sun: {
    50:  '#FFF8DC',  100: '#FFEDA3',  200: '#FFE177',  300: '#FFD957',
    400: '#FFCD3C',  500: '#F2B41A',  600: '#C58E00',  700: '#946A00',
    800: '#6A4C00',  900: '#3F2D00',
  },
  // Green — semantic success only (correct answer feedback)
  green: {
    50:  '#E6FBEF',  400: '#29D86F',  500: '#14B856',  700: '#086E36',  900: '#03301A',
  },
  // Ink — warm violet-tinted near-black + neutrals
  ink: {
    50:  '#F7F4FB',  100: '#ECE6F2',  200: '#D9D1E2',  300: '#B8AECB',
    400: '#8C81A4',  500: '#645B7C',  600: '#443D5A',  700: '#2C2740',
    800: '#1B172C',  900: '#131326',
  },
  paper:      '#15151F',   // dark card surface (alias of surface-1)
  paperWarm:  '#1E1E2A',
  paperDeep:  '#0B0B14',

  surface: {
    s0: '#0B0B14',   // page background
    s1: '#15151F',   // card
    s2: '#1E1E2A',   // hover / nested card
    s3: '#2A2A38',   // modal / popover
  },

  // Semantic
  success: '#14B856',
  warning: '#F2B41A',
  danger:  '#E5364B',
  info:    '#2A8FE6',

  // Tokens (dark theme)
  fg:         '#F5F5F8',
  fgMuted:    'rgba(245, 245, 248, 0.62)',
  fgSubtle:   'rgba(245, 245, 248, 0.40)',
  border:     'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.16)',
};

export const Font = {
  display: 'Outfit_900Black',         // load via @expo-google-fonts/outfit
  displayBold: 'Outfit_700Bold',
  displaySemi: 'Outfit_600SemiBold',
  body:    'DMSans_400Regular',
  bodyMed: 'DMSans_500Medium',
  bodyBold:'DMSans_700Bold',
  mono:    'JetBrainsMono_400Regular',
  monoBold:'JetBrainsMono_700Bold',
};

export const Size = {
  // type
  text2xs: 11, textXs: 12, textSm: 14, textMd: 16, textLg: 18,
  textXl: 22, text2xl: 28, text3xl: 36, text4xl: 48, text5xl: 64,
  text6xl: 88, text7xl: 120,
};

export const Space = {
  s0: 0, s1: 4, s2: 8, s3: 12, s4: 16, s5: 20, s6: 24,
  s7: 32, s8: 40, s9: 48, s10: 64, s11: 80, s12: 96,
};

export const Radius = {
  xs: 6, sm: 10, md: 14, lg: 20, xl: 28, xxl: 36, pill: 999,
};

// React Native shadow API differs iOS vs Android.
// Use these in StyleSheets via `...Shadow.sm`.
export const Shadow = {
  sm: {
    shadowColor: '#131326',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#131326',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 6,
  },
  pop: {
    shadowColor: Color.violet[500],
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 10,
  },
};

// Chunky 4px base — implemented per-component as a colored View beneath the button.
// (RN's box-shadow can't do flat offset shadows like CSS, so we layer a View.)
// See `components/DuoButton.tsx` for the pattern.

export const Motion = {
  durFast: 90,
  durBase: 220,
  durSlow: 360,
};
