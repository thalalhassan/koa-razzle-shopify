import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Leftarrow from '../../assets/icons/leftarrow';
import Rightarrow from '../../assets/icons/rightarrow';
import Styles from './pagination.module.scss';

function Pagination({
  currentpage,
  totalpage,
  prevclick,
  nextclick,
  metaData,
}) {
  const { limit, count, page } = metaData;
  const [pagenumber, setpagenumber] = useState(parseInt(currentpage, 10));
  useEffect(() => {
    setpagenumber(parseInt(page, 10));
  }, [page]);
  const onnextclick = () => {
    if (pagenumber < parseInt(totalpage, 10)) {
      setpagenumber(pagenumber + 1);
      nextclick(pagenumber + 1);
    }
  };
  const onprevclick = () => {
    if (pagenumber > 0) {
      setpagenumber(pagenumber - 1);
      prevclick(pagenumber - 1);
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.info}>
        {count
          ? `Showing ${(pagenumber - 1) * limit + 1} to ${
            limit * pagenumber < count ? limit * pagenumber : count
          } of ${count} entries`
          : '0 entries'}
      </div>
      <div aria-hidden className={Styles.leftarrow} onClick={pagenumber > 1 ? onprevclick : null}>
        <Leftarrow />
      </div>
      <div className={Styles.pageno}>{`${pagenumber} of ${totalpage}`}</div>
      <div aria-hidden className={Styles.ritarrow} onClick={pagenumber < totalpage ? onnextclick : null}>
        <Rightarrow />
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentpage: PropTypes.string,
  totalpage: PropTypes.any,
  metaData: PropTypes.object,
  prevclick: PropTypes.func.isRequired,
  nextclick: PropTypes.func.isRequired,
};

// default props
Pagination.defaultProps = {
  currentpage: '',
  totalpage: '',
  metaData: {},
};
export default Pagination;
