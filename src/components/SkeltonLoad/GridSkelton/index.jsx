import React from 'react';
import SkeltonCard from 'components/SkeltonCard';
import Styles from '../skelton.module.scss';

export default function GridSkelton() {
  return (
    <div className={Styles.row}>
      {[...Array(4).keys()].map((e) => (
        <div className={Styles.col3} key={e}>
          <div className={Styles.box1}>
            <div className={Styles.leftsect}>
              <SkeltonCard width="60px" height="60px" circle />
            </div>
            <div className={Styles.rightsect}>
              <h3>
                <SkeltonCard width="100px" height="14px" />
              </h3>
              <h4>
                <SkeltonCard width="60%" height="30px" />
              </h4>
              <h5>
                <SkeltonCard height="10px" />
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
