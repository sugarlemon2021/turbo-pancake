import { FC } from 'react';
import { Container } from '@material-ui/core';

import WidgetLinks from './WidgetLinks';

const LandingPage: FC = () => (
  <Container maxWidth="lg" className="py-4 font-roboto">
    <h1 className="mb-4">Swapoo trading bot equity curve for everyone!</h1>
    <p className="mb-4">
      To embed the widgets, use the <span className="font-bold">{`<iframe>`}</span> html tag
    </p>
    <p className="mb-4">
      Optionally add <span className="font-bold">max-width: 1200px;</span>
    </p>
    <WidgetLinks />
  </Container>
);

export default LandingPage;
