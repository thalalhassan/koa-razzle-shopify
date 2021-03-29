/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Tour from 'reactour';
import Ministatscard from 'components/ministatsCard';
import Selectbox from 'components/select';
import Button from 'components/button';
import { Actions } from 'actions/types';
import { getData, updateData } from 'actions';
import Report from 'components/report';
import {
  getPercentageChange,
  getLocalStorageData,
  setLocalStorageData,
} from 'helper';
import GridSkelton from 'components/SkeltonLoad/GridSkelton';
import ReportSkeleton from 'components/SkeltonLoad/ReportSkeleton';
import Styles from './reports.module.scss';
import StyleReportComponent from '../../components/report/report.module.scss';

function Reports(props) {
  const steps = [
    {
      content: (
        <div className="welcome-head">
          Welcome!
          <br />
          Let`s start with Export,Schedule Custom Reports.
        </div>
      ),
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: '.analytics_section',
      content: 'You can see the analytics here.',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: `.${Styles.ml2}`,
      content: 'You can create custom report here.',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: `.${StyleReportComponent.myreport}`,
      content:
        'Custom reports generated are listed under My Reports and Built-in reports are listed in other sections.',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: '.built-in-report-column',
      content: 'You can view the report details by clicking on a report.',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: `.${Styles.search}`,
      content: 'You can search and view report from here.',
      style: {
        fontSize: '14px',
      },
    },
    {
      selector: '.font-lato',
      content: 'Hurrey! Continue to the site.',
      style: {
        fontSize: '14px',
      },
    },
  ];
  const [isTourOpen, setIsTourOpen] = useState(true);
  const [reactourStatus, setreactourStatus] = useState({
    home: true,
  });

  const [periodLabel, setPeriodLabel] = useState('Last 365 Days');
  const [categoryList, setcategoryList] = useState([]);
  const [categoryOptions, setcategoryOptions] = useState([]);
  const { currentData, previousData, history, categories } = props;

  useEffect(() => {
    // const { reactourStatus: data, analyticsPeriod = 365 } = getLocalStorageData();
    const { reactourStatus: data, analyticsPeriod = 365 } = {}; // due to testing razzle no local data
    setPeriodLabel(`Last ${analyticsPeriod} Days`);
    setreactourStatus(data || { home: true });
  }, []);

  const handleReactour = () => {
    const tourData = {
      home: true,
      createCustomReport: reactourStatus.createCustomReport,
    };
    // setLocalStorageData({ reactourStatus: tourData });
    props.updateData(Actions.UPDATE_SHOP_DATA, '/shops', {
      reactourStatus: tourData,
    });
  };

  /**
   * use effect
   */
  useEffect(() => {
    // const { analyticsPeriod = 365 } = getLocalStorageData();
    const { analyticsPeriod = 365 } = {};// due to testing razzle no local data
    props.getData(Actions.GET_CATEGORY_DATA, '/category').then((res) => {
      if (!res.error) {
        const { _data } = res?.payload?.data || {};
        setcategoryList(_data || []);
        const options = [];
        _data.map((cat) => {
          const childOptions = [];
          const { reports, shopReports, key } = cat;
          let reportsArray = reports;
          if (key === 'myreport') reportsArray = shopReports;
          reportsArray.map(({ title, type, baseTable, slug }) => {
            childOptions.push({
              label: title,
              value: `/reports/${type}/${baseTable}/${slug}`,
            });
            return true;
          });
          options.push({
            label: cat.title,
            options: childOptions,
          });
          return true;
        });
        setcategoryOptions(options);
      }
    });
    props.getData(Actions.GET_ALL_CURRENT_ANALYTICS, '/analytics', {
      currentPeriod: analyticsPeriod,
    });
    props.getData(Actions.GET_ALL_PREVIOUS_ANALYTICS, '/analytics', {
      currentPeriod: analyticsPeriod,
      previousPeriod: analyticsPeriod * 2,
    });
  }, []);

  const handleOnSearch = (name, value) => {
    history.push(value);
  };

  const getMinistatscard = () => {
    const rows = [];
    const grapcolors = [
      { grapcolor1: '#C15CFF', grapcolor2: '#5063FF' },
      { grapcolor1: '#2AF594', grapcolor2: '#45D18E' },
      { grapcolor1: '#82D2FF', grapcolor2: '#2EACF3' },
      { grapcolor1: '#FF8787', grapcolor2: '#FD2A2A' },
    ];
    const fields = ['sales', 'revenue', 'profit', 'cost'];
    fields.map((key, index) => {
      const currentkeyData = (currentData?.data && currentData?.data[key]) || 0;
      const previouskeyData = (previousData?.data && previousData?.data[key]) || 0;

      rows.push(
        <div key={key}>
          <Ministatscard
            data={{
              title: key,
              count: `${currentkeyData}`,
              percentage: getPercentageChange(currentkeyData, previouskeyData),
              description: `than ${periodLabel}`,
              direction: currentkeyData >= previouskeyData ? 'up' : 'down',
              ...grapcolors[index],
            }}
            loading={categories?.loading}
          />
        </div>,
      );
      return true;
    });

    return rows;
  };

  return (
    <>
      <div className={Styles.main}>
        <>
          <div className={Styles.sectiontitle}>
            <h2>Report page</h2>
            <div className={Styles.sectiontitlerit}>
              <div className={Styles.search}>
                <Selectbox
                  name="searchReport"
                  width="auto"
                  drop="180px"
                  minWidth="125px"
                  placeHolder="Search Here..."
                  onselectOption={handleOnSearch}
                  data={categoryOptions}
                />
              </div>
              <div className={Styles.ml2}>
                <Button
                  link
                  to="/createcustomreport"
                  color="primary"
                  size="md"
                  className={Styles.custom}
                  icon="/public/images/plus.svg">
                  Create Custom Report
                </Button>
              </div>
            </div>
          </div>
          <div>
            {previousData?.loading ? (
              <GridSkelton />
            ) : (
              <Masonry
                breakpointCols={{
                  default: 4,
                  992: 2,
                  768: 2,
                  680: 1,
                }}
                className="my-masonry-grid analytics_section"
                columnClassName="my-masonry-grid_column">
                {getMinistatscard()}
              </Masonry>
            )}

            {categories?.loading ? (
              <ReportSkeleton />
            ) : (
              <Masonry
                breakpointCols={{
                  default: 3,
                  992: 2,
                  768: 2,
                  680: 1,
                }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {_.sortBy(categoryList, 'id')?.map((val) => (
                  <div key={val.id} categories={val.id}>
                    <Report data={val} />
                  </div>
                ))}
              </Masonry>
            )}
          </div>
        </>
      </div>

      {!reactourStatus.home && (
        <Tour
          steps={steps}
          isOpen={isTourOpen}
          accentColor="#007aff"
          rounded={5}
          disableDotsNavigation
          showNumber={false}
          lastStepNextButton={(
            <button type="button" size="fullwidth" color="inversecolor">
              Done
            </button>
          )}
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
  currentData: state.getCurrentAnalyticsReducer,
  previousData: state.getPreviousAnalyticsReducer,
  categories: state.getCategoryReducer,
  shop: state.getShopReducer,
});

/**
 *  proptypes
 */
Reports.propTypes = {
  getData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  currentData: PropTypes.shape({
    data: PropTypes.any,
    loading: PropTypes.bool,
  }),
  previousData: PropTypes.shape({
    data: PropTypes.any,
    loading: PropTypes.bool,
  }),
};

/**
 * defaultProps
 */
Reports.defaultProps = {
  categories: {
    loading: true,
  },
  currentData: {},
  previousData: {},
};

// export
export default connect(mapStateToProps, {
  getData,
  updateData,
})(Reports);
