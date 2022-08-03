import { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider } from '@material-ui/core';

import theme from 'components/theme/theme';

const Providers: FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>{children}</MuiPickersUtilsProvider>
  </MuiThemeProvider>
);

export default Providers;
