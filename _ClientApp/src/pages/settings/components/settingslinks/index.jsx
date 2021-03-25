import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Topmenuitem from '../../../../components/topmenu/topmenuitem';
import Subscriptionicon from '../../../../assets/icons/subscriptionicon';
import Settingsicontwo from '../../../../assets/icons/settingicontwo';
import Profileicon from '../../../../assets/icons/profileicon';
import Styles from './settinglinks.module.scss';

function Settinglinks({ history }) {
  const links = [
    {
      icon: Profileicon,
      title: 'My profile',
      link: '/settings/myprofile',
    },
    {
      icon: Settingsicontwo,
      title: 'Settings',
      link: '/settings/settings',
    },
    {
      icon: Subscriptionicon,
      title: 'Subscription',
      link: '/settings/subscription',
    },
  ];

  return (
    <>
      <ul className={Styles.container}>
        {links.map((val) => {
          const Icon = val.icon;
          return (
            <Topmenuitem
              key={val.title}
              title={val.title}
              linkto={val.link}
              active={history.location.pathname === val.link}
              verticalliststyle>
              <Icon active={history.location.pathname === val.link} />
            </Topmenuitem>
          );
        })}
      </ul>
    </>
  );
}

Settinglinks.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.object,
  }).isRequired,
};

export default withRouter(Settinglinks);
