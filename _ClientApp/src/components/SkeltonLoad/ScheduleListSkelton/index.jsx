import React from 'react';
import SkeltonCard from 'components/SkeltonCard';
import Styles from '../skelton.module.scss';

export default function ScheduleListSkelton() {
  return (
    <div className={Styles.row}>
      <div className={Styles.col12}>
        <div className={Styles.tab}>
          <div className={Styles.tab_head}>
            <SkeltonCard width="125px" height="15px" />
          </div>
          <div className={Styles.tab_head}>
            <SkeltonCard width="215px" height="15px" />
          </div>
        </div>
        <SkeltonCard height="1px" />
        <table>
          <thead>
            <tr>
              {[...Array(10).keys()].map((e) => (
                <th key={e}>
                  <SkeltonCard height="15px" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(4).keys()].map((e) => (
              <tr key={e}>
                {[...Array(10).keys()].map((se) => (
                  <td key={se}>
                    <SkeltonCard height="15px" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
