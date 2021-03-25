import React from 'react';
import Styles from './container.module.scss';

function Container({ children }) {
  return (

    <div className={Styles.maincontainer}>
      {children}
    </div>

  );
}

export default Container;
