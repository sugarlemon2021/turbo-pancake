import { useEffect, useState } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';

function useMuiBreakpoints() {
  const theme = useTheme();
  const smallAndUp = useMediaQuery(theme.breakpoints.up('sm'));
  const mediumAndUp = useMediaQuery(theme.breakpoints.up('md'));

  const [state, setState] = useState({
    smallAndUp,
    mediumAndUp
  });

  useEffect(() => {
    setState({
      smallAndUp,
      mediumAndUp
    });
  }, [smallAndUp, mediumAndUp]);

  return state;
}

export default useMuiBreakpoints;
