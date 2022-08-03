import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Providers from 'contexts/Providers';
import Router from 'routes/Router';

import 'styles/index.css';
import 'tailwindcss/tailwind.css';

const App = () => (
  <Providers>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Providers>
);

export default hot(App);
