import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'actions/types';
import { connect } from 'react-redux';
import { getData } from 'actions';
import Input from '../../../components/input';
import Styles from './myprofile.module.scss';

function Myprofile(props) {
  const { profile } = props;
  const data = profile?.data?.[0];

  /**
   * use effect
   */
  useEffect(() => {
    props.getData(Actions.GET_SHOP_DETAIL, '/profile');
  }, []);

  return (
    <div className={Styles.container}>
      <h3>My Profile</h3>
      <form action="">
        <div className={Styles.row}>
          <Input
            label="Shop Name"
            name="name"
            type="text"
            disabled
            placeholder="Your shop name"
            value={data?.name}
          />
        </div>
        <div className={Styles.row}>
          <Input
            label="Shop URL"
            name="shop"
            type="text"
            disabled
            placeholder="Your shop URL"
            value={data?.shop}
          />
        </div>
        <div className={Styles.row}>
          <Input
            label="Shop Domain"
            name="domain"
            type="text"
            disabled
            placeholder="Your shop domain"
            value={data?.domain}
          />
        </div>
        <div className={Styles.row}>
          <Input
            label="Email address"
            name="email"
            type="email"
            disabled
            placeholder="Your email address"
            value={data?.email}
          />
        </div>
        <div className={Styles.row}>
          <Input
            label="Phone Number"
            name="phone"
            type="text"
            disabled
            placeholder="Your phone number"
            value={data?.phone || ''}
          />
        </div>
        <div className={Styles.row}>
          <Input
            label="Address"
            name="address"
            type="text"
            disabled
            placeholder="Your address"
            value={data?.address || ''}
          />
        </div>
        <div className={Styles.row}>
          <img className={Styles.img} alt="user_profile" src={data?.avatar} />
        </div>
      </form>
    </div>
  );
}

/**
 * Map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  profile: state.getShopDetailsReducer,
});

/**
 * Proptypes
 */
Myprofile.propTypes = {
  getData: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    data: PropTypes.array,
  }),
};

/**
 * defaultProps
 */
Myprofile.defaultProps = {
  profile: {},
};

/**
 * Export
 */
export default connect(mapStateToProps, { getData })(Myprofile);
