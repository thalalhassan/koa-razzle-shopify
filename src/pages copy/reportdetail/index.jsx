/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import Button from 'components/button';
import AlertForm from 'components/AlertForm';
import { DATE_RANGE } from 'utils';
import Daterangeselect from 'components/daterangeselect';
import Statschartsmall from 'components/statschartsmall';
import OverviewChart from 'components/overviewChart';
import Scrolltable from 'components/scrolltable';
import Popupeditcol from 'components/popupeditcol';
import Filter from 'components/filter';
import DragAndDrop from 'components/dragndrop';
import ToggleButton from 'components/toggleButton';
import { Actions } from 'actions/types';
import { toast } from 'react-toastify';
import {
  isEmpty,
  getHeaderFields,
  stringCamelizer,
  compareObjects,
} from 'helper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getData, createData, exportData } from 'actions';
import { validate, setFocus } from 'validator';
import Styles from './reportdetail.module.scss';

function mergeUnique(arr1, arr2) {
  return arr1.concat(arr2.filter((item) => arr1.indexOf(item) === -1));
}

function Reportdetail(props) {
  const { reportKey, baseTable, reportType } = useParams();

  const [alertFormData, setalertFormData] = useState({});

  const [open, setOpen] = useState(false);

  const [showGrandTotal, setshowGrandTotal] = useState(false);

  const [openExportAlert, setopenExportAlert] = useState(false);

  const [exportType, setexportType] = useState('csv');

  const [filterType, setfilterType] = useState(null);

  const [sortOrders, setsortOrders] = useState([]);

  const [clearSortName, setclearSortName] = useState('');

  const [tableheader, settableheader] = useState([]);

  const [errors, seterrors] = useState(null);

  const [selected, setselected] = useState(['revenue', 'refunds']);

  const [graphactive, setgraphactive] = useState(false);

  const [editcol, seteditcol] = useState(false);

  const [showfilter, setshowfilter] = useState(false);

  const [tableType, settableType] = useState('compact');

  const [customReportKey, setcustomReportKey] = useState(reportKey);

  const [filterData, setsfilterData] = useState({});

  const [reportConfig, setsreportConfig] = useState({});

  const [isFiltered, setisFiltered] = useState(false);

  const [listData, setlistData] = useState([]);

  const { reports, analytics, reportFields } = props;

  const getDataCall = (query, config) => {
    const isFilteredData = query.isFiltered;
    delete query.isFiltered;
    props
      .getData(
        Actions.GET_REPORT_DATA,
        `/reports/${baseTable}/${reportKey}`,
        query,
      )
      .then((res) => {
        if (res.error) return true;
        const data = res?.payload?.data?._data || {};
        const newData = isFilteredData ? data : listData.concat(data);
        setlistData(newData);
      });

    if (config.analytics && (!query.page || query.page <= 1)) {
      props.getData(
        Actions.GET_ANALYTICS_DATA,
        `/reportAnalytics/${baseTable}/${reportKey}`,
        query,
      );
    }
  };

  useEffect(() => {
    props
      .getData(Actions.GET_REPORTFIELD_DATA, `/fieldOptions/${reportKey}`, {
        baseTable,
        reportType,
      })
      .then((res) => {
        if (res.error) return true;
        const data = res?.payload?.data?._data || {};
        const {
          defaultSelectedFields,
          defaultFieldData,
          defaultFilterData,
          defaultExtraFilterData,
          config,
        } = data;

        const { createdAt } = defaultFilterData;
        const { startDate, endDate, datePickerRange } = createdAt || {
          datePickerRange: 'anyTime',
        };
        const { startDateRange, endDateRange } =
          (datePickerRange !== 'custom' && DATE_RANGE[datePickerRange]) || {};
        defaultFilterData.createdAt = {
          startDate: startDateRange || startDate,
          endDate: endDateRange || endDate,
          datePickerRange,
        };
        setsreportConfig(config);
        settableheader(defaultSelectedFields || []);
        setsfilterData({
          ...defaultFilterData,
          fields: defaultFieldData,
          extraFilters: defaultExtraFilterData,
        });
        getDataCall(
          {
            ...defaultFilterData,
            fields: defaultFieldData,
            extraFilters: defaultExtraFilterData,
            page: 1,
          },
          config,
        );
        return true;
      });
  }, []);

  const fetchNextData = (query = {}) => {
    // filter case
    let paramsQuery = {
      ...query,
      isFiltered: true,
      page: 1,
    };
    // pagination case
    if (query.isFiltered === false) {
      const { next } = reports?.metaData || {};
      const { page } = filterData || {};
      paramsQuery = {
        ...filterData,
        isFiltered: false,
        page: page || next,
      };
    }
    getDataCall(paramsQuery, reportConfig);
  };

  const trigeradvanced = () => {
    setfilterType('advanced');
  };

  const chartclicked = (key) => {
    let joined = [];
    if (selected.includes(key)) {
      joined = selected.filter((val) => val !== key);
    } else {
      joined = mergeUnique(selected, [key]);
    }
    setselected(joined);
  };

  const showeditCol = () => {
    seteditcol(true);
  };
  const hidecoledit = () => {
    seteditcol(false);
  };

  const showfiltercontent = () => {
    setshowfilter(true);
    setfilterType('normal');
  };
  const hidefilter = () => {
    setshowfilter(false);
  };

  const togglegraph = () => {
    setgraphactive((prev) => !prev);
  };

  const colors = [
    '#7E9FFF',
    '#FA7595',
    '#29D6E2',
    '#00A0FF',
    '#FFC005',
    '#63B453',
    '#00A4FF',
  ];

  const onDatesChange = ({ name, startDate, endDate, datePickerRange }) => {
    const { defaultFieldData } = reportFields?.data || {};
    setsfilterData({
      ...filterData,
      [name]: { startDate, endDate, datePickerRange },
    });
    if (startDate && endDate) {
      setisFiltered(true);
      fetchNextData({
        ...filterData,
        fields: filterData.fields || defaultFieldData,
        [name]: { startDate, endDate, datePickerRange },
      });
    }
  };

  const handleOnFilterChange = (filteredData = {}) => {
    const { createdAt, fields } = filterData;
    setsfilterData({ ...filteredData, fields, createdAt });
  };

  const handleOnApplyFilter = () => {
    setshowfilter(false);
    setisFiltered(true);
    const { defaultFieldData, defaultExtraFilterData } =
      reportFields?.data || {};
    if (!isEmpty(filterData)) {
      fetchNextData({
        ...filterData,
        fields: filterData.fields || defaultFieldData,
        extraFilters: defaultExtraFilterData,
        page: 1,
      });
    }
  };

  const handleOnClearFilter = () => {
    const { defaultFilterData, defaultFieldData, defaultExtraFilterData } =
      reportFields?.data || {};
    const { createdAt } = defaultFilterData;
    setsfilterData({
      createdAt,
      fields: defaultFieldData,
      extraFilters: defaultExtraFilterData,
    });
    setshowfilter(false);
    setisFiltered(false);
    setlistData([]);
    getDataCall(
      {
        ...defaultFilterData,
        extraFilters: defaultExtraFilterData,
        fields: defaultFieldData,
        page: 1,
        isFiltered: true,
      },
      reportConfig,
    );
  };

  const handleSortOrder = (sortOrderData) => {
    const updatedOrders = sortOrders.filter(
      (sortData) => sortData.name !== sortOrderData.name,
    );
    updatedOrders.push(sortOrderData);
    setsortOrders(updatedOrders);
    fetchNextData({ ...filterData, sortBy: updatedOrders, page: 1 });
  };

  const handleOnDragAndDrop = (orderedData, name) => {
    setclearSortName(name);
    setsortOrders(orderedData);
    fetchNextData({ ...filterData, sortBy: orderedData, page: 1 });
  };

  const handleOnApplyEditColumns = (headerFields, tableheaders) => {
    setsfilterData({
      ...filterData,
      fields: headerFields,
    });
    fetchNextData({ ...filterData, fields: headerFields, page: 1 });
    settableheader(tableheaders);
    seteditcol(false);
  };

  const handleOnCancelEditColumns = () => {
    const { defaultSelectedFields } = reportFields?.data || {};
    const headerFields = getHeaderFields(defaultSelectedFields);
    fetchNextData({ ...filterData, fields: headerFields, page: 1 });
    settableheader(defaultSelectedFields);
    setsfilterData({
      ...filterData,
      fields: headerFields,
    });
    seteditcol(false);
  };

  const exportReports = () => {
    const queryData = {
      reportKey,
      baseTable,
      fields: tableheader,
      ...filterData,
    };
    delete queryData.isFiltered;
    const toastId = toast('Exporting data....', {
      progress: 0.2,
      type: 'info',
      autoClose: false,
    });
    exportData(`/reports/export/${exportType}`, queryData, exportType, toastId);
    setopenExportAlert(false);
  };

  const saveAsCustomReport = () => {
    const { defaultSelectedFields, id } = reportFields?.data || {};
    const isDefault = compareObjects(tableheader, defaultSelectedFields);
    if (!isDefault || !isEmpty(filterData)) {
      if (filterData.isFiltered) {
        delete filterData.isFiltered;
      }

      const { title, description } = alertFormData;
      const customReportData = {
        title,
        description,
        baseTable,
        reportKey: customReportKey,
        filters: filterData,
        headers: tableheader,
      };
      // for update
      if (id) customReportData.id = id;

      const validatedData = validate(customReportData, [
        'title',
      ]);
      if (!isEmpty(validatedData)) {
        seterrors(validatedData);
        setFocus(validatedData);
        return false;
      }
      props
        .createData(Actions.CREATE_REPORT_DATA, '/reports', customReportData)
        .then((res) => {
          if (!res.error) {
            toast.info(`Report ${id ? 'Updated' : 'Saved'}`);
            setOpen(false);
          } else {
            const errorsData = res.error.response?.data?._errors;
            seterrors(errorsData);
            setFocus(validatedData);
          }
        });
    } else {
      toast.warning('No change from default');
    }
    return true;
  };

  const handleOnAlertFieldChange = (name, value) => {
    if (name === 'title') {
      const camalizedValue = stringCamelizer(value);
      setcustomReportKey(camalizedValue);
    }
    setalertFormData({
      ...alertFormData,
      [name]: value,
    });
  };

  const onSaveButtonClick = () => {
    const { defaultSelectedFields, title, description } =
      reportFields?.data || {};
    const isDefault = compareObjects(tableheader, defaultSelectedFields);
    if (!isDefault || !isEmpty(filterData)) {
      if (reportType === 'custom') {
        setalertFormData({ title, description });
      }
      setOpen(true);
    } else {
      toast.warning('No changes from default');
    }
  };

  const getAxis = (val) => {
    const dataValue = isEmpty(val) ? [] : val;
    return dataValue.map((data) => data[0]);
  };
  const getAxisValue = (val) => {
    const dataValue = isEmpty(val) ? [] : val;
    return dataValue.map((data) => data[1]);
  };
  const getOverviewChartData = (val) => {
    const dataValue = isEmpty(val) ? [] : val;
    return dataValue
      .filter((valElement) => selected.includes(valElement.key))
      .map((dataEle) => ({
        ...dataEle,
        data: dataEle.data.map((ele) => ele[1]),
      }));
  };

  return (
    <div className={Styles.container}>
      <>
        <div className={Styles.sectionone}>
          <h2>{reportFields?.data?.title || 'Report Details'}</h2>
          <div className={Styles.sectionryt}>
            <div>
              <Button
                iconright
                icon="/images/arrowdown.svg"
                color="secondary"
                onClick={() => setopenExportAlert(true)}>
                Export
              </Button>
            </div>
            <div className={Styles.ml15}>
              <Button
                link
                to={`/reports/${reportKey}/${reportType}/${baseTable}/schedule`}
                icon="/images/scheduleicon.svg"
                color="secondary">
                Schedule
              </Button>
            </div>
            <div className={Styles.ml15}>
              <Button onClick={onSaveButtonClick}>
                {reportType === 'custom'
                  ? 'Update custom report'
                  : 'Save as custome report'}
              </Button>
            </div>
          </div>
        </div>
        <div className={Styles.sectiontwo}>
          <div className={Styles.leftsect}>
            {/* <div className={Styles.reportselect}>
            <Selectbox
              bgcolor="#fff"
              label="Report type"
              name="reporttype"
              onselectOption={() => {}}
              data={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
              ]}
            />
          </div> */}
            {/* <div> */}
            <Daterangeselect
              label="Created At"
              name="createdAt"
              onDatesChange={onDatesChange}
              startDate={filterData.createdAt?.startDate}
              endDate={filterData.createdAt?.endDate}
              datePickerRange={filterData.createdAt?.datePickerRange}
              rangeSelector
            />
            {/* </div> */}
          </div>
          <div className={Styles.rightsect}>
            <div
              className={Styles.ml15}
              onClick={() => {
                setshowGrandTotal(!showGrandTotal);
              }}>
              <Button
                size="smx"
                color={showGrandTotal ? 'primary' : 'secondary'}>
                Show Grand Total
              </Button>
            </div>
            {reportConfig?.analytics && (
              <div className={Styles.ml15}>
                <Button
                  onClick={togglegraph}
                  size="smx"
                  color={graphactive ? 'primary' : 'secondary'}
                  icon={
                    graphactive
                      ? '/images/analyticswhite.svg'
                      : '/images/analyticsdark.svg'
                  }>
                  View Analytics
                </Button>
              </div>
            )}
            {reportConfig?.editColumns && (
              <div className={Styles.ml15}>
                <Button size="smx" color="secondary" onClick={showeditCol}>
                  Edit Colums
                </Button>
              </div>
            )}
            <div className={Styles.ml15} onClick={showfiltercontent}>
              <Button size="smx" color="secondary" icon="/images/filter.svg">
                Filter
              </Button>
            </div>
          </div>
        </div>
        {graphactive && (
          <div className={Styles.sectionthree}>
            <div className={Styles.threerow}>
              {analytics?.data?.map(
                ({ percentSpan, amount, key, name, percent, data }, i) => (
                  <div className={Styles.threeitem}>
                    <Statschartsmall
                      amount={amount}
                      selected={selected.includes(key)}
                      title={name}
                      percent={`${percent}% than ${percentSpan}`}
                      direction={parseFloat(percent) < 0 ? 'down' : 'up'}
                      graphdata={getAxisValue(data)}
                      xaxis={getAxis(data)}
                      dataKey={key}
                      color={colors[i]}
                      chartclicked={chartclicked}
                    />
                  </div>
                ),
              )}
            </div>
            <div className={Styles.threetwo}>
              {analytics?.data && (
                <OverviewChart
                  data={getOverviewChartData(analytics.data)}
                  xaxis={getAxis(analytics.data[0]?.data)}
                />
              )}
            </div>
          </div>
        )}
        <div className={Styles.mt20}>
          <ToggleButton
            onToggle={(value) => {
              settableType(value);
            }}
            items={[
              { value: 'compact', label: 'Compact' },
              { value: 'expanded', label: 'Expanded' },
            ]}
            defaultValue="compact"
          />
        </div>
        <div className={Styles.draganddrop}>
          <DragAndDrop
            handleOnRemoveItem={handleOnDragAndDrop}
            handleOnReorderItem={handleOnDragAndDrop}
            data={sortOrders}
          />
        </div>
        <div className={Styles.sectfour}>
          <Scrolltable
            data={listData}
            handleSortOrder={handleSortOrder}
            showGrandTotal={showGrandTotal}
            hasMore={!!reports?.metaData?.hasMore}
            loading={reports?.loading}
            defaultExtraFilterData={reportFields?.data?.defaultExtraFilterData}
            headers={tableheader}
            baseTable={baseTable}
            tableType={tableType}
            clearSortName={clearSortName}
            fetchNextData={fetchNextData}
            isFiltered={isFiltered}
          />
        </div>
        <Popupeditcol
          show={editcol}
          hidecoledit={hidecoledit}
          selectedItems={tableheader}
          options={reportFields?.data?.columnFields || []}
          handleOnApplyEditColumns={handleOnApplyEditColumns}
          handleOnCancelEditColumns={handleOnCancelEditColumns}
        />
        <Filter
          show={showfilter}
          hidefilter={hidefilter}
          type={filterType}
          trigeradvanced={trigeradvanced}
          tableHeaders={tableheader.filter(
            (header) => header.name !== 'createdAt',
          )}
          defaultFilterData={filterData || {}}
          handleOnFilterChange={handleOnFilterChange}
          handleOnApplyFilter={handleOnApplyFilter}
          handleOnClearFilter={handleOnClearFilter}
        />

        <AlertForm
          open={open}
          handleClose={() => setOpen(false)}
          heading={
            reportType === 'custom'
              ? 'Update custom report'
              : 'Save as custome report'
          }
          onFieldChange={handleOnAlertFieldChange}
          formData={alertFormData}
          errors={errors}
          formFields={[
            { type: 'text', name: 'title', required: true },
            {
              type: 'textarea',
              name: 'description',
            },
          ]}
          onAccept={saveAsCustomReport}
        />
        <AlertForm
          open={openExportAlert}
          handleClose={() => setopenExportAlert(false)}
          heading="Select Export Type"
          onFieldChange={(name, value) => {
            setexportType(value);
          }}
          errors={errors}
          formFields={[
            {
              label: 'Export Type',
              type: 'select',
              name: 'exportType',
              value: { exportType },
              required: true,
              options: [
                { label: 'CSV', value: 'csv' },
                { label: 'PDF', value: 'pdf' },
                { label: 'HTML', value: 'html' },
              ],
            },
          ]}
          onAccept={exportReports}
          onCancel={() => setopenExportAlert(false)}
        />
      </>
    </div>
  );
}

/**
 * map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  reports: state.getReportsReducer,
  analytics: state.getAnalyticsReducer,
  reportFields: state.getReportFieldsReducer,
});

/**
 *  proptypes
 */
Reportdetail.propTypes = {
  getData: PropTypes.func.isRequired,
  createData: PropTypes.func.isRequired,
  exportData: PropTypes.func.isRequired,

  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
  }),
  reports: PropTypes.shape({
    data: PropTypes.array,
    metaData: PropTypes.object,
    loading: PropTypes.bool,
  }),
  analytics: PropTypes.object,
  reportFields: PropTypes.shape({
    data: PropTypes.shape({
      defaultSelectedFields: PropTypes.array,
      columnFields: PropTypes.array,
    }),
  }),
};

/**
 * defaultProps
 */
Reportdetail.defaultProps = {
  match: {},
  reports: {
    loading: true,
  },
  analytics: {},
  reportFields: {
    data: { defaultSelectedFields: [], columnFields: [] },
  },
};

// export
export default connect(mapStateToProps, {
  getData,
  createData,
  exportData,
})(Reportdetail);
