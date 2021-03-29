/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Actions } from 'actions/types';
import moment from 'moment';
import { getData, updateData } from 'actions';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import Styles from './notification.module.scss';
import Notificationicon from '../../assets/icons/notificationicon';
import Handleclickouside from '../handleclickouside';

function Notification(props) {
  const { notifications } = props;

  const [show, setshow] = useState(false);
  const [notificationData, setnotificationData] = useState([]);
  const [notReadCount, setnotReadCount] = useState(0);

  useEffect(() => {
    props.getData(Actions.GET_NOTIFICATION_DATA, '/notifications');
  }, []);

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', (message) => {
      if (message) {
        const { payload } = message.data.firebaseMessaging;
        const { data: payloadData, notification } = payload;
        setnotificationData([
          ...notificationData,
          { data: payloadData, notification },
        ]);
        setnotReadCount(notReadCount + 1);
        toast.info(`${notification?.title} \n ${payloadData?.description || notification?.body}`);
      }
    });
  }, []);

  useEffect(() => {
    if (notifications && notifications.data) {
      const { data } = notifications;
      const count = data.filter((e) => e.isRead === false).length;
      setnotReadCount(count);
      setnotificationData(data);
    }
  }, [notifications]);

  const toggleshow = () => {
    setshow(!show);
  };

  const getDateAsDays = (date) => moment(date).fromNow();

  const outsideclick = () => {
    setshow(false);
  };

  const handleOnNotificatioClick = (id, url) => {
    if (url) props.history.push(url);

    props.updateData(Actions.UPDATE_NOTIFICATION_DATA, '/notifications', {
      id,
      isRead: true,
    });

    setnotReadCount(notReadCount - 1);
  };
  return (
    <div className={Styles.container}>
      <Handleclickouside onoutsideclick={outsideclick}>
        <span aria-hidden onClick={toggleshow}>
          <Notificationicon active={notReadCount} />
        </span>

        <CSSTransition
          in={show}
          appear
          timeout={300}
          classNames="toggleshow"
          unmountOnExit>
          <>
            <div className={Styles.dropdown}>
              <ul>
                {notificationData.map(
                  ({
                    id,
                    notification: { title, body },
                    data: { icon, url, time, description },
                    createdAt,
                  }) => (
                    <li key={title}>
                      {/* <Link to={url} className={Styles.link}> */}
                      <div
                        className={Styles.link}
                        onClick={() => handleOnNotificatioClick(id, url)}>
                        <span className={Styles.icon}>
                          {icon ? (
                            <i>
                              <img src={icon} alt="notification" />
                            </i>
                          ) : (
                            <i className={Styles.defaulticon}>
                              <img
                                src="/public/images/notificationicon.svg"
                                alt="notification"
                              />
                            </i>
                          )}
                        </span>
                        <span className={Styles.text}>
                          <h3>{title}</h3>
                          <p>{description || body}</p>
                        </span>
                        <span className={Styles.time}>
                          {time || getDateAsDays(createdAt)}
                        </span>
                      </div>
                      {/* </Link> */}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </>
        </CSSTransition>
      </Handleclickouside>
    </div>
  );
}

/**
 * map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  notifications: state.getNotificationReducer,
});

Notification.propTypes = {
  getData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  notifications: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // data: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     icon: PropTypes.string,
  //     title: PropTypes.string,
  //     url: PropTypes.string,
  //     time: PropTypes.string,
  //     description: PropTypes.string,
  //   }),
  // ).isRequired,
};

Notification.defaultProps = {
  notifications: {},
};

export default withRouter(
  connect(mapStateToProps, { getData, updateData })(Notification),
);
