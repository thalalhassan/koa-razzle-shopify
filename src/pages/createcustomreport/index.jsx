import React, { useState, useEffect } from 'react';
import Input from 'components/input';
import Selectbox from 'components/select';
import DragAndDrop from 'components/dragndrop';
import Button from 'components/button';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tour from 'reactour';
import Daterangeselect from 'components/daterangeselect';
import { Actions } from 'actions/types';
import { getLocalStorageData, isEmpty, setLocalStorageData, stringCamelizer } from 'helper';
import PropTypes from 'prop-types';
import Filteradvanced from 'components/filteradvanced';
import { getData, updateData, createData } from 'actions';
import { validate, setFocus } from 'validator';
import { camelCase } from 'lodash';
import Popupeditcol from 'components/popupeditcol';
import Styles from './createcustomreport.module.scss';

function CreateCustomReport(props) {
  const steps = [
    {
      content: (
        <div className="welcome-head">
          Let`s start with create custom report.
        </div>
      ),
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: '#form-title',
      content: 'Enter your report title here.',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: '#form-desc',
      content: 'Enter your report description here.',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: '#form-select',
      content: 'You can select the base table from here.',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: `.${Styles.formddcontainer}`,
      content: 'You can manage columns from here.',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: '#form-daterange',
      content: 'You can select the date range for the report from here',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: '#form-filter',
      content: 'You can add filters from here.',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: `.${Styles.ml18}`,
      content:
        'Save your report by clicking the button "Save as custom report".',
      style: {
        fontSize: '14px',
      },
    },
  ];
  const [isTourOpen, setIsTourOpen] = useState(true);
  const [reactourStatus, setreactourStatus] = useState({
    createCustomReport: true,
  });

  useEffect(() => {
    const { reactourStatus: data } = {};
    // const { reactourStatus: data } = getLocalStorageData();
    setreactourStatus(data || { createCustomReport: true });
  }, []);

  const handleReactour = () => {
    const tourData = { home: reactourStatus.home, createCustomReport: true };
    // setLocalStorageData({ reactourStatus: tourData });
    props.updateData(Actions.UPDATE_SHOP_DATA, '/shops', {
      reactourStatus: tourData,
    });
  };

  const [editcol, seteditcol] = useState(false);
  const [selectedFields, setselectedFields] = useState([]);
  const [filterData, setsfilterData] = useState({
    createdAt: {
      datePickerRange: 'anyTime',
    },
  });

  const [errors, seterrors] = useState(null);

  const [baseTable, setsbaseTable] = useState('products');
  const [reportData, setReportData] = useState({
    value: '',
    key: 'custom',
  });

  const hidecoledit = () => {
    seteditcol(false);
  };

  const showeditCol = () => {
    seteditcol(true);
  };

  const { reportFields, user } = props;

  useEffect(() => {
    props
      .getData(Actions.GET_REPORTFIELD_DATA, '/fieldOptions/customCreate', {
        baseTable,
      })
      .then((res) => {
        if (!res.error) {
          const reportFieldsData = res?.payload?.data?._data || {};
          const { defaultSelectedFields } = reportFieldsData;

          setselectedFields(defaultSelectedFields || []);
          setsfilterData(reportFieldsData?.filterData || {});
        }
        return true;
      });
  }, [baseTable]);

  const handleOnApplyEditColumns = (headerFields, tableheaders) => {
    setselectedFields(tableheaders || []);
    setsfilterData({
      ...filterData,
      fields: headerFields,
    });
    hidecoledit();
  };

  const handleOnCancelEditColumns = () => {
    const { defaultSelectedFields } = (reportFields && reportFields.data) || {};
    setselectedFields(defaultSelectedFields || []);
  };

  const handleOnDragAndDrop = (filteredData) => {
    setselectedFields(filteredData);
  };

  const onDatesChange = ({ name, startDate, endDate, datePickerRange }) => {
    setsfilterData({
      ...filterData,
      [name]: { startDate, endDate, datePickerRange },
    });
  };

  const saveAsCustomReport = () => {
    // const { defaultSelectedFields } = reportFields?.data || {};
    // const isDefault = compareObjects(selectedFields, defaultSelectedFields);
    // if (!isDefault || !isEmpty(filterData)) {

    if (!isEmpty(filterData)) {
      if (filterData.isFiltered) {
        delete filterData.isFiltered;
      }
      const { key, value, description } = reportData;
      const customReportData = {
        title: value,
        description,
        slug: key,
        baseTable,
        reportKey: key,
        filters: filterData,
        headers: selectedFields,
      };
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
          if (res.error) {
            const errorsData = res.error.response?.data?._errors;
            seterrors(errorsData);
            setFocus(validatedData);
            toast.warning('Please set the report details');
          } else {
            props.history.push(
              `reports/custom/${baseTable}/${user.id}_${camelCase(key)}`,
            );
          }
        });
    } else {
      toast.warning('Please set the report details');
    }
    return true;
  };

  const handleOnBaseTableChange = (name, value) => {
    setsbaseTable(value);
  };

  const handleOnFilterChange = (data) => {
    setsfilterData({
      ...filterData,
      ...data,
    });
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.titlesect}>
          <h2>Create custom report</h2>
          <p>
            Create custom reports that have tailored dimensions and metrics to
            further understand your store’s data. If you need a help, please
            send the description of required report to
            {' '}
            <a href="mailto:info@acowebs.com">info@acowebs.com</a>
            {' '}
            Our team try
            to build one for you.
          </p>
        </div>
        <form action="">
          <div className={Styles.formrow} id="form-title">
            <Input
              label="Title"
              type="text"
              name="title"
              errors={errors}
              value={reportData.value}
              placeholder="Enter your report title here..."
              onChange={(name, value) => {
                const camalizedValue = stringCamelizer(value);
                setReportData({
                  ...reportData,
                  value,
                  key: camalizedValue,
                });
              }}
            />
          </div>
          <div className={Styles.formrow} id="form-desc">
            <Input
              label="Description"
              type="textarea"
              errors={errors}
              name="description"
              value={reportData.description}
              placeholder="Enter your report description here..."
              onChange={(name, value) => {
                setReportData({
                  ...reportData,
                  description: value,
                });
              }}
            />
          </div>
          <div className={Styles.formrow} id="form-select">
            <Selectbox
              bgcolor="#FCFCFC"
              label="Base Table"
              name="baseTable"
              value={baseTable}
              onselectOption={handleOnBaseTableChange}
              data={reportFields?.data?.baseTables || []}
            />
          </div>
          <div className={Styles.formddcontainer}>
            <div className={Styles.topsect}>
              <div className={Styles.label}>Columns</div>
              <div aria-hidden className={Styles.link} onClick={showeditCol}>
                <span className={Styles.icon}>
                  <img src="/public/images/addicon.svg" alt="addicon" />
                </span>
                Manage columns
              </div>
            </div>
            <div className={Styles.dnd}>
              <DragAndDrop
                handleOnRemoveItem={handleOnDragAndDrop}
                handleOnReorderItem={handleOnDragAndDrop}
                data={selectedFields}
              />
            </div>
          </div>
          <div className={Styles.filtercontainer} id="form-daterange">
            <div className={Styles.topsect}>
              <div className={Styles.label}>Date</div>
            </div>
            <Daterangeselect
              name="createdAt"
              onDatesChange={onDatesChange}
              startDate={filterData.createdAt?.startDate}
              endDate={filterData.createdAt?.endDate}
              datePickerRange={filterData.createdAt?.datePickerRange}
              rangeSelector
              noLabel
            />
          </div>
          <div className={Styles.filtercontainer} id="form-filter">
            <div className={Styles.topsect}>
              <div className={Styles.label}>Filters</div>
            </div>
            <div className={Styles.dnd}>
              <div className={Styles.scrollcontent}>
                <Filteradvanced
                  handleOnFilterChange={handleOnFilterChange}
                  tableHeaders={selectedFields.filter(
                    (header) => header.name !== 'createdAt',
                  )}
                />
              </div>
            </div>
          </div>
        </form>
        <div className={Styles.ml18}>
          <Button onClick={saveAsCustomReport}>Save as custom report</Button>
        </div>
        <Popupeditcol
          show={editcol}
          hidecoledit={hidecoledit}
          selectedItems={selectedFields}
          handleOnApplyEditColumns={handleOnApplyEditColumns}
          handleOnCancelEditColumns={handleOnCancelEditColumns}
          options={reportFields?.data?.columnFields || []}
        />
      </div>

      {!reactourStatus.createCustomReport && (
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        accentColor="#007aff"
        rounded={5}
        showNumber={false}
        lastStepNextButton={(
          <button type="button" size="fullwidth" color="inversecolor">
            Done
          </button>
        )}
        // disableFocusLock
        onBeforeClose={() => handleReactour()}
        onRequestClose={() => setIsTourOpen(false)}
      />
      )}
    </>
  );
}

/**
 * map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  reports: state.getReportsReducer,
  reportFields: state.getReportFieldsReducer,
  ...state.authReducer,
});

/**
 *  proptypes
 */
CreateCustomReport.propTypes = {
  getData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  createData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
  }),
  reports: PropTypes.shape({
    data: PropTypes.array,
    metaData: PropTypes.object,
  }),
  user: PropTypes.shape({
    id: PropTypes.any,
  }),
  reportFields: PropTypes.shape({
    data: PropTypes.shape({
      defaultSelectedFields: PropTypes.array,
      columnFields: PropTypes.array,
      baseTables: PropTypes.array,
    }),
  }),
};

/**
 * defaultProps
 */
CreateCustomReport.defaultProps = {
  match: {},
  reports: {},
  user: null,
  reportFields: {
    data: { defaultSelectedFields: [], columnFields: [], baseTables: [] },
  },
};

// export
export default connect(mapStateToProps, {
  getData,
  updateData,
  createData,
})(CreateCustomReport);
