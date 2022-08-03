import { render } from 'react-dom';

import App from './App';

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  document.body.classList.add('debug-screens');
}

render(<App />, document.getElementById('root'));
