import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import routes from "./route";

function getComponent(Component, extraProps) {
  return (props) => <Component {...props} {...extraProps} />;
}

const App = (extraProps) => (
  <Switch>
    <Route exact path="/" component={(props) => <Home  {...props} {...extraProps} />} />4
    {routes.map(({ path, exact, component }) => (
      <Route
        key={path}
        path={path}
        exact={exact}
        component={getComponent(component, extraProps)}
      />
    ))}
  </Switch>
);

export default App;
