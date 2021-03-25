import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import Styles from './schedule.module.scss';
import Schedulelist from './schedulelist';
import Loadingicon from '../../assets/icons/loadingicon';

const Schedulehistory = lazy(() => import('./schedulehistory'));

function Schedule({ history }) {
  return (
    <div className={Styles.container}>
      <div className={Styles.sectionone}>
        <ul className={Styles.links}>
          <li
            className={
              history.location.pathname === '/schedule/schedulelist'
                ? Styles.active
                : Styles.inactive
            }>
            <Link to="/schedule/schedulelist">Schedule List</Link>
          </li>
          <li
            className={
              history.location.pathname === '/schedule/schedulehistory'
                ? Styles.active
                : Styles.inactive
            }>
            <Link to="/schedule/schedulehistory">
              Report & Schedule History
            </Link>
          </li>
        </ul>
      </div>
      <div className={Styles.secttwo}>
        <Suspense
          fallback={(
            <div className={Styles.loadingicon}>
              <Loadingicon />
            </div>
          )}>
          <Switch>
            <Route exact path="/schedule/schedulelist">
              <Schedulelist />
            </Route>
            <Route path="/schedule/schedulehistory">
              <Schedulehistory />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

/**
 * Proptypes
 */
Schedule.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(Schedule);
