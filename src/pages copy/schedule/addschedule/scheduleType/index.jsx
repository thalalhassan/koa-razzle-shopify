import React from 'react';
import PropTypes from 'prop-types';
import Schedulebox from 'components/schedulebox';
import Styles from './scheduletype.module.scss';

export default function ScheduleType({
  title,
  name,
  data,
  onChange,
  active,
}) {
  return (
    <div className={Styles.blockone}>
      <h2>{title}</h2>
      <div className={Styles.boxes}>
        {data.map((val) => (
          <div className={Styles.col} key={val.key}>
            <div
              aria-hidden
              onClick={() => onChange(name, val.key)}
              className={Styles.schedule_area}>
              <Schedulebox
                title={val.title}
                description={val.description}
                icon={val.icon}
                active={active === val.key}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ScheduleType.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  active: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

ScheduleType.defaultProps = {
  title: '',
  active: '',
};
