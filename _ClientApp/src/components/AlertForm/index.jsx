import React from 'react';
import { ClassNames } from 'helper';
import Input from 'components/input';
import PropTypes from 'prop-types';
import Button from '../button';
import Selectbox from '../select';
import Styles from './alertbox.module.scss';
/**
 * Alert Dialog
 * @param {*} props
 */
export default function AlertFrom(props) {
  const {
    open,
    handleClose,
    heading,
    onFieldChange,
    formData,
    formFields,
    onAccept,
    errors,
    ...otherprops
  } = props;

  const getFormFieldData = () => {
    const formFieldDatas = [];
    formFields.map(
      ({
        type,
        label,
        value,
        name,
        placeholder,
        options,
        ...otherFieldData
      }) => {
        if (type === 'text' || type === 'textarea') {
          formFieldDatas.push(
            <Input
              label={name}
              type={type}
              name={name}
              key={name}
              value={formData[name]}
              placeholder={placeholder || 'Enter the data here...'}
              onChange={onFieldChange}
              errors={errors}
              {...otherprops}
              {...otherFieldData}
            />,
          );
        } else if (type === 'select') {
          formFieldDatas.push(
            <Selectbox
              bgcolor="#fff"
              label={label || name}
              name={name}
              key={name}
              value={value}
              onselectOption={onFieldChange}
              data={options}
            />,
          );
        }
        return true;
      },
    );
    return formFieldDatas;
  };

  return (
    <div
      className={ClassNames([
        Styles.dialog,
        open === true ? '' : Styles.close,
      ])}>
      <div className={Styles.dialog_inner}>
        <h3>{heading}</h3>
        <div className={Styles.form}>{formFields && getFormFieldData()}</div>
        <div className={Styles.button}>
          <Button value="No" color="secondary" size="xs" onClick={handleClose}>
            Cancel
          </Button>
          <Button value="Yes" color="secondary" size="xs" onClick={onAccept}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

// prop types
AlertFrom.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  formData: PropTypes.object,
  otherprops: PropTypes.object,
  formFields: PropTypes.array,
  onFieldChange: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

AlertFrom.defaultProps = {
  formFields: [],
  errors: null,
  formData: {},
  otherprops: {},
};
