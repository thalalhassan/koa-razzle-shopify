import React from 'react';
import { ClassNames } from 'helper';
import SkeltonCard from 'components/SkeltonCard';
import Styles from './miniloadcard.module.scss';

const miniloadCard = () => (
  <div className={ClassNames([Styles.miniloadcard, Styles.card])}>
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
        <span>
          <SkeltonCard height="10px" />
        </span>
      </h5>
    </div>
  </div>
);

export default miniloadCard;
