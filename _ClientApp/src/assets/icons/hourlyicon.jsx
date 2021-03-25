import React from 'react';

export default function Hourlyicon({ active }) {
  return (
    <svg
      width="47"
      height="46"
      viewBox="0 0 47 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.5459 1C35.6959 1 45.5459 10.85 45.5459 23C45.5459 35.15 35.6959 45 23.5459 45C11.3959 45 1.5459 35.15 1.5459 23C1.5459 10.85 11.3959 1 23.5459 1V1Z"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5459 11V23H35.5459"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
