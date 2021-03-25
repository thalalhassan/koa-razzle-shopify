import React from 'react';
import { ClassNames } from 'helper';
import PropTypes from 'prop-types';
import Button from '../button';
import Styles from './alertbox.module.scss';
/**
 * Alert Dialog
 * @param {*} props
 */
export default function AlertBox(props) {
  const {
    open, handleClose, content, onAccept,
  } = props;

  return (
    <div
      className={ClassNames([
        Styles.dialog,
        open === true ? '' : Styles.close,
      ])}>
      <div className={Styles.dialog_inner}>
        <h3>{content}</h3>
        <div className={Styles.button}>
          <Button value="No" color="secondary" size="xs" onClick={handleClose}>
            No
          </Button>
          <Button value="Yes" color="secondary" size="xs" onClick={onAccept}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}

// prop types
AlertBox.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
};
