import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1800
    }
  },
  palette: {
    primary: {
      main: '#1eb6a9',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#2d4150'
    }
  }
});

export default theme;
