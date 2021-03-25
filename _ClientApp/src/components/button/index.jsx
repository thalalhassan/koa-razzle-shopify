import React from 'react';
import { ClassNames } from 'helper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './button.module.scss';

function Button(props) {
  const {
    link,
    a,
    href,
    size,
    color,
    disabled,
    iconright,
    className,
    to,
    icon,
    loading,
    onClick,
    children,
    ...otherProps
  } = props;
  if (link) {
    return (
      <Link
        className={ClassNames([
          Styles.container,
          Styles[size],
          Styles[color],
          className,
          disabled && Styles.disabled,
          iconright && Styles.iconright,
        ])}
        to={to}
        {...otherProps}>
        {icon && (
          <span>
            <img src={icon} alt="button" />
          </span>
        )}
        {children}
      </Link>
    );
  }
  if (a) {
    return (
      <a
        className={ClassNames([
          Styles.container,
          Styles[size],
          Styles[color],
          className,
          disabled && Styles.disabled,
          iconright && Styles.iconright,
        ])}
        target="blank"
        href={href}>
        {children}
      </a>
    );
  }
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={ClassNames([
        Styles.container,
        Styles[size],
        Styles[color],
        disabled && Styles.disabled,
        iconright && Styles.iconright,
      ])}
      onClick={loading ? null : onClick}
      {...otherProps}>
      {icon && (
        <span>
          <img src={icon} alt="button" />
        </span>
      )}
      {loading && (
        <div className={Styles.loading}>
          <img alt="loader" src="/images/loader.svg" />
        </div>
      )}
      {children}
    </button>
  );
}

Button.propTypes = {
  link: PropTypes.bool,
  a: PropTypes.bool,
  disabled: PropTypes.bool,
  iconright: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  link: false,
  a: false,
  disabled: false,
  iconright: false,
  size: 'sm',
  icon: '',
  to: '',
  href: '',
  children: '',
  color: 'primary',
  className: '',
  loading: false,
  onClick: () => {},
};

export default Button;
