import React from 'react';

export default function Playicon({ active }) {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L13.4444 9L1 17V1Z"
        stroke={active ? '#5063FF' : '#596068'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
