import React from 'react';

export default function Subscriptionicon({ active }) {
  return (
    <svg
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.84043 12.2H3.04043C2.61608 12.2 2.20912 12.0314 1.90906 11.7314C1.609 11.4313 1.44043 11.0243 1.44043 10.6V2.6C1.44043 2.17565 1.609 1.76869 1.90906 1.46863C2.20912 1.16857 2.61608 1 3.04043 1H15.8404C16.2648 1 16.6717 1.16857 16.9718 1.46863C17.2719 1.76869 17.4404 2.17565 17.4404 2.6V10.6C17.4404 11.0243 17.2719 11.4313 16.9718 11.7314C16.6717 12.0314 16.2648 12.2 15.8404 12.2H15.0404"
        stroke={active ? '#5063FF' : '#212B36'}
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.44043 10.6L13.4404 15.4H5.44043L9.44043 10.6Z"
        stroke={active ? '#5063FF' : '#212B36'}
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
