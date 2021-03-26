import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SkeltonCard from 'components/SkeltonCard';
import Styles from './skelton.module.scss';

function SkeltonLoad({ history }) {
  switch (history.location.pathname) {
    case '/reports':
      return (
        <>
          {/* {JSON.stringify(history)} */}
          <div className={Styles.row}>
            {[...Array(4)]
              .map(() => (
                <div className={Styles.col3} key={4}>
                  <div className={Styles.box1}>
                    <div className={Styles.leftsect}>
                      <SkeltonCard width="60px" height="60px" circle />
                    </div>
                    <div className={Styles.rightsect}>
                      <h3>
                        <SkeltonCard width="100px" height="14px" />
                      </h3>
                      <h4>
                        <SkeltonCard width="60%" height="30px" />
                      </h4>
                      <h5>
                        <SkeltonCard height="10px" />
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className={Styles.row}>
            <div className={Styles.col4}>
              <div className={Styles.box2} style={{ flexDirection: 'column' }}>
                <div className={Styles.report_head}>
                  <div className={Styles.leftsect}>
                    <SkeltonCard width="30px" height="30px" circle />
                  </div>
                  <div className={Styles.rightsect}>
                    <h2>
                      <SkeltonCard width="60%" height="30px" />
                    </h2>
                    <p>
                      <SkeltonCard height="15px" />
                    </p>
                  </div>
                </div>
              </div>
              <div className={Styles.gap} />
              <div className={Styles.box1} style={{ flexDirection: 'column' }}>
                <div className={Styles.report_head}>
                  <div className={Styles.leftsect}>
                    <SkeltonCard width="30px" height="30px" circle />
                  </div>
                  <div className={Styles.rightsect}>
                    <h2>
                      <SkeltonCard width="60%" height="30px" />
                    </h2>
                  </div>
                </div>
                <ul>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                </ul>
              </div>
            </div>
            <div className={Styles.col4}>
              <div className={Styles.box1} style={{ flexDirection: 'column' }}>
                <div className={Styles.report_head}>
                  <div className={Styles.leftsect}>
                    <SkeltonCard width="30px" height="30px" circle />
                  </div>
                  <div className={Styles.rightsect}>
                    <h2>
                      <SkeltonCard width="60%" height="30px" />
                    </h2>
                  </div>
                </div>
                <ul>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                </ul>
              </div>
            </div>
            <div className={Styles.col4}>
              <div className={Styles.box1} style={{ flexDirection: 'column' }}>
                <div className={Styles.report_head}>
                  <div className={Styles.leftsect}>
                    <SkeltonCard width="30px" height="30px" circle />
                  </div>
                  <div className={Styles.rightsect}>
                    <h2>
                      <SkeltonCard width="60%" height="30px" />
                    </h2>
                  </div>
                </div>
                <ul>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                  <li>
                    <SkeltonCard height="15px" />
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </>
      );

    case '/analytics':
      return (
        <>
          {/* {JSON.stringify(history)} */}
          <div className={Styles.row}>
            {[...Array(4)]
              .map(() => (
                <div className={Styles.col3} key={4}>
                  <div className={Styles.box1}>
                    <div className={Styles.leftsect}>
                      <SkeltonCard width="60px" height="60px" circle />
                    </div>
                    <div className={Styles.rightsect}>
                      <h3>
                        <SkeltonCard width="100px" height="14px" />
                      </h3>
                      <h4>
                        <SkeltonCard width="60%" height="30px" />
                      </h4>
                      <h5>
                        <SkeltonCard height="10px" />
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className={Styles.row}>
            <div className={Styles.col8}>
              <div className={Styles.box1} style={{ flexDirection: 'column' }}>
                <div className={Styles.analytics_head}>
                  <SkeltonCard width="140px" height="25px" />
                  <SkeltonCard width="70px" height="15px" />
                </div>
                <div className={Styles.analytics_content}>
                  <div className={Styles.analytics_box}>
                    <SkeltonCard height="15px" />
                    <SkeltonCard height="25px" />
                  </div>
                  <div className={Styles.analytics_box}>
                    <SkeltonCard height="15px" />
                    <SkeltonCard height="25px" />
                  </div>
                </div>
                <SkeltonCard height="350px" />
              </div>
            </div>
            <div className={Styles.col4}>
              <div className={Styles.box1} style={{ flexDirection: 'column' }}>
                <div className={Styles.analytics_head}>
                  <SkeltonCard width="140px" height="25px" />
                  <SkeltonCard width="70px" height="15px" />
                </div>
                <SkeltonCard height="260px" />
                <div className={Styles.gap} />
                <div className={Styles.analytics_content}>
                  <div className={Styles.analytics_box}>
                    <SkeltonCard height="15px" />
                    <SkeltonCard height="25px" />
                  </div>
                  <div className={Styles.analytics_box}>
                    <SkeltonCard height="15px" />
                    <SkeltonCard height="25px" />
                  </div>
                  <div className={Styles.analytics_box}>
                    <SkeltonCard height="15px" />
                    <SkeltonCard height="25px" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
      );

    case '/schedule/schedulelist':
      return (
        <>
          {/* {JSON.stringify(history)} */}
          <div className={Styles.row}>
            <div className={Styles.col12}>
              <div className={Styles.tab}>
                <div className={Styles.tab_head}>
                  <SkeltonCard width="125px" height="15px" />
                </div>
                <div className={Styles.tab_head}>
                  <SkeltonCard width="215px" height="15px" />
                </div>
              </div>
              <SkeltonCard height="1px" />
              <table>
                <thead>
                  <tr>
                    {Array(10)
                      .fill()
                      .map((item) => (
                        <th key={10}>
                          <SkeltonCard height="15px" />
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {Array(4)
                    .fill()
                    .map((item) => (
                      <tr key={4}>
                        {Array(10)
                          .fill()
                          .map((item) => (
                            <td key={10}>
                              <SkeltonCard height="15px" />
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

        </>
      );

    case '/schedule/schedulehistory':
      return (
        <>
          {/* {JSON.stringify(history)} */}
          <div className={Styles.row}>
            <div className={Styles.col12}>
              <div className={Styles.tab}>
                <div className={Styles.tab_head}>
                  <SkeltonCard width="125px" height="15px" />
                </div>
                <div className={Styles.tab_head}>
                  <SkeltonCard width="215px" height="15px" />
                </div>
              </div>
              <SkeltonCard height="1px" />
              <table>
                <thead>
                  <tr>
                    {[...Array(10)]
                      .map(() => (
                        <th key={10}>
                          <SkeltonCard height="15px" />
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(4)]
                    .map(() => (
                      <tr key={4}>
                        {[...Array(10)]
                          .map(() => (
                            <td key={10}>
                              <SkeltonCard height="15px" />
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

        </>
      );

    default:
      return (
        <>
          {/* {JSON.stringify(history)} */}
          <label style={{ margin: '0 0 5px', display: 'block' }}>
            <SkeltonCard width="65px" height="20px" />
          </label>
          <div className={Styles.option_head}>
            <div>
              <span>
                <SkeltonCard width="148px" height="30px" />
              </span>
              <span>
                <SkeltonCard width="245px" height="30px" />
              </span>
            </div>
            <div>
              <span>
                <SkeltonCard width="165px" height="30px" />
              </span>
              <span>
                <SkeltonCard width="128px" height="30px" />
              </span>
              <span>
                <SkeltonCard width="112px" height="30px" />
              </span>
            </div>
          </div>

          <div className={Styles.option_head}>
            <div>
              <p>
                <SkeltonCard width="85px" height="20px" />
              </p>
              <p>
                <SkeltonCard width="85px" height="20px" />
              </p>
            </div>
          </div>
          <div className={Styles.gap} />
          <table>
            <thead>
              <tr>
                {[...Array(10)]
                  .map(() => (
                    <th key={10}>
                      <SkeltonCard height="15px" />
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(7)]
                .map(() => (
                  <tr key={7}>
                    {[...Array(10)]
                      .map(() => (
                        <td key={10}>
                          <SkeltonCard height="15px" />
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      );
  }
  // return (
  //   <>
  //     {JSON.stringify(history)}
  //     <SkeletonTheme color={color} highlightColor={highlight}>
  //       <Skeleton width={width} height={height} duration={duration} count={count} circle={circle} />
  //     </SkeletonTheme>
  //   </>
  // );
}

SkeltonLoad.propTypes = {
  // width: PropTypes.number,
  // height: PropTypes.number,
  // count: PropTypes.number,
  // color: PropTypes.string,
  // highlight: PropTypes.string,
  // duration: PropTypes.number,
  // circle: PropTypes.bool,
  history: PropTypes.shape().isRequired,
};

// SkeltonLoad.defaultProps = {
//   width: '100%',
//   height: '',
//   count: '1',
//   color: '#e3e3e3',
//   highlight: '#f0f0f0',
//   duration: '2',
//   circle: false,
// };
export default withRouter(SkeltonLoad);
