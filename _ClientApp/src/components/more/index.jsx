import React, { useState } from 'react';
import PropTypes from 'prop-types';

function More({ options }) {
  const [toggle, settoggle] = useState(false);
  return (
    <div>
      <img aria-hidden src="/images/more.svg" alt="more" onClick={() => settoggle(!toggle)} />
      {toggle && options.map((val) => <li>{val.label}</li>)}
    </div>
  );
}

More.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})),
};

More.defaultProps = {
  options: [],
};
export default More;
