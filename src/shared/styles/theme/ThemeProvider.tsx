import { CssBaseline } from '@mui/material';
import { ThemeProvider as OriginalThemeProvider } from '@mui/material/styles';
import { DARK_THEME, LIGHT_THEME } from './theme';

/**
 * Material UI Provider with Light and Dark themes depending on global "state.darkMode"
 */
const ThemeProvider: React.FunctionComponent = ({ children }) => {
  const mode = false;
  // const theme = useMemo(() => (state.darkMode ? createMuiTheme(DARK_THEME) : createMuiTheme(LIGHT_THEME)));
  const theme = mode ? DARK_THEME : LIGHT_THEME;

  return (
    <OriginalThemeProvider theme={theme}>
      <CssBaseline /* Material UI Styles */ />
      {children}
    </OriginalThemeProvider>
  );
};

export default ThemeProvider;
