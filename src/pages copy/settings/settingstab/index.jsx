import React from 'react';
import Input from '../../../components/input';
import Button from '../../../components/button';
import Styles from './settingstab.module.scss';

export default function Settingstab() {
  return (
    <div className={Styles.container}>
      <h3>Settings</h3>
      <form action="">
        <div className={Styles.row}>
          <Input label="Your Name" name="name" type="text" placeholder="Enter your name" />
        </div>
        <div className={Styles.row}>
          <Input label="Email address" name="email" type="email" placeholder="Enter your email address" />
        </div>
        <div className={Styles.row}>
          <Input label="Company name" name="Company" type="text" placeholder="Enter your Company name" />
        </div>
        <div className={Styles.row}>
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
}
