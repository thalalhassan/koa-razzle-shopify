import React from 'react';

export default function Monthlyicon({ active }) {
  return (
    <svg
      width="43"
      height="42"
      viewBox="0 0 43 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.942 21H17.6693H10.3965V28.2727V35.5455H17.6693H24.942V28.2727H32.2147V21H24.942V21Z"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.6693 21V35.5455"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.942 21V28.2727H10.3965"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.0329 4.63635H41.3057V41H1.30566V4.63635H8.57839"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.033 4.63635H28.5784"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.30566 15.5454H41.3057"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.57837 1H14.0329V10.0909H8.57837V1Z"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.5784 1H34.0329V10.0909H28.5784V1Z"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
