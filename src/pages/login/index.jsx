/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser } from 'actions/auth';
import Cookies from 'js-cookie';
import { getParamsFromSearch } from 'helper';
import PropTypes from 'prop-types';
import SimpleLoader from 'components/simpleLoader';

function Login(props) {
  const shopOrigin = Cookies.get('shopOrigin');
  const { location, errors, user, isAuthenticated } = props;
  const { shop, accessKey } = getParamsFromSearch(location.search, [
    'shop',
    'accessKey',
  ]);

  useEffect(async () => {
    if (shop && accessKey) {
    await props.loginUser({ shop, accessKey });
    } else if (shopOrigin) {
    window.location.href = `${process.env.REACT_APP_HOST_URL}/auth/inline?shop=${shopOrigin}`;
    }
  }, [shopOrigin, user, accessKey, shop]);

  useEffect(() => {
    if (isAuthenticated) props.history.push('/');
  }, [isAuthenticated]);

  return (
    <div>
      {errors ? (
        errors._message
      ) : (
        <SimpleLoader message="...  Logging in  ..." />
      )}
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  errors: PropTypes.object,
  user: PropTypes.object,
};
Login.defaultProps = {
  errors: null,
  user: null,
};
const mapStateToProps = (state) => ({
  ...state.authReducer,
});

export default connect(mapStateToProps, {
  loginUser,
})(Login);
