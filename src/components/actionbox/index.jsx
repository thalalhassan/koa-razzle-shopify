import React from 'react';
import PropTypes from 'prop-types';
import { ClassNames } from 'helper';
import List from '../list';
import Button from '../button';
import Styles from './actionbox.module.scss';

export default function Actionbox({
  tagData,
  title,
  price,
  btnData,
  listData,
  subTitle,
  currencyCode,
}) {
  return (
    <div className={Styles.container}>
      {tagData && (
        <span className={ClassNames([Styles.tag, Styles[tagData.color]])}>
          {tagData.title}
        </span>
      )}

      <div className={Styles.icon}>
        <img src="/images/iconsubscription.svg" alt="subscription" />
      </div>
      <div className={Styles.title}>{title}</div>
      <div className={Styles.price}>{`${currencyCode} ${price}`}</div>
      {subTitle && <div className={Styles.subTitle}>{subTitle}</div>}

      <div className={Styles.list}>
        <List data={listData} />
      </div>
      <div className={Styles.btn}>
        {btnData.url && (
        <Button link to={btnData.url} size="fullwidth" color="inversecolor">
          {btnData.title}
        </Button>
        )}
        {btnData.onClick && (
        <Button onClick={btnData.onClick} size="fullwidth" color="inversecolor">
          {btnData.title}
        </Button>
        )}
      </div>
    </div>
  );
}

Actionbox.propTypes = {
  tagData: PropTypes.array,
  title: PropTypes.string,
  currencyCode: PropTypes.string,
  price: PropTypes.string,
  btnData: PropTypes.array,
  listData: PropTypes.array,
  subTitle: PropTypes.string,
};

Actionbox.defaultProps = {
  tagData: [],
  title: '',
  price: '',
  currencyCode: '',
  btnData: [],
  listData: [],
  subTitle: '',
};
