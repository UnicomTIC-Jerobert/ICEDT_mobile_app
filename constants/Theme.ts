import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
    // Primary Colors
    primaryGreen: '#4CAF50', // From the lesson page header
    primaryYellow: '#FFC107', // From the home page background accents
    primaryOrange: '#FF9800', // From the lesson item accents

    // Backgrounds
    lightGreen: '#E8F5E9',   // Background of the lesson page
    lightYellow: '#FFF9C4', // Background of the home page
    white: '#FFFFFF',

    // Text
    textDark: '#212121',     // For main titles
    textMedium: '#757575',   // For subtitles and descriptions
    textLight: '#FFFFFF',

    // Accents & Buttons
    buttonRed: '#F44336',    // From lesson item accents
    buttonBlue: '#2196F3',
    buttonPink: '#E91E63',
    buttonOrange: '#FF5722',
    buttonGreen: '#4CAF50',
    buttonLightPink: '#FFCDD2', // Main button background
};

export const SIZES = {
    // Global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // Font sizes
    h1: 30,
    h2: 24,
    h3: 18,
    body1: 16,
    body2: 14,

    // App dimensions
    width,
    height
};

export const FONTS = {
    h1: { fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontSize: SIZES.h3, lineHeight: 22 },
    body1: { fontSize: SIZES.body1, lineHeight: 22 },
    body2: { fontSize: SIZES.body2, lineHeight: 20 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;