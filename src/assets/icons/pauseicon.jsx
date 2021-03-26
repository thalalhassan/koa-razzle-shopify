import React from 'react';

export default function Pauseicon({ active }) {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5 1H1V15H4.5V1Z"
        stroke={active ? '#5063FF' : '#212B36'}
        strokeOpacity="0.75"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 1H8V15H11.5V1Z"
        stroke={active ? '#5063FF' : '#212B36'}
        strokeOpacity="0.75"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
