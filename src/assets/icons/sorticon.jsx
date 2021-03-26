import React from 'react';

export default function Sorticon({ direction }) {
  if (direction === 'up') {
    return (
      <svg
        width="8"
        height="16"
        viewBox="0 0 14 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 15L7 21L1 15"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 7L7 1L13 7"
          stroke="black"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

    // <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <path d="M7 4L4.00001 0.999988L1 4" stroke="#173630" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" />
    // </svg>
    );
  } if (direction === 'down') {
    return (
      <svg
        width="8"
        height="16"
        viewBox="0 0 14 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 7L7 1L1 7"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 15L7 21L13 15"
          stroke="black"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="8"
      height="16"
      viewBox="0 0 14 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 7L7 1L1 7"
        stroke="black"
        strokeWidth="1.5"
        strokeOpacity="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 15L7 21L13 15"
        stroke="black"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

  // <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  //   <path d="M1 1L3.99999 4.00001L7 1" stroke="#173630" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" />
  // </svg>
  );
}
