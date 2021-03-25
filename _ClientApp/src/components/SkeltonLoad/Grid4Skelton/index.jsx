import React from 'react';
import SkeltonCard from 'components/SkeltonCard';
import Styles from '../skelton.module.scss';

export default function Grid4Skelton() {
  return (
    <div className={Styles.row}>
      <div className={Styles.col12}>
        <div className={Styles.box1} style={{ flexDirection: 'column' }}>
          <div className={Styles.analytics_head}>
            <SkeltonCard width="140px" height="25px" />
            <SkeltonCard width="70px" height="15px" />
          </div>
          <SkeltonCard height="260px" />
          <div className={Styles.gap} />
          <div className={Styles.analytics_content}>
            <div className={Styles.analytics_box}>
              <SkeltonCard height="15px" />
              <SkeltonCard height="25px" />
            </div>
            <div className={Styles.analytics_box}>
              <SkeltonCard height="15px" />
              <SkeltonCard height="25px" />
            </div>
            <div className={Styles.analytics_box}>
              <SkeltonCard height="15px" />
              <SkeltonCard height="25px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
