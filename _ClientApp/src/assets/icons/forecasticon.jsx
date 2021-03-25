import React from 'react';

export default function Forecasticon({ active }) {
  return (

    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 7.88341H13.8L11.4 15.0834L6.6 0.683411L4.2 7.88341H1" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
}
