import { isEmpty, getObjectProp } from 'helper';

/**
 *For Error messages
 */
const ERROR_MESSAGES = {
  ISEMPTY: 'This field is required',
  FORMAT: 'Invalid format ',
  LENGTH: 'invalid question ',
};

/**
 *For format change
 */
const FORMAT = {
  email: '[^@]+@[^.]+..+',
  password: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
  number: '^[-s./0-9]{6,12}$',
  stringlen: '^.{3,500}$',
};

/**
 * @param {*} data
 */
export const validate = (data, fields) => {
  const errors = {};
  fields.forEach((field) => {
    const value = getObjectProp(data, field);
    const splitted = field.split('.');
    let formatField = field;
    if (splitted[1]) {
      [, formatField] = splitted;
    }
    if (
      !(value instanceof File)
      && !(value instanceof Date)
      && isEmpty(value)
    ) {
      if (splitted[1]) {
        if (isEmpty(errors[splitted[0]])) errors[splitted[0]] = {};
        errors[splitted[0]][splitted[1]] = ERROR_MESSAGES.ISEMPTY;
      } else {
        errors[field] = ERROR_MESSAGES.ISEMPTY;
      }
    } else if (FORMAT[formatField]) {
      if (!new RegExp(FORMAT[formatField]).test(value)) {
        if (splitted[1]) {
          if (isEmpty(errors[splitted[0]])) errors[splitted[0]] = {};
          errors[splitted[0]][splitted[1]] = ERROR_MESSAGES.FORMAT;
        } else {
          errors[formatField] = ERROR_MESSAGES.FORMAT;
        }
      }
    }
  });
  return errors;
};

/**
 *For set focus
 * @param {} validatedErrors
 */
export const setFocus = (validatedErrors) => {
  if (isEmpty(validatedErrors)) return true;
  const errorKey = Object.keys(validatedErrors)[0];
  const name = typeof validatedErrors[errorKey] === 'string'
    ? errorKey
    : Object.keys(validatedErrors[errorKey])[0];
  const focused = document.querySelector(`[name = ${name}]`);
  if (focused && focused.type === 'hidden') {
    focused.setAttribute('type', 'text');
    focused.focus();
    focused.setAttribute('type', 'hidden');
  } else if (focused) focused.focus();
  return true;
};
