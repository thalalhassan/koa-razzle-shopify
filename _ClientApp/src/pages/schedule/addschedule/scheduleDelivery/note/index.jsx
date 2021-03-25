import React from 'react';
import Styles from './note.module.scss';

export default function Note() {
  return (
    <div className={Styles.container}>
      <h4>Example :1</h4>
      <h5>If you select “12:00 AM” and “sunday”</h5>
      <ul>
        <li>
          The report will contain last 7 days data from sunday, 12:00:00 AM to
          Saturday, 11:59:59 PM.
        </li>
        <li>The report will be delivered every week at sunday, 12:00 AM.</li>
      </ul>
    </div>
  );
}
