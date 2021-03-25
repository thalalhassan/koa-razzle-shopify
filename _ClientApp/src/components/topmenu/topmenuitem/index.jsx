import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ClassNames } from 'helper';
import Styles from './topmenuitem.module.scss';

function Topmenuitem({ active, verticalliststyle, linkto, children, title }) {
  return (
    <li
      className={ClassNames([
        active ? Styles.menuitemactive : Styles.menuitem,
        verticalliststyle && Styles.vertical,
      ])}>
      <Link to={linkto}>
        {children}
        {title}
      </Link>
    </li>
  );
}

Topmenuitem.propTypes = {
  title: PropTypes.string,
  linkto: PropTypes.string,
  active: PropTypes.bool,
  verticalliststyle: PropTypes.bool,
  children: PropTypes.element,
};
Topmenuitem.defaultProps = {
  title: '',
  linkto: '',
  active: false,
  verticalliststyle: false,
  children: null,
};

export default Topmenuitem;
