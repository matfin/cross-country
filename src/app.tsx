import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles';
import createStore from './store';
import Planner from 'components/planner/planner';
import Routes from 'components/routes/connectedRoutes';

const store: Store = createStore();

const App = (): JSX.Element => (
  <Provider store={store}>
    <ThemeProvider theme={{}}>
      <BrowserRouter>
        <Switch>
          <Route component={Routes} exact path="/" />
          <Route component={Planner} path="/routes/:slug" />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  </Provider>
);

export default hot(module)(App);
