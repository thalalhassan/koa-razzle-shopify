import React from 'react';
import SkeltonCard from 'components/SkeltonCard';
import Styles from '../skelton.module.scss';

export default function ReportDetailSkelton() {
  return (
    <div className={Styles.row}>
      <div className={Styles.col12}>
        {' '}
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
            {[...Array(7).keys()].map((e) => (
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
