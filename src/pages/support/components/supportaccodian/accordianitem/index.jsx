import { createMarkup } from 'helper';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import Styles from './accordianitem.module.scss';

export default function Accordianitem(props) {
  const { titletext, contenttext, selectedindex, itemselected, index } = props;

  const [Height, setHeight] = useState(0);

  const isActive = selectedindex === index;

  const content = useRef(null);

  const toggleaccordian = (val) => {
    itemselected(val);
  };

  useEffect(() => {
    const Height = `${content.current.scrollHeight}px`;
    setHeight(Height);
  }, []);

  return (
    <>
      <div className={Styles.accodianitem}>
        <div
          aria-hidden
          className={Styles.title}
          onClick={() => toggleaccordian(index)}>
          {titletext}
          <span className={Styles.icon}>
            <img
              src={
                isActive ? '/public/images/minusicon.svg' : '/public/images/addicongrey.svg'
              }
              alt="icon"
            />
          </span>
        </div>
        <div
          ref={content}
          style={isActive ? { maxHeight: Height } : { maxHeight: '0px' }}
          className={Styles.content}>
          {/* <p>{contenttext}</p> */}
          <p dangerouslySetInnerHTML={createMarkup(contenttext)} />
        </div>
      </div>
    </>
  );
}

Accordianitem.propTypes = {
  titletext: PropTypes.string,
  contenttext: PropTypes.string,
  selectedindex: PropTypes.number,
  itemselected: PropTypes.func,
  index: PropTypes.number,
};

Accordianitem.defaultProps = {
  titletext: '',
  contenttext: '',
  selectedindex: 0,
  itemselected: () => {},
  index: 0,
};
