import { ClientRouter as AppBridgeClientRouter } from '@shopify/app-bridge-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function ClientRouter(props) {
  const { history } = props;
  return <AppBridgeClientRouter history={history} />;
}

ClientRouter.propTypes = {
  history: PropTypes.any,
};

ClientRouter.defaultProps = {
  history: {},
};

export default withRouter(ClientRouter);
