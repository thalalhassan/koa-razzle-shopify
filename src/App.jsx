import React, { Suspense, useEffect, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Topmenu from 'components/topmenu';
import routes from 'route';
import Topsection from 'components/topSection';
import Container from 'components/container';
import SimpleLoader from 'components/simpleLoader';
import SyncLoader from 'components/SyncLoader';
import PropTypes from 'prop-types';
// import { Actions } from 'actions/types';
import { updateData } from 'actions';
import { connect } from 'react-redux';
// import { askForPermissioToReceiveNotifications } from './pushNotification';
import './App.scss';

const Login = lazy(() => import('pages/login'));

function WaitingComponent(Component) {
  return (props) => (
    <Suspense fallback={<SimpleLoader />}>
      <Component {...props} />
    </Suspense>
  );
}
function App(props) {
  const { location, user, isAuthenticated } = props;
  // for url append in shopify embedded app

  // True :  The page is in an iFrames
  const isInIframe = () =>
    typeof window !== 'undefined' && window.location !== window.parent.location;

  // const getNotificationPermisson = () => {
  //   askForPermissioToReceiveNotifications().then((token) => {
  //     props.updateData(Actions.UPDATE_SHOP_DATA, '/shops/updateToken', {
  //       fcmToken: token,
  //     });
  //   });
  // };

  // useEffect(() => {
  //   if (user) getNotificationPermisson();
  // }, [user]);

  useEffect(() => {
    const TawkAPI = {};
    TawkAPI.visitor = {
      name: user?.name,
      email: user?.email,
    };
    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60178dcac31c9117cb747445/1ete03p4g';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
    window.Tawk_API = TawkAPI || {};
    window.Tawk_LoadStart = new Date();
    document.body.appendChild(s1);
    document.body.appendChild(s0);
  }, []);

  return (
    <>
      {isInIframe() ? (
        <div className="App" id="scrollableDiv">
          <Topsection>
            <Topmenu />
          </Topsection>
          <SyncLoader />
          <Container>
            <Switch>
              <Route path="/login" exact component={WaitingComponent(Login)} />
              {isAuthenticated &&
                routes.map(({ path, exact, component }) => (
                  <Route
                    key={path}
                    path={path}
                    exact={exact}
                    component={WaitingComponent(component)}
                  />
                ))}
            </Switch>
          </Container>
        </div>
      ) : (
        <SimpleLoader />
      )}
    </>
  );
}

/**
 * map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  shop: state.getShopReducer,
  ...state.authReducer,
});

App.propTypes = {
  // updateData: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  location: PropTypes.any,
};

App.defaultProps = {
  location: {},
  user: null,
};
export default withRouter(connect(mapStateToProps, { updateData })(App));
