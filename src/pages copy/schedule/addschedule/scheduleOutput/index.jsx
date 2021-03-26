import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Radiobtnbox from 'components/radiobtnBox';
import Input from 'components/input';
import Textarea from 'components/textarea';
import Selectbox from 'components/select';
import { outputOptions } from 'utils';
import Styles from './scheduleoutput.module.scss';

export default function ScheduleOutput({
  onChange,
  outputOption,
}) {
  const [sendby, setsendby] = useState(outputOption.value);
  const getsendbyvalue = (val) => {
    setsendby(val);
    onChange('value', val);
  };

  return (
    <div className={Styles.container}>
      <h2>Output options</h2>
      <div className={Styles.box}>
        <div className={Styles.inprow}>
          <Radiobtnbox
            name="value"
            value={sendby}
            datas={outputOptions}
            getRadiobtnValue={getsendbyvalue}
          />
        </div>
        {sendby === 'Googledrive' ? (
          <>
            <div className={Styles.inprow}>
              <Input
                label="Email address"
                name="email"
                type="text"
                value={outputOption?.email}
                placeholder="Enter your email here..."
                onChange={onChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className={Styles.inprow}>
              <Input
                label="Email address"
                name="email"
                type="email"
                value={outputOption?.email}
                placeholder="Enter your email here..."
                onChange={onChange}
              />
            </div>
            <div className={Styles.inprow}>
              <Input
                label="CC Email (optional)"
                name="ccemail"
                type="email"
                value={outputOption?.ccemail}
                placeholder="Enter your cc email here..."
                onChange={onChange}
              />
            </div>
            <div className={Styles.inprow}>
              <Input
                label="BCC Email (optional)"
                name="bccemail"
                type="email"
                value={outputOption?.bccemail}
                placeholder="Enter your bcc email here..."
                onChange={onChange}
              />
            </div>
            <div className={Styles.inprow}>
              <Textarea
                label="Email contents"
                id="emailcontent"
                name="emailcontent"
                value={outputOption?.emailcontent}
                placeholder="Enter your report title here..."
                onChange={onChange}
              />
            </div>
          </>
        )}
        <div className={Styles.btmtext}>
          File type is
          <span className={Styles.btmselect}>
            <Selectbox
              name="filetype"
              value={outputOption?.filetype}
              data={[
                { value: 'excel', label: 'Excel' },
                // { value: 'pdf', label: 'Pdf' },
              ]}
              onselectOption={onChange}
            />
          </span>
          and attachment type is
          <span className={Styles.btmselect}>
            <Selectbox
              name="attachment"
              value={outputOption?.attachment}
              data={[
                { value: 'zipfile', label: 'Zip file' },
                { value: 'rar', label: 'RAR' },
              ]}
              onselectOption={onChange}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

ScheduleOutput.propTypes = {
  onChange: PropTypes.func.isRequired,
  outputOption: PropTypes.object.isRequired,
};
