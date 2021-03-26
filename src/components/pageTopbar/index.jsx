import React from 'react';
import Styles from './pagetopbar.module.scss';

function Pagetopbar() {
  const items = {
    leftimg: './images/proreports.svg',
    lefttitle: 'Pro-Reports',
    righttitle: 'by acowebs',
  };

  return (
    <div className={Styles.topbarsect}>
      <div className={Styles.leftsect}>
        <img src={items.leftimg} alt={items.lefttitle} />
        {items.lefttitle}
      </div>
      <div className={Styles.rightsect}>{items.righttitle}</div>
    </div>
  );
}

export default Pagetopbar;
