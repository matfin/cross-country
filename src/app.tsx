import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles';
import Planner from 'components/planner/planner';
import Routes from 'components/routes/routes';

const App = (): JSX.Element => (
  <ThemeProvider theme={{}}>
    <BrowserRouter>
      <Switch>
        <Route component={Routes} exact path="/" />
        <Route component={Planner} path="/routes/:slug" />
      </Switch>
    </BrowserRouter>
    <GlobalStyle />
  </ThemeProvider>
);

export default hot(module)(App);
