import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Topmenuitem from './topmenuitem';
import Styles from './topmenu.module.scss';
import Reportsicon from '../../assets/icons/reporticon';
import Settingsicon from '../../assets/icons/settingsicon';
import Supporticon from '../../assets/icons/supporticon';
// import Forecasticon from '../../assets/icons/forecasticon';
import ScheduleIcon from '../../assets/icons/scheduleicon';
import Analyticsicon from '../../assets/icons/analyticsicon';
import Notification from '../notification';

function Topmenu({ history, user }) {
  const routes = [
    {
      icon: Reportsicon,
      title: 'Reports',
      link: '/reports',
    },
    {
      icon: Analyticsicon,
      title: 'Analytics',
      link: '/analytics',
    },
    {
      icon: ScheduleIcon,
      title: 'Schedules',
      link: '/schedule/schedulelist',
    },
    // {
    //   icon: Forecasticon,
    //   title: 'Forecast',
    //   link: '/forecast',
    // },
    {
      icon: Settingsicon,
      title: 'Settings',
      link: '/settings/myprofile',
    },
    {
      icon: Supporticon,
      title: 'Support',
      link: '/support',
    },
    // {
    //   title: 'Components',
    //   link: '/componentsview',
    // },
  ];

  return (
    <div className={Styles.sectionrow}>
      <ul className={Styles.leftsect}>
        {routes.map((val) => {
          const Icon = val.icon;
          return (
            <Topmenuitem
              key={val.title}
              title={val.title}
              linkto={val.link}
              active={history.location.pathname === val.link}>
              {Icon && <Icon active={history.location.pathname === val.link} />}
            </Topmenuitem>
          );
        })}
      </ul>
      <div className={Styles.ritsect}>
        <h3>
          {/* Trial will end in 5 days */}
          {user?.subscribed === false && (
            <span>
              <Link to="/subscriptions/selectaplan">Select a Plan</Link>
            </span>
          )}
        </h3>
        <ul className={Styles.shortlinks}>
          {user && (
            <li className={Styles.icon}>
              <Notification />
            </li>
          )}
          {/* <li className={Styles.icon}>
            <div>
              <img src="/images/iconshort.svg" alt="shortcut" />
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state.authReducer,
});

Topmenu.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.object,
};
Topmenu.defaultProps = {
  user: null,
};

export default withRouter(connect(mapStateToProps, {})(Topmenu));
// export default withRouter(Topmenu);
