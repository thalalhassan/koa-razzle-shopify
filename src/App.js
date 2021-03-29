import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import routes from './route';
import Topsection from 'components/topSection';
import Container from 'components/container';
import SyncLoader from 'components/SyncLoader';
import Topmenu from 'components/topmenu';

import Login from 'pages/login';
import Home from './Home';
import './App.scss';
import './App.css';

function getComponent(Component, extraProps) {
  return (props) => <Component {...props} {...extraProps} />;
}

const App = (extraProps) => (
  <>
    <div className="App" id="scrollableDiv">
      <Topsection>
        <Topmenu />
      </Topsection>
      <SyncLoader />
      <Container>
        <Switch>
          <Route
            exact
            path="/login"
            component={(props) => <Login {...props} {...extraProps} />}
          />
           <Route
            exact
            path="/home"
            component={(props) => <Home {...props} {...extraProps} />}
          />
          {routes.map(({ path, exact, component }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              component={getComponent(component, extraProps)}
            />
          ))}
        </Switch>
      </Container>
    </div>
  </>
);

export default App;
