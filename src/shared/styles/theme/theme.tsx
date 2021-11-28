/**
 * Material UI theme
 * See for details: https://material-ui.com/customization/default-theme/?expand-path=$.palette
 * Martial Color tool: https://material.io/resources/color
 */
import { createTheme } from '@mui/material/styles';

/**
 * Material UI theme "front" colors, "back" colors are different for Light and Dark modes
 * Material Color Tool: https://material.io/resources/color/#!/?view.left=0&view.right=0&secondary.color=EF9A9A&primary.color=64B5F6
 */
const FRONT_COLORS = {
  primary: {
    main: '#64B5F6',
  },
  secondary: {
    main: '#EF9A9A',
  },
};

/**
 * Material UI theme config for "Light Mode"
 */
export const LIGHT_THEME = createTheme({
  palette: {
    // background: {
    //   paper: '#f5f5f5', // Gray 100 - Background of "Paper" based component
    //   default: '#FFFFFF',
    // },
    ...FRONT_COLORS,
  },
});

/**
 * Material UI theme config for "Dark Mode"
 */
export const DARK_THEME = createTheme({
  palette: {
    // background: {
    //   paper: '#424242', // Gray 800 - Background of "Paper" based component
    //   default: '#303030',
    // },
    ...FRONT_COLORS,
  },
});
