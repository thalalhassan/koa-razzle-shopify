import React from 'react';
import PropTypes from 'prop-types';
import Styles from './supportbox.module.scss';
import Button from '../../../../components/button';

export default function Supportbox(props) {
  const { img, title, subtitle, btntext, btnurl } = props;

  return (
    <div className={Styles.container}>
      <div className={Styles.icon}>
        <img src={img} alt="support" />
      </div>
      <h4>{title}</h4>
      <h5>{subtitle}</h5>
      <div className={Styles.btn}>
        <Button color="greyish" a href={btnurl}>
          {btntext}
        </Button>
      </div>
    </div>
  );
}

Supportbox.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  btntext: PropTypes.string,
  btnurl: PropTypes.string,
};

Supportbox.defaultProps = {
  img: '/images/supporticon4.svg',
  title: 'Default text',
  subtitle: 'Find troubleshooting articles',
  btntext: 'View Knowledge base',
  btnurl: '/',
};
