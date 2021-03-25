import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Styles from './settings.module.scss';
import Settinglinks from './components/settingslinks';
import Myprofile from './myprofiletab';
import Subscriptiontab from './subscriptiontab';
import Settingstab from './settingstab';

function Settings() {
  return (
    <div>
      <div className={Styles.sectionone}>
        <h2>Settings</h2>
      </div>
      <div className={Styles.sectiontwo}>
        <div className={Styles.leftsect}>
          <Settinglinks />
        </div>
        <div className={Styles.ritsect}>
          <Switch>
            <Route exact path="/settings/myprofile">
              <Myprofile />
            </Route>
            <Route exact path="/settings/settings">
              <Settingstab />
            </Route>
            <Route path="/settings/subscription">
              <Subscriptiontab />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Settings);
