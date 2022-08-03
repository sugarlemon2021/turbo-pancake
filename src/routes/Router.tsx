import { Redirect, Route, Switch } from 'react-router-dom';

import loadable from 'components/loadable/loadable';

const LoadableLandingPage = loadable(() => import('pages/landing/LandingPage'));
const LoadableEquityCurvePage = loadable(() => import('pages/equity-curve/EquityCurvePage'));

const Router = () => (
  <Switch>
    <Route exact path="/" component={LoadableLandingPage} />
    <Route exact path="/equity-curve/:id" component={LoadableEquityCurvePage} />
    <Redirect to="/" />
  </Switch>
);

export default Router;
