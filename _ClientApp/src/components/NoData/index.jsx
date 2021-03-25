import React from 'react';
import NoContent from '../../assets/no-content';

import Styles from './nodata.module.scss';

function NoData() {
  return (
    <div className={Styles.nodata}>
      <NoContent text="No Data" />
    </div>
  );
}

export default NoData;
