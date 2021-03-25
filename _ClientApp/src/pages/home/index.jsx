import React from 'react';
import Styles from './home.module.scss';
import Button from '../../components/button';
import Notification from '../../assets/icons/notification';

function Home() {
  return (
    <>
      <div className={Styles.container}>Home</div>
      <Notification />
      <Button>Click Me</Button>

    </>
  );
}

export default Home;
