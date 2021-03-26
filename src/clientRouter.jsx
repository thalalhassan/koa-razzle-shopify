import {
  ClientRouter as AppBridgeClientRouter,
  RoutePropagator,
} from "@shopify/app-bridge-react";
import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

function ClientRouter({ history, location }) {
  return (
    <>
      <AppBridgeClientRouter history={history} />
      <RoutePropagator location={location} />
    </>
  );
}

ClientRouter.propTypes = {
  history: PropTypes.any,
};

ClientRouter.defaultProps = {
  history: {},
};

export default withRouter(ClientRouter);
