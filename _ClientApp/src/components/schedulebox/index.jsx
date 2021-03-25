import React from 'react';
import PropTypes from 'prop-types';
import { ClassNames } from 'helper';
import Styles from './schedulebox.module.scss';

function Schedulebox(props) {
  const { active, title, description, icon } = props;
  const Icon = icon;
  return (
    <div className={ClassNames([Styles.container, active && Styles.active])}>
      <div className={Styles.icon}>
        <Icon active={!!active} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

Schedulebox.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.elementType,
};

Schedulebox.defaultProps = {
  active: false,
  title: '',
  description: '',
  icon: <></>,
};

export default Schedulebox;
