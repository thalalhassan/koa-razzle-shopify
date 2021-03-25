import React from 'react';
import SkeltonCard from 'components/SkeltonCard';
import Styles from '../skelton.module.scss';

export default function ReportSkeleton() {
  return (
    <div className={Styles.row}>
      <div className={Styles.col4}>
        <div className={Styles.box2} style={{ flexDirection: 'column' }}>
          <div className={Styles.report_head}>
            <div className={Styles.leftsect}>
              <SkeltonCard width="30px" height="30px" circle />
            </div>
            <div className={Styles.rightsect}>
              <h2>
                <SkeltonCard width="60%" height="30px" />
              </h2>
              <div>
                <SkeltonCard height="15px" />
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.gap} />
        <div className={Styles.box1} style={{ flexDirection: 'column' }}>
          <div className={Styles.report_head}>
            <div className={Styles.leftsect}>
              <SkeltonCard width="30px" height="30px" circle />
            </div>
            <div className={Styles.rightsect}>
              <h2>
                <SkeltonCard width="60%" height="30px" />
              </h2>
            </div>
          </div>
          <ul>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
          </ul>
        </div>
      </div>
      <div className={Styles.col4}>
        <div className={Styles.box1} style={{ flexDirection: 'column' }}>
          <div className={Styles.report_head}>
            <div className={Styles.leftsect}>
              <SkeltonCard width="30px" height="30px" circle />
            </div>
            <div className={Styles.rightsect}>
              <h2>
                <SkeltonCard width="60%" height="30px" />
              </h2>
            </div>
          </div>
          <ul>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
          </ul>
        </div>
      </div>
      <div className={Styles.col4}>
        <div className={Styles.box1} style={{ flexDirection: 'column' }}>
          <div className={Styles.report_head}>
            <div className={Styles.leftsect}>
              <SkeltonCard width="30px" height="30px" circle />
            </div>
            <div className={Styles.rightsect}>
              <h2>
                <SkeltonCard width="60%" height="30px" />
              </h2>
            </div>
          </div>
          <ul>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
            <li>
              <SkeltonCard height="15px" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
