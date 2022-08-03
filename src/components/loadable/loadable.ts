import { FC } from 'react';
import ReactLoadable from 'react-loadable';

const loadable = (loader: () => Promise<unknown>) =>
  ReactLoadable({
    loader: loader as () => Promise<FC>,
    loading: () => null
  });

export default loadable;
