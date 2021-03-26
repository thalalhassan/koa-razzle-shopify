import React from 'react';

export default function Profileicon({ active }) {
  return (
    <svg
      width="16"
      height="19"
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.2222 17.5V15.7222C15.2222 14.7792 14.8476 13.8749 14.1808 13.2081C13.514 12.5413 12.6097 12.1667 11.6667 12.1667H4.55556C3.61256 12.1667 2.70819 12.5413 2.0414 13.2081C1.3746 13.8749 1 14.7792 1 15.7222V17.5"
        stroke={active ? '#5063FF' : '#212B36'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.11122 8.61111C10.0749 8.61111 11.6668 7.01923 11.6668 5.05556C11.6668 3.09188 10.0749 1.5 8.11122 1.5C6.14754 1.5 4.55566 3.09188 4.55566 5.05556C4.55566 7.01923 6.14754 8.61111 8.11122 8.61111Z"
        stroke={active ? '#5063FF' : '#212B36'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
