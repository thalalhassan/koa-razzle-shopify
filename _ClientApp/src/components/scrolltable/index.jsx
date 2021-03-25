import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Normaltable from 'components/normaltable';
import ReportDetailSkelton from 'components/SkeltonLoad/ReportDetailSkelton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { isEmpty } from 'helper';
import NoData from 'components/NoData';
import Styles from './scrolltable.module.scss';

export default function Scrolltable({
  data,
  fetchNextData,
  headers,
  baseTable,
  hasMore,
  showGrandTotal,
  tableType,
  handleSortOrder,
  loading,
  clearSortName,
  defaultExtraFilterData,
}) {
  const [listData, setlistData] = useState([]);
  const [length, setlength] = useState(10);

  useEffect(() => {
    setlength(data.length);
    setlistData(data);
  }, [data, hasMore]);

  const nextDataCall = () => {
    fetchNextData({ isFiltered: false });
  };

  return (
    <div className={Styles.tablecontainer}>
      {loading && isEmpty(listData) && <ReportDetailSkelton />}
      {isEmpty(data) && !loading && (
        <div className={Styles.nocontent}>
          <NoData />
        </div>
      )}
      {!isEmpty(listData) && (
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          dataLength={length} // This is important field to render the next data
          next={nextDataCall}
          hasMore={hasMore}
          loader={<h4 className={Styles.endMessage}>...Loading...</h4>}
          endMessage={
            !showGrandTotal && (
              <p className={Styles.endMessage}> - No more data - </p>
            )
          }>
          <Normaltable
            data={listData}
            handleSortOrder={handleSortOrder}
            defaultExtraFilterData={defaultExtraFilterData}
            showGrandTotal={showGrandTotal}
            hasMore={hasMore}
            headers={headers}
            baseTable={baseTable}
            tableStyle={tableType === 'compact' ? '' : 'styletwo'}
            tableType={tableType}
            clearSortName={clearSortName}
          />
        </InfiniteScroll>
      )}
    </div>
  );
}

Scrolltable.propTypes = {
  data: PropTypes.array.isRequired,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  showGrandTotal: PropTypes.bool,
  fetchNextData: PropTypes.func.isRequired,
  headers: PropTypes.array.isRequired,
  tableType: PropTypes.string,
  baseTable: PropTypes.string,
  clearSortName: PropTypes.string,
  handleSortOrder: PropTypes.func,
  defaultExtraFilterData: PropTypes.object,
};
Scrolltable.defaultProps = {
  hasMore: true,
  tableType: '',
  baseTable: '',
  showGrandTotal: false,
  loading: true,
  clearSortName: null,
  handleSortOrder: () => {},
  defaultExtraFilterData: null,
};
