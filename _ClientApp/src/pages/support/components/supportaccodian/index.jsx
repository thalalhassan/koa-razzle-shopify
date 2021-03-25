import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Styles from './supportaccordian.module.scss';
import Accordianitem from './accordianitem';

export default function Supportaccordian({ data }) {
  const [selectedindex, setselectedindex] = useState(0);

  const itemselected = (count) => {
    setselectedindex((prev) => (prev === count ? -1 : count));
  };

  return (
    <div className={Styles.container}>
      {data.map(({ title, content }, indexvalue) => (
        <Accordianitem
          key={title}
          titletext={title}
          contenttext={content}
          selectedindex={selectedindex}
          itemselected={itemselected}
          index={indexvalue}
        />
      ))}
    </div>
  );
}

Supportaccordian.propTypes = {
  data: PropTypes.array,
};

Supportaccordian.defaultProps = {
  data: [],
};
