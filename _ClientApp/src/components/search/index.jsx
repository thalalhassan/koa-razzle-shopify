import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import Styles from './search.module.scss';

export default function Search({ border, placeholder, handleOnSearch }) {
  const [term, setterm] = useState('');
  const onformSubmit = (event) => {
    handleOnSearch(term);
    event.preventDefault();
  };

  return (
    <div className={border ? Styles.border : ''}>
      <form onSubmit={onformSubmit} className={Styles.form}>
        <label className={Styles.label}>
          <span>
            <img src="/images/searchicon.svg" alt="search" />
          </span>
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            value={term}
            onChange={({ target }) => {
              const { value } = target;
              handleOnSearch(value);
              setterm(value);
            }}
            placeholder={placeholder || 'Search here...'}
            className={Styles.input}
          />
        </label>
      </form>
    </div>
  );
}

Search.propTypes = {
  border: PropTypes.string,
  placeholder: PropTypes.string,
  handleOnSearch: PropTypes.func,
};

Search.defaultProps = {
  border: '',
  placeholder: '',
  handleOnSearch: () => {},
};
